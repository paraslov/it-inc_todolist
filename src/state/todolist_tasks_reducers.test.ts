import {addTodoListAC, setTodoListsAC, TodoListDomainType, todoListsReducer} from './todolists_reducer';
import {tasksReducer, TasksType} from './tasks_reducer';


test('ids should be equals', () => {
    const startTasksState: TasksType = {};
    const startTodoListsState: Array<TodoListDomainType> = [];

    const action = addTodoListAC('new todolist');

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodoLists).toBe(action.todolistId);
});

test('todo lists should be settled to the state and an empty array should be created for tasks', () => {
    const startState = [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ]

    const action = setTodoListsAC(startState);

    const endTasksState = tasksReducer({}, action)
    const endTodoListsState = todoListsReducer([], action)

    expect(endTasksState['todolistId1']).toStrictEqual([])
    expect(endTasksState['todolistId2']).toStrictEqual([])
    expect(endTodoListsState.length).toBe(2)
    expect(endTodoListsState[0].title).toBe('What to learn')
})
