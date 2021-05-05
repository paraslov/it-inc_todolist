import {combineReducers, createStore} from 'redux';
import {tasksReducer} from './tasks_reducer';
import {todolistsReducer} from './todolists_reducer';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer
})

export type AppRootType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)