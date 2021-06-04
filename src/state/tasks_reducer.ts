import {v1} from 'uuid';
import {addTodoListAC, removeTodoListAC, setTodoListsAC} from './todolists_reducer';
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType} from '../api/tasks_api';
import {BaseThunkType} from './store';

//* ====== Types =====================================================================================================>>
export type TasksType = {
    [key: string]: Array<TaskType>
}
const initState: TasksType = {}

//* ====== Reducer ===================================================================================================>>
export const tasksReducer = (state: TasksType = initState, action: TasksActionsType): TasksType => {
    switch (action.type) {
        case 'para-slov/tasksReducer/REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
            }
        case 'para-slov/tasksReducer/ADD-TASK':
            return {
                ...state,
                [action.todolistId]: [{
                    id: v1(),
                    title: action.title,
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Middle,
                    addedDate: '',
                    order: 0,
                    startDate: '',
                    deadline: '',
                    todoListId: action.todolistId,
                    description: 'desc'
                },
                    ...state[action.todolistId]]
            }
        case 'para-slov/tasksReducer/CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId ? {...task, title: action.title} : task)
            }
        case 'para-slov/tasksReducer/CHANGE-TASK-IS-DONE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId ? {...task, status: action.status} : task)
            }
        case 'para-slov/todoListReducer/ADD-TODOLIST':
            return {
                ...state,
                [action.todolistId]: []
            }
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
export type TasksActionsType = ReturnType<typeof removeTaskAC> | ReturnType<typeof addTaskAC> |
    ReturnType<typeof changeTaskTitleAC> | ReturnType<typeof changeTaskIsDoneAC> |
    ReturnType<typeof addTodoListAC> | ReturnType<typeof removeTodoListAC> | ReturnType<typeof setTodoListsAC> |
    ReturnType<typeof setTasks>

export const removeTaskAC = (todolistId: string, taskId: string) =>
    ({type: 'para-slov/tasksReducer/REMOVE-TASK', todolistId, taskId} as const)
export const addTaskAC = (todolistId: string, title: string) =>
    ({type: 'para-slov/tasksReducer/ADD-TASK', todolistId: todolistId, title: title} as const)
export const changeTaskIsDoneAC = (todolistId: string, taskId: string, status: TaskStatuses) =>
    ({type: 'para-slov/tasksReducer/CHANGE-TASK-IS-DONE', todolistId, taskId, status} as const)
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) =>
    ({type: 'para-slov/tasksReducer/CHANGE-TASK-TITLE', todolistId, taskId, title} as const)
export const setTasks = (todolistId: string, tasks: TaskType[]) =>
    ({type: 'para-slov/tasksReducer/SET-TASKS', todolistId, tasks} as const)

//* ====== Thunk Creators ============================================================================================>>
type ThunkType = BaseThunkType<TasksActionsType>
export const fetchTasks = (todolistId: string): ThunkType => dispatch => {
    tasksAPI.getTasks(todolistId).then(data => {
        debugger
        dispatch(setTasks(todolistId, data.items))
    })
}