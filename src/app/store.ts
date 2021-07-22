import {ActionCreatorsMapObject, bindActionCreators, combineReducers} from 'redux'
import {tasksReducer} from '../features/TodoLists/TodoList/tasks_reducer'
import {todoListsReducer} from '../features/TodoLists/todolists_reducer'
import thunkMW from 'redux-thunk'
import {appReducer} from './app_reducer'
import {authReducer} from '../features/Login/auth_reducer'
import {configureStore} from '@reduxjs/toolkit'
import {useDispatch} from 'react-redux'
import {useMemo} from 'react'


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

export const useAppDispatch = () => useDispatch<TAppDispatch>()

export type TRootReducer = typeof rootReducer
export type TAppState = ReturnType<TRootReducer>
export type TAppDispatch = typeof store.dispatch

// useActions hook to use actions without dispatch
export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
    const dispatch = useDispatch()

    const boundActions = useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])

    return boundActions
}

