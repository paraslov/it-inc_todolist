import {Action, applyMiddleware, combineReducers, createStore} from 'redux';
import {TasksActionsType, tasksReducer} from '../features/TodoLists/TodoList/tasks_reducer';
import {TodoListActionsType, todoListsReducer} from '../features/TodoLists/todolists_reducer';
import thunkMW, {ThunkAction} from 'redux-thunk'


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

export type AppActionsType = TasksActionsType | TodoListActionsType

//* Common thunk typesation ==========================================================================================>>
export type BaseThunkType<A extends Action = AppActionsType, R = void> = ThunkAction<R, AppStateType, unknown, A>

export const store = createStore(rootReducer, applyMiddleware(thunkMW))