import {todoListsAPI, TodoListType} from '../../api/todoLists_api';
import {BaseThunkType} from '../../app/store';
import {ResponseStatusType, setError, setStatus} from '../../app/app_reducer';

//* ====== Reducer ===================================================================================================>>
const initState: Array<TodoListDomainType> = []

export const todoListsReducer =
    (state: Array<TodoListDomainType> = initState, action: TodoListActionsType): Array<TodoListDomainType> => {
        switch (action.type) {
            case 'para-slov/todoListReducer/REMOVE-TODOLIST':
                return state.filter(tl => tl.id !== action.id)
            case 'para-slov/todoListReducer/ADD-TODOLIST':
                return [{...action.todoList, filter: 'all', todoListStatus: 'idle'}, ...state]
            case 'para-slov/todoListReducer/CHANGE-TODOLIST-TITLE':
                return state.map(tl => tl.id === action.id ? ({...tl, title: action.title}) : tl)
            case 'para-slov/todoListReducer/CHANGE-TODOLIST-FILTER':
                return state.map(tl => tl.id === action.id ? ({...tl, filter: action.filter}) : tl)
            case 'para-slov/todoListReducer/SET-TODOLISTS':
                return action.todolists.map(tl => ({...tl, filter: 'all', todoListStatus: 'idle'}))
            case 'para-slov/todoListReducer/SET-TODOLISTS-STATUS':
                return state.map(tl => tl.id === action.todoListId ? ({...tl, todoListStatus: action.todoListStatus}) : tl)
            default:
                return state
        }
    }

//* ====== Action Creators ===========================================================================================>>
export const _removeTodoList = (todoListId: string) =>
    ({type: 'para-slov/todoListReducer/REMOVE-TODOLIST', id: todoListId} as const)
export const _addTodoList = (todoList: TodoListType) =>
    ({type: 'para-slov/todoListReducer/ADD-TODOLIST', todoList} as const)
export const _changeTodoListTitle = (todoListId: string, title: string) =>
    ({type: 'para-slov/todoListReducer/CHANGE-TODOLIST-TITLE', id: todoListId, title: title} as const)
export const _changeTodoListFilter = (todoListId: string, filter: FilterValuesType) =>
    ({type: 'para-slov/todoListReducer/CHANGE-TODOLIST-FILTER', id: todoListId, filter} as const)
export const _fetchTodoLists = (todoLists: TodoListType[]) =>
    ({type: 'para-slov/todoListReducer/SET-TODOLISTS', todolists: todoLists} as const)
export const _setTodoListStatus = (todoListId: string, todoListStatus: ResponseStatusType) =>
    ({type: 'para-slov/todoListReducer/SET-TODOLISTS-STATUS', todoListId, todoListStatus} as const)

//* ====== Thunk Creators ============================================================================================>>
export const fetchTodoListsTC = (): ThunkType => dispatch => {
    dispatch(setStatus('loading'))
    todoListsAPI.fetchTodoLists()
        .then(data => {
            dispatch(_fetchTodoLists(data))
            dispatch(setStatus('succeeded'))
        })
}
export const addTodoList = (title: string): ThunkType => dispatch => {
    dispatch(setStatus('loading'))
    todoListsAPI.addTodoList(title)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(_addTodoList(data.data.item))
                dispatch(setStatus('succeeded'))
            } else {
                if (data.resultCode === 1) {
                    data.messages.length && dispatch(setError(data.messages[0]))
                } else {
                    dispatch(setError('some error occurred'))
                }
                dispatch(setStatus('failed'))
            }

        })
}
export const removeTodoList = (todoListId: string): ThunkType => dispatch => {
    dispatch(setStatus('loading'))
    dispatch(_setTodoListStatus(todoListId, 'loading'))
    todoListsAPI.removeTodoList(todoListId)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(_removeTodoList(todoListId))
            }
            dispatch(setStatus('succeeded'))
        })
}
export const changeTodoListTitle = (todoListId: string, title: string): ThunkType => dispatch => {
    dispatch(setStatus('loading'))
    todoListsAPI.updateTodoList(todoListId, title)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(_changeTodoListTitle(todoListId, title))
            }
            dispatch(setStatus('succeeded'))
        })
}

//* ====== Types =====================================================================================================>>
export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
    todoListStatus: ResponseStatusType
}

export type TodoListActionsType = ReturnType<typeof _removeTodoList>
    | ReturnType<typeof _addTodoList>
    | ReturnType<typeof _changeTodoListTitle>
    | ReturnType<typeof _changeTodoListFilter>
    | ReturnType<typeof _fetchTodoLists>
    | ReturnType<typeof _setTodoListStatus>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof setError>

type ThunkType = BaseThunkType<TodoListActionsType>

