import {_addTodoList, _fetchTodoLists, _removeTodoList} from '../todolists_reducer';
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, TaskUpdateModelType} from '../../../api/tasks_api';
import {BaseThunkType} from '../../../app/store';
import {setAppError, setAppStatus} from '../../../app/app_reducer';

const initState: TasksType = {}

//* ====== Reducer ===================================================================================================>>
export const tasksReducer = (state: TasksType = initState, action: TasksActionsType): TasksType => {
    switch (action.type) {
        case 'para-slov/tasksReducer/REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
        case 'para-slov/tasksReducer/ADD-TASK':
            return {...state, [action.todolistId]: [action.task, ...state[action.todolistId]]}
        case 'para-slov/tasksReducer/UPDATE-TASK':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId ? {...task, ...action.model} : task)
            }
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
        case 'para-slov/tasksReducer/SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}

//* ====== Action Creators ===========================================================================================>>
export const _removeTask = (todolistId: string, taskId: string) =>
    ({type: 'para-slov/tasksReducer/REMOVE-TASK', todolistId, taskId} as const)
export const _addTask = (todolistId: string, task: TaskType) =>
    ({type: 'para-slov/tasksReducer/ADD-TASK', todolistId, task} as const)
export const _updateTask = (todolistId: string, taskId: string, model: TaskUpdateModelType) =>
    ({type: 'para-slov/tasksReducer/UPDATE-TASK', todolistId, taskId, model} as const)
export const _fetchTasks = (todolistId: string, tasks: TaskType[]) =>
    ({type: 'para-slov/tasksReducer/SET-TASKS', todolistId, tasks} as const)

//* ====== Thunk Creators ============================================================================================>>
export const fetchTasks = (todolistId: string): ThunkType => dispatch => {
    dispatch(setAppStatus('loading'))
    tasksAPI.fetchTasks(todolistId).then(data => {
        dispatch(_fetchTasks(todolistId, data.items))
        dispatch(setAppStatus('succeeded'))
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
                if (data.resultCode === 1) {
                    data.messages.length && dispatch(setAppError(data.messages[0]))
                } else {
                    dispatch(setAppError('some error occurred'))
                }
                dispatch(setAppStatus('failed'))
            }
        })
}
export const removeTask = (todoListId: string, taskId: string): ThunkType => dispatch => {
    dispatch(setAppStatus('loading'))
    tasksAPI.removeTask(todoListId, taskId)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(_removeTask(todoListId, taskId))
            }
            dispatch(setAppStatus('succeeded'))
        })
}
export const updateTask = (todoListId: string, task: TaskType, model: TaskUpdateDomainModelType): ThunkType =>
    dispatch => {
        dispatch(setAppStatus('loading'))
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
                }
                dispatch(setAppStatus('succeeded'))
            })
    }

//* ====== Types =====================================================================================================>>
export type TasksType = {
    [key: string]: Array<TaskType>
}
export type TasksActionsType = ReturnType<typeof _removeTask>
    | ReturnType<typeof _addTask>
    | ReturnType<typeof _updateTask>
    | ReturnType<typeof _addTodoList>
    | ReturnType<typeof _removeTodoList>
    | ReturnType<typeof _fetchTodoLists>
    | ReturnType<typeof _fetchTasks>
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

