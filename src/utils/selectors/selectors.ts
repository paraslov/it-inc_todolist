import {AppStateType} from '../../app/store';


export const selectTasks = (state: AppStateType) => state.tasks
export const selectTodoLists = (state: AppStateType) => state.todoLists
export const selectAppStatus = (state: AppStateType) => state.app.status
export const selectAppError = (state: AppStateType) => state.app.error