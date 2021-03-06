import {todoListsAsyncActions, slice as todoListsSlice} from './todolists_reducer'
import {tasksAsyncActions, slice as tasksSlice} from './TodoList/tasks_reducer'
import {TodoLists} from './TodoLists'
import {TodoList} from './TodoList/TodoList'
import {Task} from './TodoList/Task/Task'

const todoListsActions = {
    ...todoListsAsyncActions,
    ...todoListsSlice.actions
}

const tasksActions = {
    ...tasksAsyncActions,
    ...tasksSlice.actions
}

const tasksReducer = tasksSlice.reducer
const todoListsReducer = todoListsSlice.reducer

export {
    todoListsReducer,
    tasksReducer,
    todoListsActions,
    tasksActions,
    TodoLists,
    TodoList,
    Task
}