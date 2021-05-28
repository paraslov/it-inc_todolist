import {CommonResponseType, instance} from './api';

export type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export const todoListsAPI = {
    getTodoLists() {
        return instance.get<TodoListType[]>('todo-lists').then(res => res.data)
    },
    postTodoList(title: string) {
        return instance.post<CommonResponseType<{ item: TodoListType }>>('todo-lists', {title: title}).then(res => res.data)
    },
    deleteTodoList(id: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${id}`).then(res => res.data)
    },
    updateTodoList(id: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${id}`, {title: title}).then(res => res.data)
    }
}