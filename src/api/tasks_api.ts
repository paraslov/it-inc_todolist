import {CommonResponseType, instance} from './api';


export type TaskType = {
    description: string
    title: string
    status: number
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

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskUpdateModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export const tasksAPI = {
    fetchTasks(todoListId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todoListId}/tasks`).then(res => res.data)
    },
    addTask(todoListId: string, title: string) {
        return instance.post<CommonResponseType<{ item: TaskType }>>(`todo-lists/${todoListId}/tasks`, {title: title})
            .then(res => res.data)
    },
    removeTask(todoListId: string, taskId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`).then(res => res.data)
    },
    updateTask(todoListId: string, taskId: string, model: TaskUpdateModelType) {
        return instance.put<CommonResponseType<{ item: TaskType }>>
        (`todo-lists/${todoListId}/tasks/${taskId}`, model).then(res => res.data)
    }
}