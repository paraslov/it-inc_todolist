import {TOperationResult, instance} from './api';

export type TTodoList = {
    id: string
    addedDate: string
    order: number
    title: string
}

export const todoListsAPI = {
    fetchTodoLists() {
        return instance.get<TTodoList[]>('todo-lists').then(res => res.data)
    },
    addTodoList(title: string) {
        return instance.post<TOperationResult<{ item: TTodoList }>>('todo-lists', {title: title}).then(res => res.data)
    },
    removeTodoList(id: string) {
        return instance.delete<TOperationResult>(`todo-lists/${id}`).then(res => res.data)
    },
    updateTodoList(id: string, title: string) {
        return instance.put<TOperationResult>(`todo-lists/${id}`, {title: title}).then(res => res.data)
    }
}