import {v1} from 'uuid';
import {TodoListType} from '../api/todoLists_api';


export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}

const initState: Array<TodoListDomainType> = []

export const todoListsReducer = (state: Array<TodoListDomainType> = initState, action: TodolistActionsType): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [
                {id: action.todolistId, title: action.title, filter: 'all', addedDate: '', order: 0},
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

export type TodolistActionsType = ReturnType<typeof removeTodoListAC> | ReturnType<typeof addTodoListAC> |
    ReturnType<typeof changeTodoListTitleAC> | ReturnType<typeof changeTodoListFilterAC>

export const removeTodoListAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const addTodoListAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()} as const
}
export const changeTodoListTitleAC = (todolistId: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: title} as const
}
export const changeTodoListFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter} as const
}