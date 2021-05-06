import {TasksType} from '../App';
import {v1} from 'uuid';
import {addTodolistAC, removeTodolistAC, todolist1, todolist2, todolist3} from './todolists_reducer';

const initState: TasksType = {}

export const tasksReducer = (state: TasksType = initState, action: TasksActionsType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId ? {...task, title: action.title} : task)
            }
        case 'CHANGE-TASK-IS-DONE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId ? {...task, isDone: !task.isDone} : task)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistId]: []
            }
        case 'REMOVE-TODOLIST':
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        default:
            return state
    }
}

export type TasksActionsType = ReturnType<typeof removeTaskAC> | ReturnType<typeof addTaskAC> |
    ReturnType<typeof changeTaskTitleAC> | ReturnType<typeof changeTaskIsDoneAC> |
    ReturnType<typeof addTodolistAC> | ReturnType<typeof removeTodolistAC>

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const
}
export const addTaskAC = (todolistId: string, title: string) => {
    return {type: 'ADD-TASK', todolistId: todolistId, title: title} as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title} as const
}
export const changeTaskIsDoneAC = (todolistId: string, taskId: string) => {
    return {type: 'CHANGE-TASK-IS-DONE', todolistId, taskId} as const
}