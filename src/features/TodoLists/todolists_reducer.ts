import {todoListsAPI, TTodoList} from '../../api/todoLists_api'
import {setAppStatus, TResponseStatus} from '../../app/app_reducer'
import {
    thunkServerCatchError,
    thunkServerResponseError
} from '../../utils/thunk-errors-handle'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {authAsyncActions} from '../Login/auth_reducer'
import {TThunkApiConfigRejectedValue} from '../../app/store'


//* ====== Thunk Creators ============================================================================================>>

export const fetchTodoLists = createAsyncThunk<{ todoLists: TTodoList[] }, undefined, TThunkApiConfigRejectedValue>
('todoListReducer/fetchTodoLists', async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        let data = await todoListsAPI.fetchTodoLists()
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        return {todoLists: data}
    } catch (error) {
        return thunkServerCatchError(error, thunkAPI)
    }
})
export const addTodoList = createAsyncThunk<{ todoList: TTodoList }, { title: string }, TThunkApiConfigRejectedValue>
('todoListReducer/addTodoList', async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        const data = await todoListsAPI.addTodoList(payload.title)
        if (data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {todoList: data.data.item}
        } else {
            return thunkServerResponseError(data, thunkAPI, false)
        }
    } catch (error) {
        return thunkServerCatchError(error, thunkAPI, false)
    }
})

export const removeTodoList = createAsyncThunk<{ todoListId: string }, { todoListId: string }, TThunkApiConfigRejectedValue>
('todoListReducer/removeTodoList', async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        thunkAPI.dispatch(_setTodoListStatus({todoListId: payload.todoListId, todoListStatus: 'loading'}))
        const data = await todoListsAPI.removeTodoList(payload.todoListId)
        if (data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {todoListId: payload.todoListId}
        } else {
            return thunkServerResponseError(data, thunkAPI)
        }
    } catch (error) {
        thunkAPI.dispatch(_setTodoListStatus({todoListId: payload.todoListId, todoListStatus: 'failed'}))
        return thunkServerCatchError(error, thunkAPI)
    }
})
export const changeTodoListTitle = createAsyncThunk<{ todoListId: string, title: string }, { todoListId: string, title: string }, TThunkApiConfigRejectedValue>('todoListReducer/changeTodoListTitle', async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        thunkAPI.dispatch(_setTodoListStatus({todoListId: payload.todoListId, todoListStatus: 'loading'}))
        const data = await todoListsAPI.updateTodoList(payload.todoListId, payload.title)
        if (data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            thunkAPI.dispatch(_setTodoListStatus({todoListId: payload.todoListId, todoListStatus: 'succeeded'}))
            return payload
        } else {
            return thunkServerResponseError(data, thunkAPI)
        }
    } catch (error) {
        return thunkServerCatchError(error, thunkAPI)
    }
})

export const todoListsAsyncActions = {fetchTodoLists, addTodoList, removeTodoList, changeTodoListTitle}

//* ====== Reducer ===================================================================================================>>

const initState: Array<TTodoListDomain> = []

export const slice = createSlice({
    name: 'todoListReducer',
    initialState: initState,
    reducers: {
        _changeTodoListFilter(state, action: PayloadAction<{ todoListId: string, filter: TFilterValues }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId)
            state[index].filter = action.payload.filter
        },
        _setTodoListStatus(state, action: PayloadAction<{ todoListId: string, todoListStatus: TResponseStatus }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId)
            state[index].todoListStatus = action.payload.todoListStatus
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchTodoLists.fulfilled, (state, action) => {
            return action.payload.todoLists.map(tl => ({...tl, filter: 'all', todoListStatus: 'idle'}))
        })
        builder.addCase(addTodoList.fulfilled, (state, action) => {
            state.unshift({...action.payload.todoList, filter: 'all', todoListStatus: 'idle'})
        })
        builder.addCase(removeTodoList.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId)
            if (index > -1) state.splice(index, 1)
        })
        builder.addCase(changeTodoListTitle.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId)
            state[index].title = action.payload.title
        })
        builder.addCase(authAsyncActions.logout.fulfilled, (state) => {
            // state.filter((tl) => false)
        })
    }
})

export const todoListsReducer = slice.reducer
export const {_changeTodoListFilter, _setTodoListStatus} = slice.actions

//* ====== Types =====================================================================================================>>
export type TFilterValues = 'all' | 'completed' | 'active'
export type TTodoListDomain = TTodoList & {
    filter: TFilterValues
    todoListStatus: TResponseStatus
}

