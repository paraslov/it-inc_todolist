import {CommonResponseType, instance} from './api';


export type TaskType = {
    description: string
    title: string
    status: number
    isDone: boolean
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTasksResponseType = {
    items: TaskType[]
    error: string
    totalCount: number
}
export type TaskUpdateModelType = {
    title: string
    description: string
    isDone: boolean
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
}

export const tasksAPI = {
    getTasks(todoListId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todoListId}/tasks`).then(res => res.data)
    },
    postTask(todoListId: string, title: string) {
        return instance.post<CommonResponseType<{ item: TaskType }>>(`todo-lists/${todoListId}/tasks`, {title: title})
            .then(res => res.data)
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`).then(res => res.data)
    },
    updateTask(todoListId: string, taskId: string, model: TaskUpdateModelType) {
        return instance.put<CommonResponseType<{ item: TaskType }>>
        (`todo-lists/${todoListId}/tasks/${taskId}`, model).then(res => res.data)
    }
}