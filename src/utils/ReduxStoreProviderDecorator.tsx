import React from 'react'
import {Provider} from 'react-redux'
import {TAppState, TRootReducer} from '../app/store'
import {StoryFnReactReturnType} from '@storybook/react/dist/ts3.9/client/preview/types'
import {combineReducers} from 'redux'
import {tasksReducer} from '../features/TodoLists'
import {todoListsReducer} from '../features/TodoLists'
import {v1} from 'uuid'
import {TaskPriorities, TaskStatuses} from '../api/tasks_api'
import {appReducer} from '../app'
import thunkMW from 'redux-thunk'
import {HashRouter} from 'react-router-dom'
import {authReducer} from '../features/Login'
import {configureStore} from '@reduxjs/toolkit'


const rootReducer: TRootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
    auth: authReducer
})

//* initial state for storybook tests only ============================================================================>>
const initialGlobalState: TAppState = {
    todoLists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, todoListStatus: 'idle'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, todoListStatus: 'loading'}
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                description: 'desc',
                taskStatus: 'idle'
            },
            {
                id: v1(),
                title: 'JS',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                description: 'desc',
                taskStatus: 'idle'
            },
            {
                id: v1(),
                title: 'Angular',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                description: 'desc',
                taskStatus: 'idle'
            },
        ],
        ['todolistId2']: [
            {
                id: v1(),
                title: 'Milk',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                description: 'desc',
                taskStatus: 'idle'
            },
            {
                id: v1(),
                title: 'React Book',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                description: 'desc',
                taskStatus: 'idle'
            },
            {
                id: v1(),
                title: 'Angular Book',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                description: 'desc',
                taskStatus: 'idle'
            },
        ]
    },
    app: {
        status: 'succeeded',
        error: null,
        isAppInitialized: true
    },
    auth: {
        isAuth: true
    }
}

//* Store for storybook tests only ===================================================================================>>
const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMW)
})

//* Provider decoration for storybook tests ==========================================================================>>
export const ReduxStoreProviderDecorator = (storyFn: () => StoryFnReactReturnType) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}

//* HashRouter decoration for storybook tests ========================================================================>>
export const HashRouterDecorator = (storyFn: () => StoryFnReactReturnType) => {
    return <HashRouter>{storyFn()}</HashRouter>
}