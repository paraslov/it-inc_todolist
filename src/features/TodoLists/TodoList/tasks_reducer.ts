import {_addTodoList, _fetchTodoLists, _removeTodoList} from '../todolists_reducer';
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, TaskUpdateModelType} from '../../../api/tasks_api';
import {BaseThunkType} from '../../../app/store';
import {ResponseStatusType, setAppError, setAppStatus} from '../../../app/app_reducer';
import {thunkServerCatchError, thunkServerResponseError} from '../../../utils/thunk-helpers/thunk-errors-handle';

const initState: TasksType = {}

//* ======================================================================================================= Reducer ==>>
export const tasksReducer = (state: TasksType = initState, action: TasksActionsType): TasksType => {
    switch (action.type) {
        case 'para-slov/tasksReducer/FETCH-TASKS':
            return {...state, [action.todolistId]: action.tasks.map(task => ({...task, taskStatus: 'idle'}))}
        case 'para-slov/tasksReducer/REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
        case 'para-slov/tasksReducer/ADD-TASK':
            return {...state, [action.todolistId]: [{...action.task, taskStatus: 'idle'}, ...state[action.todolistId]]}
        case 'para-slov/tasksReducer/UPDATE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId ? {...task, ...action.model} : task)}
        case 'para-slov/tasksReducer/SET-TASK-STATUS':
            return {...state, [action.todoListId]: state[action.todoListId]
                    .map(task => task.id === action.taskId ? {...task, taskStatus: action.taskStatus} : task)}
        case 'para-slov/todoListReducer/ADD-TODOLIST':
            return {...state, [action.todoList.id]: []}
        case 'para-slov/todoListReducer/REMOVE-TODOLIST':
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        case 'para-slov/todoListReducer/SET-TODOLISTS':
            const StateCopy = {...state}
            action.todolists.forEach(tl => StateCopy[tl.id] = [])
            return StateCopy
        default:
            return state
    }
}

//* ================================================================================================ Action Creators ==>>
export const _removeTask = (todoListId: string, taskId: string) =>
    ({type: 'para-slov/tasksReducer/REMOVE-TASK', todolistId: todoListId, taskId} as const)
export const _addTask = (todoListId: string, task: TaskType) =>
    ({type: 'para-slov/tasksReducer/ADD-TASK', todolistId: todoListId, task} as const)
export const _updateTask = (todoListId: string, taskId: string, model: TaskUpdateModelType) =>
    ({type: 'para-slov/tasksReducer/UPDATE-TASK', todolistId: todoListId, taskId, model} as const)
export const _fetchTasks = (todoListId: string, tasks: TaskType[]) =>
    ({type: 'para-slov/tasksReducer/FETCH-TASKS', todolistId: todoListId, tasks} as const)
export const _setTaskStatus = (todoListId: string, taskId: string, taskStatus: ResponseStatusType) =>
    ({type: 'para-slov/tasksReducer/SET-TASK-STATUS', todoListId, taskId, taskStatus} as const)

//* ============================================================================================== Thunk Creators ====>>
export const fetchTasks = (todoListId: string): ThunkType => dispatch => {
    dispatch(setAppStatus('loading'))
    tasksAPI.fetchTasks(todoListId)
        .then(data => {
            dispatch(_fetchTasks(todoListId, data.items))
            dispatch(setAppStatus('succeeded'))
        })
        .catch(error => {
            thunkServerCatchError(error, dispatch)
        })
}
export const addTask = (todoListId: string, title: string): ThunkType => dispatch => {
    dispatch(setAppStatus('loading'))
    tasksAPI.addTask(todoListId, title)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(_addTask(todoListId, data.data.item))
                dispatch(setAppStatus('succeeded'))
            } else {
                thunkServerResponseError(data, dispatch)
            }
        })
        .catch(error => {
            thunkServerCatchError(error, dispatch)
        })
}
export const removeTask = (todoListId: string, taskId: string): ThunkType => dispatch => {
    dispatch(setAppStatus('loading'))
    dispatch(_setTaskStatus(todoListId, taskId, 'loading'))
    tasksAPI.removeTask(todoListId, taskId)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(_removeTask(todoListId, taskId))
            }
            dispatch(setAppStatus('succeeded'))
        })
        .catch(error => {
            thunkServerCatchError(error, dispatch)
            dispatch(_setTaskStatus(todoListId, taskId, 'failed'))
        })
}
export const updateTask = (todoListId: string, task: TaskType, model: TaskUpdateDomainModelType): ThunkType =>
    dispatch => {
        dispatch(setAppStatus('loading'))
        dispatch(_setTaskStatus(todoListId, task.id, 'loading'))
        const updatedTaskModel: TaskUpdateModelType = {
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
                    dispatch(setAppStatus('succeeded'))
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
export type TaskDomainType = TaskType & { taskStatus: ResponseStatusType }
export type TasksType = {
    [key: string]: Array<TaskDomainType>
}
export type TasksActionsType = ReturnType<typeof _removeTask>
    | ReturnType<typeof _addTask>
    | ReturnType<typeof _updateTask>
    | ReturnType<typeof _fetchTasks>
    | ReturnType<typeof _setTaskStatus>
    | ReturnType<typeof _addTodoList>
    | ReturnType<typeof _removeTodoList>
    | ReturnType<typeof _fetchTodoLists>
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>

type ThunkType = BaseThunkType<TasksActionsType>
// type for updateTask thunk realization to use only those props user wants to update
export type TaskUpdateDomainModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

