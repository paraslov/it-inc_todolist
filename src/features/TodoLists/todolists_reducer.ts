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
                return [{...action.todoList, filter: 'all', entityStatus: 'idle'}, ...state]
            case 'para-slov/todoListReducer/CHANGE-TODOLIST-TITLE':
                return state.map(tl => tl.id === action.id ? ({...tl, title: action.title}) : tl)
            case 'para-slov/todoListReducer/CHANGE-TODOLIST-FILTER':
                return state.map(tl => tl.id === action.id ? ({...tl, filter: action.filter}) : tl)
            case 'para-slov/todoListReducer/SET-TODOLISTS':
                return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
            default:
                return state
        }
    }

//* ====== Action Creators ===========================================================================================>>
export const _removeTodoList = (todolistId: string) =>
    ({type: 'para-slov/todoListReducer/REMOVE-TODOLIST', id: todolistId} as const)
export const _addTodoList = (todoList: TodoListType) =>
    ({type: 'para-slov/todoListReducer/ADD-TODOLIST', todoList} as const)
export const _changeTodoListTitle = (todolistId: string, title: string) =>
    ({type: 'para-slov/todoListReducer/CHANGE-TODOLIST-TITLE', id: todolistId, title: title} as const)
export const _changeTodoListFilter = (todolistId: string, filter: FilterValuesType) =>
    ({type: 'para-slov/todoListReducer/CHANGE-TODOLIST-FILTER', id: todolistId, filter} as const)
export const _fetchTodoLists = (todolists: TodoListType[]) =>
    ({type: 'para-slov/todoListReducer/SET-TODOLISTS', todolists} as const)

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
    setStatus('loading')
    todoListsAPI.removeTodoList(todoListId)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(_removeTodoList(todoListId))
            }
            setStatus('succeeded')
        })
}
export const changeTodoListTitle = (todoListId: string, title: string): ThunkType => dispatch => {
    setStatus('loading')
    todoListsAPI.updateTodoList(todoListId, title)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(_changeTodoListTitle(todoListId, title))
            }
            setStatus('succeeded')
        })
}

//* ====== Types =====================================================================================================>>
export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: ResponseStatusType
}

export type TodoListActionsType = ReturnType<typeof _removeTodoList>
    | ReturnType<typeof _addTodoList>
    | ReturnType<typeof _changeTodoListTitle>
    | ReturnType<typeof _changeTodoListFilter>
    | ReturnType<typeof _fetchTodoLists>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof setError>

type ThunkType = BaseThunkType<TodoListActionsType>

