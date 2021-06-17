import {TAppState} from '../../app/store';


export const selectTasks = (state: TAppState) => state.tasks
export const selectTodoLists = (state: TAppState) => state.todoLists
export const selectAppStatus = (state: TAppState) => state.app.status
export const selectAppError = (state: TAppState) => state.app.error