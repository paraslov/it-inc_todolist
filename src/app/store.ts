import {Action, applyMiddleware, combineReducers, createStore} from 'redux';
import {TTasksActions, tasksReducer} from '../features/TodoLists/TodoList/tasks_reducer';
import {TTodoListActions, todoListsReducer} from '../features/TodoLists/todolists_reducer';
import thunkMW, {ThunkAction} from 'redux-thunk'
import {appReducer} from './app_reducer';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer
})

export type TAppState = ReturnType<typeof rootReducer>

export type TAppActions = TTasksActions | TTodoListActions

//* Common thunk types ===============================================================================================>>
export type TBaseThunk<A extends Action = TAppActions, R = void> = ThunkAction<R, TAppState, unknown, A>

export const store = createStore(rootReducer, applyMiddleware(thunkMW))