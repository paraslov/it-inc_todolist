import {todoListsAsyncActions} from '../todolists_reducer'
import {TaskPriorities, tasksAPI, TaskStatuses, TTask, TTaskUpdateModel} from '../../../api/tasks_api'
import {setAppStatus, TResponseStatus} from '../../../app/app_reducer'
import {
    thunkServerCatchError,
    thunkServerResponseError
} from '../../../utils/thunk-errors-handle'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {authAsyncActions} from '../../Login/auth_reducer'
import {TThunkApiConfigRejectedValue} from '../../../app/store'


//* ============================================================================================== Thunk Creators ====>>
export const fetchTasks = createAsyncThunk<{todoListId: string, tasks: TTask[]}, { todoListId: string }, TThunkApiConfigRejectedValue>
('tasksReducer/fetchTasks', async (payload, thunkAPI) => {
        try {
            thunkAPI.dispatch(setAppStatus({status: 'loading'}))
            const data = await tasksAPI.fetchTasks(payload.todoListId)
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {todoListId: payload.todoListId, tasks: data.items}
        } catch (error) {
            return thunkServerCatchError(error, thunkAPI)
        }
    })
export const addTask = createAsyncThunk<{ task: TTask }, { todoListId: string, title: string }, TThunkApiConfigRejectedValue>
('tasksReducer/addTask', async (payload, thunkAPI) => {
        try {
            thunkAPI.dispatch(setAppStatus({status: 'loading'}))
            const data = await tasksAPI.addTask(payload.todoListId, payload.title)
            if (data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
                return {task: data.data.item}
            } else {
                return thunkServerResponseError(data, thunkAPI, false)
            }
        } catch (error) {
            return thunkServerCatchError(error, thunkAPI, false)
        }
    })
export const removeTask = createAsyncThunk<{ todoListId: string, taskId: string }, { todoListId: string, taskId: string }, TThunkApiConfigRejectedValue>
('tasksReducer/removeTask', async ({todoListId, taskId}, thunkAPI) => {
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
                return thunkServerResponseError(data, thunkAPI)
            }
        } catch (error) {
            thunkAPI.dispatch(_setTaskStatus({todoListId, taskId, taskStatus: 'failed'}))
            return thunkServerCatchError(error, thunkAPI)
        }
    })
export const updateTask = createAsyncThunk<{todoListId: string, taskId: string, model: TTaskUpdateModel},
    { todoListId: string, task: TTask, model: TTaskUpdateDomainModel }, TThunkApiConfigRejectedValue>
('tasksReducer/updateTask', async ({todoListId, task, model}, thunkAPI) => {
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
                thunkAPI.dispatch(_setTaskStatus({todoListId, taskId: task.id, taskStatus: 'failed'}))
                return thunkServerResponseError(data, thunkAPI)
            }
        } catch (error) {
            thunkAPI.dispatch(_setTaskStatus({todoListId, taskId: task.id, taskStatus: 'failed'}))
            return thunkServerCatchError(error, thunkAPI)
        }
    })

export const tasksAsyncActions = {fetchTasks, addTask, removeTask, updateTask}

//* ====== Reducer ===================================================================================================>>
const initState: TTasks = {}

export const slice = createSlice({
    name: 'tasksReducer',
    initialState: initState,
    reducers: {
        _setTaskStatus(state, action: PayloadAction<{ todoListId: string, taskId: string, taskStatus: TResponseStatus }>) {
            const index = state[action.payload.todoListId].findIndex(task => task.id === action.payload.taskId)
            state[action.payload.todoListId][index].taskStatus = action.payload.taskStatus
        },
    },
    extraReducers: (builder) => {
        builder.addCase(todoListsAsyncActions.addTodoList.fulfilled, (state, action) => {
            state[action.payload.todoList.id] = []
        })
        builder.addCase(todoListsAsyncActions.removeTodoList.fulfilled, (state, action) => {
            delete state[action.payload.todoListId]
        })
        builder.addCase(todoListsAsyncActions.fetchTodoLists.fulfilled, (state, action) => {
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
        builder.addCase(authAsyncActions.logout.fulfilled, (state) => {
            // Object.keys(state).map(taskId => delete state[taskId])
        })
    }
})

export const tasksReducer = slice.reducer
export const {_setTaskStatus} = slice.actions

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

