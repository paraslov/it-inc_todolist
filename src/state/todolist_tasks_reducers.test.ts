import {addTodoListAC, TodoListDomainType, todoListsReducer} from './todolists_reducer';
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
