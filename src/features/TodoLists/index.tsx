import {todoListsAsyncActions, slice as todoListsSlice} from './todolists_reducer'
import {tasksAsyncActions, slice as tasksSlice} from './TodoList/tasks_reducer'
import {TodoLists} from './TodoLists'

const todoListsActions = {
    ...todoListsAsyncActions,
    ...todoListsSlice.actions
}

const tasksActions = {
    ...tasksAsyncActions,
    ...tasksSlice.actions
}

export {
    todoListsActions,
    tasksActions,
    TodoLists
}