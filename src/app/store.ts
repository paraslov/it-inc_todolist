import {Action, combineReducers} from 'redux'
import {tasksReducer, TTasksActions} from '../features/TodoLists/TodoList/tasks_reducer'
import {todoListsReducer, TTodoListActions} from '../features/TodoLists/todolists_reducer'
import thunkMW, {ThunkAction} from 'redux-thunk'
import {appReducer} from './app_reducer'
import {authReducer} from '../features/Login/auth_reducer'
import {configureStore} from '@reduxjs/toolkit'


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

export type TAppState = ReturnType<typeof rootReducer>
export type TAppActions = TTasksActions | TTodoListActions
//* Common thunk types ===============================================================================================>>
export type TBaseThunk<A extends Action = TAppActions, R = void> = ThunkAction<R, TAppState, unknown, A>

// export const store = createStore(rootReducer, applyMiddleware(thunkMW))