import {
    _addTodoList,
    _changeTodoListFilter,
    _changeTodoListTitle,
    _removeTodoList, _setTodoListStatus,
    TFilterValues,
    TTodoListDomain,
    todoListsReducer
} from './todolists_reducer';
import {v1} from 'uuid';
import {TResponseStatus} from '../../app/app_reducer';

const todolistId1 = v1()
const todolistId2 = v1()
let startState: Array<TTodoListDomain>

beforeEach(() => {
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, todoListStatus: 'idle'},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, todoListStatus: 'idle'}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, _removeTodoList({todoListId: todolistId1}))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let newTodolistTitle = 'New Todolist';
    const endState = todoListsReducer(startState, _addTodoList({
        todoList:
            {id: v1(), title: newTodolistTitle, addedDate: '', order: 0}
    }))

    expect(endState.length).toBe(3);
    expect(startState[0].title).toBe('What to learn')
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist';
    const action = _changeTodoListTitle({todoListId: todolistId2, title: newTodolistTitle});

    const endState = todoListsReducer(startState, action);

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: TFilterValues = 'completed';
    const action = _changeTodoListFilter({todoListId: todolistId2, filter: newFilter});
    const endState = todoListsReducer(startState, action);

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});

test('correct status of todolist should be settled', () => {
    let newStatus: TResponseStatus = 'loading';
    const action = _setTodoListStatus({todoListId: todolistId2, todoListStatus: newStatus});
    const endState = todoListsReducer(startState, action);

    expect(endState[0].todoListStatus).toBe('idle');
    expect(startState[1].todoListStatus).toBe('idle');
    expect(endState[1].todoListStatus).toBe(newStatus);
});



