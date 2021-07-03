import {combineReducers} from 'redux'
import {tasksReducer} from '../features/TodoLists/TodoList/tasks_reducer'
import {todoListsReducer} from '../features/TodoLists/todolists_reducer'
import thunkMW from 'redux-thunk'
import {appReducer} from './app_reducer'
import {authReducer} from '../features/Login/auth_reducer'
import {configureStore} from '@reduxjs/toolkit'


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
    auth: authReducer,
})

export type TRootReducer = typeof rootReducer

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMW)
})

export type TAppState = ReturnType<TRootReducer>