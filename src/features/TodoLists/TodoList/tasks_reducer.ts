import {addTodoList, fetchTodoLists, removeTodoList} from '../todolists_reducer'
import {TaskPriorities, tasksAPI, TaskStatuses, TTask, TTaskUpdateModel} from '../../../api/tasks_api'
import {setAppStatus, TResponseStatus} from '../../../app/app_reducer'
import {thunkServerCatchError, thunkServerResponseError} from '../../../utils/thunk-helpers/thunk-errors-handle'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TAppDispatch} from '../../../app/store'

const initState: TTasks = {}


export const fetchTasks = createAsyncThunk('tasksReducer/fetchTasks', async (payload: { todoListId: string }, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        let data = await tasksAPI.fetchTasks(payload.todoListId)
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        return {todoListId: payload.todoListId, tasks: data.items}
    } catch (error) {
        thunkServerCatchError(error, thunkAPI.dispatch)
    }
})

const slice = createSlice({
    name: 'tasksReducer',
    initialState: initState,
    reducers: {
        _addTask(state, action: PayloadAction<{ task: TTask }>) {
            state[action.payload.task.todoListId].unshift({...action.payload.task, taskStatus: 'idle'})
        },
        _removeTask(state, action: PayloadAction<{ todoListId: string, taskId: string }>) {
            const index = state[action.payload.todoListId].findIndex(task => task.id === action.payload.taskId)
            if (index > -1) state[action.payload.todoListId].splice(index, 1)
        },
        _updateTask(state, action: PayloadAction<{ todoListId: string, taskId: string, model: TTaskUpdateModel }>) {
            const index = state[action.payload.todoListId].findIndex(task => task.id === action.payload.taskId)
            if (index > -1) {
                state[action.payload.todoListId][index] =
                    {...state[action.payload.todoListId][index], ...action.payload.model}
            }
        },
        _fetchTasks(state, action: PayloadAction<{ todoListId: string, tasks: TTask[] }>) {
            state[action.payload.todoListId] = action.payload.tasks.map(task => ({...task, taskStatus: 'idle'}))
        },
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
            if(action.payload) {
                state[action.payload.todoListId] = action.payload.tasks.map(task => ({...task, taskStatus: 'idle'}))
            }
        })
    }
})

export const tasksReducer = slice.reducer
export const {_removeTask, _addTask, _updateTask, _fetchTasks, _setTaskStatus} = slice.actions

//* ============================================================================================== Thunk Creators ====>>

export const addTask = (todoListId: string, title: string) => (dispatch: TAppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    tasksAPI.addTask(todoListId, title)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(_addTask({task: data.data.item}))
                dispatch(setAppStatus({status: 'succeeded'}))
            } else {
                thunkServerResponseError(data, dispatch)
            }
        })
        .catch(error => {
            thunkServerCatchError(error, dispatch)
        })
}
export const removeTask = (todoListId: string, taskId: string) => (dispatch: TAppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(_setTaskStatus({todoListId, taskId, taskStatus: 'loading'}))
    tasksAPI.removeTask(todoListId, taskId)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(_removeTask({todoListId, taskId}))
            }
            dispatch(setAppStatus({status: 'succeeded'}))
        })
        .catch(error => {
            thunkServerCatchError(error, dispatch)
            dispatch(_setTaskStatus({todoListId, taskId, taskStatus: 'failed'}))
        })
}
export const updateTask = (todoListId: string, task: TTask, model: TTaskUpdateDomainModel) => (dispatch: TAppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(_setTaskStatus({todoListId, taskId: task.id, taskStatus: 'loading'}))
    const updatedTaskModel: TTaskUpdateModel = {
        title: task.title,
        startDate: task.startDate,
        priority: task.priority,
        deadline: task.deadline,
        description: task.description,
        status: task.status,
        ...model
    }
    tasksAPI.updateTask(todoListId, task.id, updatedTaskModel)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(_updateTask({todoListId, taskId: task.id, model: updatedTaskModel}))
                dispatch(setAppStatus({status: 'succeeded'}))
                dispatch(_setTaskStatus({todoListId, taskId: task.id, taskStatus: 'succeeded'}))
            } else {
                thunkServerResponseError(data, dispatch)
                dispatch(_setTaskStatus({todoListId, taskId: task.id, taskStatus: 'failed'}))
            }
        })
        .catch(error => {
            thunkServerCatchError(error, dispatch)
            dispatch(_setTaskStatus({todoListId, taskId: task.id, taskStatus: 'failed'}))
        })
}

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

