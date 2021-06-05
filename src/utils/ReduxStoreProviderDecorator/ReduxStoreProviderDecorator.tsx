import React from 'react'
import {Provider} from 'react-redux'
import {AppStateType} from '../../app/store'
import {StoryFnReactReturnType} from '@storybook/react/dist/ts3.9/client/preview/types'
import {combineReducers, createStore} from 'redux'
import {tasksReducer} from '../../features/TodoLists/TodoList/tasks_reducer'
import {todoListsReducer} from '../../features/TodoLists/todolists_reducer'
import {v1} from 'uuid'
import {TaskPriorities, TaskStatuses} from '../../api/tasks_api';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

//* initial state for storybook tests only ============================================================================>>
const initialGlobalState: AppStateType = {
    todoLists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: 'todolistId1', description: 'desc'
            },
            {
                id: v1(), title: 'JS', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: 'todolistId1', description: 'desc'
            },
            {
                id: v1(), title: 'Angular', status: TaskStatuses.New, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: 'todolistId1', description: 'desc'
            },
        ],
        ['todolistId2']: [
            {
                id: v1(), title: 'Milk', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: 'todolistId2', description: 'desc'
            },
            {
                id: v1(), title: 'React Book', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: 'todolistId2', description: 'desc'
            },
            {
                id: v1(), title: 'Angular Book', status: TaskStatuses.New, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: 'todolistId2', description: 'desc'
            },
        ]
    }
};

//* Store for storybook tests only ====================================================================================>>
const storyBookStore = createStore(rootReducer, initialGlobalState)

//* Provider decoration for storybook tests ===========================================================================>>
export const ReduxStoreProviderDecorator = (storyFn: () => StoryFnReactReturnType) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}