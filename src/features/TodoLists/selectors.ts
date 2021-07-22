import {TAppState} from '../../app/store'


export const selectTasks = (state: TAppState) => state.tasks
export const selectTodoLists = (state: TAppState) => state.todoLists