import {combineReducers} from 'redux'
import {tasksReducer, todoListsReducer} from '../features/TodoLists'
import {appReducer} from '../features/App'
import {authReducer} from '../features/Login'

export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
    auth: authReducer,
})