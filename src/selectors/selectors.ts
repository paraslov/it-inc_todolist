import {AppRootType} from '../state/store';


export const SelectTasks = (state: AppRootType) => state.tasks
export const SelectTodoLists = (state: AppRootType) => state.todoLists