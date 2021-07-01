import {todoListsAPI, TTodoList} from '../../api/todoLists_api'
import {setAppStatus, TResponseStatus} from '../../app/app_reducer'
import {thunkServerCatchError, thunkServerResponseError} from '../../utils/thunk-helpers/thunk-errors-handle'
import {Dispatch} from 'redux'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

//* ====== Reducer ===================================================================================================>>
const initState: Array<TTodoListDomain> = []

export const slice = createSlice({
    name: 'todoListReducer',
    initialState: initState,
    reducers: {
        _removeTodoList(state, action: PayloadAction<{ todoListId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId)
            if (index > -1) state.splice(index, 1)
        },
        _addTodoList(state, action: PayloadAction<{ todoList: TTodoList }>) {
            state.unshift({...action.payload.todoList, filter: 'all', todoListStatus: 'idle'})
        },
        _changeTodoListTitle(state, action: PayloadAction<{ todoListId: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId)
            state[index].title = action.payload.title
        },
        _changeTodoListFilter(state, action: PayloadAction<{ todoListId: string, filter: TFilterValues }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId)
            state[index].filter = action.payload.filter
        },
        _fetchTodoLists(state, action: PayloadAction<{ todoLists: TTodoList[] }>) {
            return action.payload.todoLists.map(tl => ({...tl, filter: 'all', todoListStatus: 'idle'}))
        },
        _setTodoListStatus(state, action: PayloadAction<{ todoListId: string, todoListStatus: TResponseStatus }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId)
            state[index].todoListStatus = action.payload.todoListStatus
        },
    }
})

export const todoListsReducer = slice.reducer
export const {
    _removeTodoList, _addTodoList, _changeTodoListTitle, _changeTodoListFilter, _fetchTodoLists,
    _setTodoListStatus
} = slice.actions
//* ====== Thunk Creators ============================================================================================>>
export const fetchTodoListsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    todoListsAPI.fetchTodoLists()
        .then(data => {
            dispatch(_fetchTodoLists({todoLists: data}))
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
                dispatch(_addTodoList({todoList: data.data.item}))
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
    dispatch(_setTodoListStatus({todoListId, todoListStatus: 'loading'}))
    todoListsAPI.removeTodoList(todoListId)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(_removeTodoList({todoListId}))
            }
            dispatch(setAppStatus({status: 'succeeded'}))
        })
        .catch(error => {
            thunkServerCatchError(error, dispatch)
        })
}
export const changeTodoListTitle = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(_setTodoListStatus({todoListId, todoListStatus: 'loading'}))
    todoListsAPI.updateTodoList(todoListId, title)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(_changeTodoListTitle({todoListId, title}))
                dispatch(setAppStatus({status: 'succeeded'}))
                dispatch(_setTodoListStatus({todoListId, todoListStatus: 'succeeded'}))
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

