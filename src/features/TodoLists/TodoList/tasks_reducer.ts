import {addTodoList, fetchTodoLists, removeTodoList} from '../todolists_reducer'
import {TaskPriorities, tasksAPI, TaskStatuses, TTask, TTaskUpdateModel} from '../../../api/tasks_api'
import {setAppStatus, TResponseStatus} from '../../../app/app_reducer'
import {thunkServerCatchError, thunkServerResponseError} from '../../../utils/thunk-helpers/thunk-errors-handle'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'

const initState: TTasks = {}


export const fetchTasks = createAsyncThunk('tasksReducer/fetchTasks',
    async (payload: { todoListId: string }, thunkAPI) => {
        try {
            thunkAPI.dispatch(setAppStatus({status: 'loading'}))
            let data = await tasksAPI.fetchTasks(payload.todoListId)
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {todoListId: payload.todoListId, tasks: data.items}
        } catch (error) {
            thunkServerCatchError(error, thunkAPI.dispatch)
        }
    })
export const addTask = createAsyncThunk('tasksReducer/addTask',
    async (payload: { todoListId: string, title: string }, thunkAPI) => {
        try {
            thunkAPI.dispatch(setAppStatus({status: 'loading'}))
            const data = await tasksAPI.addTask(payload.todoListId, payload.title)
            if (data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
                return {task: data.data.item}
            } else {
                thunkServerResponseError(data, thunkAPI.dispatch)
                return thunkAPI.rejectWithValue({errors: data.messages.length ? data.messages[0] : 'some error occurred'})
            }
        } catch (error) {
            thunkServerCatchError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: error.message.length ? error.message : 'some error occurred'})
        }
    })
export const removeTask = createAsyncThunk('tasksReducer/removeTask',
    async ({todoListId, taskId}: { todoListId: string, taskId: string }, thunkAPI) => {
        try {
            thunkAPI.dispatch(setAppStatus({status: 'loading'}))
            thunkAPI.dispatch(_setTaskStatus({todoListId, taskId, taskStatus: 'loading'}))
            const data = await tasksAPI.removeTask(todoListId, taskId)
            if (data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
                thunkAPI.dispatch(_setTaskStatus({todoListId, taskId, taskStatus: 'succeeded'}))
                return {todoListId, taskId}
            } else {
                thunkAPI.dispatch(_setTaskStatus({todoListId, taskId, taskStatus: 'failed'}))
                return thunkAPI.rejectWithValue({errors: data.messages.length ? data.messages[0] : 'some error occurred'})
            }
        } catch (error) {
            thunkServerCatchError(error, thunkAPI.dispatch)
            thunkAPI.dispatch(_setTaskStatus({todoListId, taskId, taskStatus: 'failed'}))
            return thunkAPI.rejectWithValue({errors: error.message.length ? error.message : 'some error occurred'})
        }
    })
export const updateTask = createAsyncThunk('tasksReducer/updateTask',
    async ({todoListId, task, model}: { todoListId: string, task: TTask, model: TTaskUpdateDomainModel }, thunkAPI) => {
        try {
            thunkAPI.dispatch(setAppStatus({status: 'loading'}))
            thunkAPI.dispatch(_setTaskStatus({todoListId, taskId: task.id, taskStatus: 'loading'}))
            const updatedTaskModel: TTaskUpdateModel = {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                deadline: task.deadline,
                description: task.description,
                status: task.status,
                ...model
            }
            const data = await tasksAPI.updateTask(todoListId, task.id, updatedTaskModel)
            if (data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
                thunkAPI.dispatch(_setTaskStatus({todoListId, taskId: task.id, taskStatus: 'succeeded'}))
                return {todoListId, taskId: task.id, model: updatedTaskModel}
            } else {
                thunkServerResponseError(data, thunkAPI.dispatch)
                thunkAPI.dispatch(_setTaskStatus({todoListId, taskId: task.id, taskStatus: 'failed'}))
                return thunkAPI.rejectWithValue({errors: data.messages.length ? data.messages[0] : 'some error occurred'})
            }
        } catch (error) {
            thunkServerCatchError(error, thunkAPI.dispatch)
            thunkAPI.dispatch(_setTaskStatus({todoListId, taskId: task.id, taskStatus: 'failed'}))
            return thunkAPI.rejectWithValue({errors: error.message.length ? error.message : 'some error occurred'})
        }
    })

const slice = createSlice({
    name: 'tasksReducer',
    initialState: initState,
    reducers: {
        _setTaskStatus(state, action: PayloadAction<{ todoListId: string, taskId: string, taskStatus: TResponseStatus }>) {
            const index = state[action.payload.todoListId].findIndex(task => task.id === action.payload.taskId)
            state[action.payload.todoListId][index].taskStatus = action.payload.taskStatus
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodoList.fulfilled, (state, action) => {
            state[action.payload.todoList.id] = []
        })
        builder.addCase(removeTodoList.fulfilled, (state, action) => {
            delete state[action.payload.todoListId]
        })
        builder.addCase(fetchTodoLists.fulfilled, (state, action) => {
            action.payload?.todoLists.forEach(tl => state[tl.id] = [])
        })
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            if (action.payload) {
                state[action.payload.todoListId] = action.payload.tasks.map(task => ({...task, taskStatus: 'idle'}))
            }
        })
        builder.addCase(addTask.fulfilled, (state, action) => {
            state[action.payload.task.todoListId].unshift({...action.payload.task, taskStatus: 'idle'})
        })
        builder.addCase(removeTask.fulfilled, (state, action) => {
            const index = state[action.payload.todoListId].findIndex(task => task.id === action.payload.taskId)
            if (index > -1) state[action.payload.todoListId].splice(index, 1)
        })
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const index = state[action.payload.todoListId].findIndex(task => task.id === action.payload.taskId)
            if (index > -1) {
                state[action.payload.todoListId][index] =
                    {...state[action.payload.todoListId][index], ...action.payload.model}
            }
        })
    }
})

export const tasksReducer = slice.reducer
export const {_setTaskStatus} = slice.actions

//* ============================================================================================== Thunk Creators ====>>


//* ======================================================================================================== Types ===>>
export type TTaskDomain = TTask & { taskStatus: TResponseStatus }
export type TTasks = { [key: string]: Array<TTaskDomain> }

// type for updateTask thunk realization to use only those props user wants to update
export type TTaskUpdateDomainModel = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

