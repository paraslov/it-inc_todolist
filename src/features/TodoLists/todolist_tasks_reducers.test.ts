import {_addTodoList, _fetchTodoLists, TTodoListDomain, todoListsReducer} from './todolists_reducer';
import {tasksReducer, TTasks} from './TodoList/tasks_reducer';
import {v1} from 'uuid';


test('ids should be equals', () => {
    const startTasksState: TTasks = {};
    const startTodoListsState: Array<TTodoListDomain> = [];

    const action = _addTodoList({id: v1(), title: 'new todolist', addedDate: '', order: 0});

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.todoList.id);
    expect(idFromTodoLists).toBe(action.todoList.id);
});

test('todo lists should be settled to the state and an empty array should be created for tasks', () => {
    const startState = [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ]

    const action = _fetchTodoLists(startState);

    const endTasksState = tasksReducer({}, action)
    const endTodoListsState = todoListsReducer([], action)

    expect(endTasksState['todolistId1']).toStrictEqual([])
    expect(endTasksState['todolistId2']).toStrictEqual([])
    expect(endTodoListsState.length).toBe(2)
    expect(endTodoListsState[0].title).toBe('What to learn')
})
