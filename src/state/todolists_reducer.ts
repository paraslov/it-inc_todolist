
import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../AppWithRedux';


const initState: Array<TodolistType> = []

export const todolistsReducer = (state: Array<TodolistType> = initState, action: TodolistActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [
                {id: action.todolistId, title: action.title, filter: 'all'},
                ...state
            ]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? ({...tl, title: action.title}) : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? ({...tl, filter: action.filter}) : tl)
        default:
            return state
    }
}

export type TodolistActionsType = ReturnType<typeof removeTodolistAC> | ReturnType<typeof addTodolistAC> |
    ReturnType<typeof changeTodolistTitleAC> | ReturnType<typeof changeTodolistFilterAC>

export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()} as const
}
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: title} as const
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter} as const
}