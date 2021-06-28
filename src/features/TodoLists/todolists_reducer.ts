import {todoListsAPI, TTodoList} from '../../api/todoLists_api'
import {setAppStatus, TResponseStatus} from '../../app/app_reducer'
import {thunkServerCatchError, thunkServerResponseError} from '../../utils/thunk-helpers/thunk-errors-handle'
import {Dispatch} from 'redux'

//* ====== Reducer ===================================================================================================>>
const initState: Array<TTodoListDomain> = []

export const todoListsReducer =
    (state: Array<TTodoListDomain> = initState, action: TTodoListActions): Array<TTodoListDomain> => {
        switch (action.type) {
            case 'para-slov/todoListReducer/REMOVE-TODOLIST':
                return state.filter(tl => tl.id !== action.id)
            case 'para-slov/todoListReducer/ADD-TODOLIST':
                return [{...action.todoList, filter: 'all', todoListStatus: 'idle'}, ...state]
            case 'para-slov/todoListReducer/CHANGE-TODOLIST-TITLE':
                return state.map(tl => tl.id === action.id ? ({...tl, title: action.title}) : tl)
            case 'para-slov/todoListReducer/CHANGE-TODOLIST-FILTER':
                return state.map(tl => tl.id === action.id ? ({...tl, filter: action.filter}) : tl)
            case 'para-slov/todoListReducer/SET-TODOLISTS':
                return action.todolists.map(tl => ({...tl, filter: 'all', todoListStatus: 'idle'}))
            case 'para-slov/todoListReducer/SET-TODOLISTS-STATUS':
                return state.map(tl => tl.id === action.todoListId ? ({
                    ...tl,
                    todoListStatus: action.todoListStatus
                }) : tl)
            default:
                return state
        }
    }

//* ====== Action Creators ===========================================================================================>>
export const _removeTodoList = (todoListId: string) =>
    ({type: 'para-slov/todoListReducer/REMOVE-TODOLIST', id: todoListId} as const)
export const _addTodoList = (todoList: TTodoList) =>
    ({type: 'para-slov/todoListReducer/ADD-TODOLIST', todoList} as const)
export const _changeTodoListTitle = (todoListId: string, title: string) =>
    ({type: 'para-slov/todoListReducer/CHANGE-TODOLIST-TITLE', id: todoListId, title: title} as const)
export const _changeTodoListFilter = (todoListId: string, filter: TFilterValues) =>
    ({type: 'para-slov/todoListReducer/CHANGE-TODOLIST-FILTER', id: todoListId, filter} as const)
export const _fetchTodoLists = (todoLists: TTodoList[]) =>
    ({type: 'para-slov/todoListReducer/SET-TODOLISTS', todolists: todoLists} as const)
export const _setTodoListStatus = (todoListId: string, todoListStatus: TResponseStatus) =>
    ({type: 'para-slov/todoListReducer/SET-TODOLISTS-STATUS', todoListId, todoListStatus} as const)

//* ====== Thunk Creators ============================================================================================>>
export const fetchTodoListsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    todoListsAPI.fetchTodoLists()
        .then(data => {
            dispatch(_fetchTodoLists(data))
            dispatch(setAppStatus({status: 'succeeded'}))
        })
        .catch(error => {
            thunkServerCatchError(error, dispatch)
        })
}
export const addTodoList = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    todoListsAPI.addTodoList(title)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(_addTodoList(data.data.item))
                dispatch(setAppStatus({status: 'succeeded'}))
            } else {
                thunkServerResponseError(data, dispatch)
            }
        })
        .catch(error => {
            thunkServerCatchError(error, dispatch)
        })
}
export const removeTodoList = (todoListId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(_setTodoListStatus(todoListId, 'loading'))
    todoListsAPI.removeTodoList(todoListId)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(_removeTodoList(todoListId))
            }
            dispatch(setAppStatus({status: 'succeeded'}))
        })
        .catch(error => {
            thunkServerCatchError(error, dispatch)
        })
}
export const changeTodoListTitle = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(_setTodoListStatus(todoListId, 'loading'))
    todoListsAPI.updateTodoList(todoListId, title)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(_changeTodoListTitle(todoListId, title))
                dispatch(setAppStatus({status: 'succeeded'}))
                dispatch(_setTodoListStatus(todoListId, 'succeeded'))
            } else {
                thunkServerResponseError(data, dispatch)
            }
        })
        .catch(error => {
            thunkServerCatchError(error, dispatch)
        })
}

//* ====== Types =====================================================================================================>>
export type TFilterValues = 'all' | 'completed' | 'active'
export type TTodoListDomain = TTodoList & {
    filter: TFilterValues
    todoListStatus: TResponseStatus
}

export type TTodoListActions = ReturnType<typeof _removeTodoList>
    | ReturnType<typeof _addTodoList>
    | ReturnType<typeof _changeTodoListTitle>
    | ReturnType<typeof _changeTodoListFilter>
    | ReturnType<typeof _fetchTodoLists>
    | ReturnType<typeof _setTodoListStatus>



