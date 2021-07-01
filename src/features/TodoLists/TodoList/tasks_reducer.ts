import {_addTodoList, _fetchTodoLists, _removeTodoList} from '../todolists_reducer'
import {TaskPriorities, tasksAPI, TaskStatuses, TTask, TTaskUpdateModel} from '../../../api/tasks_api'
import {setAppStatus, TResponseStatus} from '../../../app/app_reducer'
import {thunkServerCatchError, thunkServerResponseError} from '../../../utils/thunk-helpers/thunk-errors-handle'
import {Dispatch} from 'redux'

const initState: TTasks = {}

//* ======================================================================================================= Reducer ==>>
export const tasksReducer = (state: TTasks = initState, action: any): TTasks => {
    switch (action.type) {
        case 'para-slov/tasksReducer/FETCH-TASKS':
            return {...state, [action.todolistId]: action.tasks.map((task: any) => ({...task, taskStatus: 'idle'}))}
        case 'para-slov/tasksReducer/REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
        case 'para-slov/tasksReducer/ADD-TASK':
            return {...state, [action.todolistId]: [{...action.task, taskStatus: 'idle'}, ...state[action.todolistId]]}
        case 'para-slov/tasksReducer/UPDATE-TASK':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId ? {...task, ...action.model} : task)
            }
        case 'para-slov/tasksReducer/SET-TASK-STATUS':
            return {
                ...state, [action.todoListId]: state[action.todoListId]
                    .map(task => task.id === action.taskId ? {...task, taskStatus: action.taskStatus} : task)
            }
        case _addTodoList.type:
            return {...state, [action.payload.todoList.id]: []}
        case _removeTodoList.type:
            let stateCopy = {...state}
            delete stateCopy[action.payload.todoListId]
            return stateCopy
        case _fetchTodoLists.type:
            const StateCopy = {...state}
            action.payload.todoLists.forEach((tl: any) => StateCopy[tl.id] = [])
            return StateCopy
        default:
            return state
    }
}

//* ================================================================================================ Action Creators ==>>
export const _removeTask = (todoListId: string, taskId: string) =>
    ({type: 'para-slov/tasksReducer/REMOVE-TASK', todolistId: todoListId, taskId} as const)
export const _addTask = (todoListId: string, task: TTask) =>
    ({type: 'para-slov/tasksReducer/ADD-TASK', todolistId: todoListId, task} as const)
export const _updateTask = (todoListId: string, taskId: string, model: TTaskUpdateModel) =>
    ({type: 'para-slov/tasksReducer/UPDATE-TASK', todolistId: todoListId, taskId, model} as const)
export const _fetchTasks = (todoListId: string, tasks: TTask[]) =>
    ({type: 'para-slov/tasksReducer/FETCH-TASKS', todolistId: todoListId, tasks} as const)
export const _setTaskStatus = (todoListId: string, taskId: string, taskStatus: TResponseStatus) =>
    ({type: 'para-slov/tasksReducer/SET-TASK-STATUS', todoListId, taskId, taskStatus} as const)

//* ============================================================================================== Thunk Creators ====>>
export const fetchTasks = (todoListId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    tasksAPI.fetchTasks(todoListId)
        .then(data => {
            dispatch(_fetchTasks(todoListId, data.items))
            dispatch(setAppStatus({status: 'succeeded'}))
        })
        .catch(error => {
            thunkServerCatchError(error, dispatch)
        })
}
export const addTask = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    tasksAPI.addTask(todoListId, title)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(_addTask(todoListId, data.data.item))
                dispatch(setAppStatus({status: 'succeeded'}))
            } else {
                thunkServerResponseError(data, dispatch)
            }
        })
        .catch(error => {
            thunkServerCatchError(error, dispatch)
        })
}
export const removeTask = (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(_setTaskStatus(todoListId, taskId, 'loading'))
    tasksAPI.removeTask(todoListId, taskId)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(_removeTask(todoListId, taskId))
            }
            dispatch(setAppStatus({status: 'succeeded'}))
        })
        .catch(error => {
            thunkServerCatchError(error, dispatch)
            dispatch(_setTaskStatus(todoListId, taskId, 'failed'))
        })
}
export const updateTask = (todoListId: string, task: TTask, model: TTaskUpdateDomainModel) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(_setTaskStatus(todoListId, task.id, 'loading'))
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
                dispatch(_updateTask(todoListId, task.id, updatedTaskModel))
                dispatch(setAppStatus({status: 'succeeded'}))
                dispatch(_setTaskStatus(todoListId, task.id, 'succeeded'))
            } else {
                thunkServerResponseError(data, dispatch)
                dispatch(_setTaskStatus(todoListId, task.id, 'failed'))
            }
        })
        .catch(error => {
            thunkServerCatchError(error, dispatch)
            dispatch(_setTaskStatus(todoListId, task.id, 'failed'))
        })
}

//* ======================================================================================================== Types ===>>
export type TTaskDomain = TTask & { taskStatus: TResponseStatus }
export type TTasks = {
    [key: string]: Array<TTaskDomain>
}
export type TTasksActions = ReturnType<typeof _removeTask>
    | ReturnType<typeof _addTask>
    | ReturnType<typeof _updateTask>
    | ReturnType<typeof _fetchTasks>
    | ReturnType<typeof _setTaskStatus>

// type for updateTask thunk realization to use only those props user wants to update
export type TTaskUpdateDomainModel = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

