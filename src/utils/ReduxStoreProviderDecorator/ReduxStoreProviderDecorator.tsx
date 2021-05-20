import React from 'react'
import {Provider} from 'react-redux'
import {AppRootType} from '../../state/store'
import {StoryFnReactReturnType} from '@storybook/react/dist/ts3.9/client/preview/types'
import {combineReducers, createStore} from 'redux'
import {tasksReducer} from '../../state/tasks_reducer'
import {todolistsReducer} from '../../state/todolists_reducer'
import {v1} from 'uuid'


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer
})

//* initial state for storybook tests only ============================================================================>>
const initialGlobalState = {
    todoLists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'Angular', isDone: false},
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true},
            {id: v1(), title: 'Angular Book', isDone: false},
        ]
    }
};

//* Store for storybook tests only ====================================================================================>>
const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootType)

//* Provider decoration for storybook tests ===========================================================================>>
export const ReduxStoreProviderDecorator = (storyFn: () => StoryFnReactReturnType) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}