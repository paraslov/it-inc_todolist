import {v1} from 'uuid';
import {todoListsAPI, TodoListType} from '../api/todoLists_api';
import {BaseThunkType} from './store';

//* ====== Types =====================================================================================================>>
export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}

const initState: Array<TodoListDomainType> = []

//* ====== Reducer ===================================================================================================>>
export const todoListsReducer =
    (state: Array<TodoListDomainType> = initState, action: TodoListActionsType): Array<TodoListDomainType> => {
        switch (action.type) {
            case 'para-slov/todoListReducer/REMOVE-TODOLIST':
                return state.filter(tl => tl.id !== action.id)
            case 'para-slov/todoListReducer/ADD-TODOLIST':
                return [
                    {id: action.todolistId, title: action.title, filter: 'all', addedDate: '', order: 0},
                    ...state
                ]
            case 'para-slov/todoListReducer/CHANGE-TODOLIST-TITLE':
                return state.map(tl => tl.id === action.id ? ({...tl, title: action.title}) : tl)
            case 'para-slov/todoListReducer/CHANGE-TODOLIST-FILTER':
                return state.map(tl => tl.id === action.id ? ({...tl, filter: action.filter}) : tl)
            case 'para-slov/todoListReducer/SET-TODOLISTS':
                return action.todolists.map(tl => ({...tl, filter: 'all'}))
            default:
                return state
        }
    }

//* ====== Action Creators ===========================================================================================>>
export type TodoListActionsType =
    ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof setTodoListsAC>

export const removeTodoListAC = (todolistId: string) =>
    ({type: 'para-slov/todoListReducer/REMOVE-TODOLIST', id: todolistId} as const)
export const addTodoListAC = (title: string) =>
    ({type: 'para-slov/todoListReducer/ADD-TODOLIST', title: title, todolistId: v1()} as const)
export const changeTodoListTitleAC = (todolistId: string, title: string) =>
    ({type: 'para-slov/todoListReducer/CHANGE-TODOLIST-TITLE', id: todolistId, title: title} as const)
export const changeTodoListFilterAC = (todolistId: string, filter: FilterValuesType) =>
    ({type: 'para-slov/todoListReducer/CHANGE-TODOLIST-FILTER', id: todolistId, filter} as const)
export const setTodoListsAC = (todolists: TodoListType[]) =>
    ({type: 'para-slov/todoListReducer/SET-TODOLISTS', todolists} as const)

//* ====== Thunk Creators ============================================================================================>>
type ThunkType = BaseThunkType<TodoListActionsType>

export const fetchTodoListsTC = (): ThunkType => dispatch => {
    todoListsAPI.getTodoLists()
        .then(data => {
            dispatch(setTodoListsAC(data))
        })
}