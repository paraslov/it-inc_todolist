import {combineReducers} from 'redux'
import {tasksReducer, todoListsReducer} from '../features/TodoLists'
import thunkMW from 'redux-thunk'
import {authReducer} from '../features/Login'
import {configureStore} from '@reduxjs/toolkit'
import {appReducer} from '../features/App'


export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
    auth: authReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMW)
})

