import {TAppState} from '../../store/types'


export const selectTasks = (state: TAppState) => state.tasks
export const selectTodoLists = (state: TAppState) => state.todoLists