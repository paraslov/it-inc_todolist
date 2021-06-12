import {
    _addTodoList,
    _changeTodoListFilter,
    _changeTodoListTitle,
    _removeTodoList, _setTodoListStatus,
    FilterValuesType,
    TodoListDomainType,
    todoListsReducer
} from './todolists_reducer';
import {v1} from 'uuid';
import {ResponseStatusType} from '../../app/app_reducer';

const todolistId1 = v1()
const todolistId2 = v1()
let startState: Array<TodoListDomainType>

beforeEach(() => {
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, todoListStatus: 'idle'},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, todoListStatus: 'idle'}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, _removeTodoList(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let newTodolistTitle = 'New Todolist';
    const endState = todoListsReducer(startState, _addTodoList({
        id: v1(),
        title: newTodolistTitle,
        addedDate: '',
        order: 0
    }))

    expect(endState.length).toBe(3);
    expect(startState[0].title).toBe('What to learn')
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist';
    const action = _changeTodoListTitle(todolistId2, newTodolistTitle);

    const endState = todoListsReducer(startState, action);

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed';
    const action = _changeTodoListFilter(todolistId2, newFilter);
    const endState = todoListsReducer(startState, action);

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});

test('correct status of todolist should be settled', () => {
    let newStatus: ResponseStatusType = 'loading';
    const action = _setTodoListStatus(todolistId2, newStatus);
    const endState = todoListsReducer(startState, action);

    expect(endState[0].todoListStatus).toBe('idle');
    expect(startState[1].todoListStatus).toBe('idle');
    expect(endState[1].todoListStatus).toBe(newStatus);
});



