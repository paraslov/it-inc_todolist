import {combineReducers} from 'redux'
import {tasksReducer, todoListsReducer} from '../features/TodoLists'
import thunkMW from 'redux-thunk'
import {appReducer} from './'
import {authReducer} from '../features/Login'
import {configureStore} from '@reduxjs/toolkit'
import {TFieldError} from '../api/api'


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
    auth: authReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMW)
})

//* Common App types ==============================================================================================>>

export type TRootReducer = typeof rootReducer
export type TAppState = ReturnType<TRootReducer>
export type TAppDispatch = typeof store.dispatch
export type TThunkApiConfigRejectedValue = { rejectValue: { errors: string[], fieldsErrors?: TFieldError[] } }

