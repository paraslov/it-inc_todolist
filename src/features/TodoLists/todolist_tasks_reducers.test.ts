import { TTodoListDomain} from './todolists_reducer'
import {TTasks} from './TodoList/tasks_reducer'
import {v1} from 'uuid'
import {tasksReducer, todoListsActions, todoListsReducer} from './index'

const {fetchTodoLists, addTodoList} = todoListsActions

test('ids should be equals', () => {
    const startTasksState: TTasks = {}
    const startTodoListsState: Array<TTodoListDomain> = []

    const action = addTodoList.fulfilled({todoList: {id: v1(), title: 'new todolist', addedDate: '', order: 0}},
        'requestId', {title: 'new todolist'})

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.payload.todoList.id)
    expect(idFromTodoLists).toBe(action.payload.todoList.id)
})

test('todo lists should be settled to the state and an empty array should be created for tasks', () => {
    const startState = [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ]

    const action = fetchTodoLists.fulfilled( {todoLists: startState}, 'requestId0', undefined)

    const endTasksState = tasksReducer({}, action)
    const endTodoListsState = todoListsReducer([], action)

    expect(endTasksState['todolistId1']).toStrictEqual([])
    expect(endTasksState['todolistId2']).toStrictEqual([])
    expect(endTodoListsState.length).toBe(2)
    expect(endTodoListsState[0].title).toBe('What to learn')
})
