import React, {useState} from 'react'
import {Meta} from '@storybook/react';
import {TaskPriorities, tasksAPI, TaskStatuses, TTask, TTaskUpdateModel} from '../../api/tasks_api';

export default {
    title: 'API/tasks'
} as Meta

const initTodoListId = '2dd62990-2cc7-4885-b989-08753003b617'

export const GetTasks = () => {
    const [state, setState] = useState<TTask[] | null>(null)
    const [todoListId, setTodoListId] = useState(initTodoListId)

    const getTasks = (todoListId: string) => {
        tasksAPI.fetchTasks(todoListId)
            .then(data => {
                setState(data.items)
            })
    }

    return (
        <div>
            <div>::====================================::</div>
            <div>
                {state ? state.map(task => {
                    return <div>
                        <div>title: {task.title}</div>
                        <div>task id: {task.id}</div>
                        <div>description: {task.description ? task.description : 'none'}</div>
                        <div>todo list id: {task.todoListId}</div>
                        <div>added date: {task.addedDate}</div>
                        <div>order: {task.order}</div>
                        <div>::====================================::</div>
                    </div>
                }) : <div>loading...</div>}
            </div>
            <div>
                <input type="text"
                       placeholder={'id of todo list'}
                       value={todoListId}
                       onChange={(e) => setTodoListId(e.currentTarget.value)}/>
            </div>
            <div>
                <button onClick={() => getTasks(todoListId)}>Get tasks</button>
            </div>
        </div>
    )
}

export const PostTask = () => {
    const [state, setState] = useState<any>(null)
    const [newTitle, setNewTitle] = useState('')
    const [todoListId, setTodoListId] = useState(initTodoListId)

    const postTask = (todoListId: string, title: string) => {
        tasksAPI.addTask(todoListId, title)
            .then(data => {
                setState(data.data.item)
            })
    }

    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <input
                type="text"
                placeholder={'enter new task title'}
                value={newTitle}
                onChange={(e) => setNewTitle(e.currentTarget.value)}/>
            <input type="text"
                   placeholder={'id of todo list'}
                   value={todoListId}
                   onChange={(e) => setTodoListId(e.currentTarget.value)}/>
            <div>
                <button onClick={() => postTask(todoListId, newTitle)}>Post task</button>
            </div>
        </div>

    )
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState(initTodoListId)
    const [taskId, setTaskId] = useState('')

    const deleteTask = (todoListId: string, taskId: string) => {
        tasksAPI.removeTask(todoListId, taskId)
            .then(data => {
                setState(data)
            })
    }

    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <div>
                <input
                    type="text"
                    placeholder={'id of todo list'}
                    value={todoListId}
                    onChange={(e) => setTodoListId(e.currentTarget.value)}/>
                <input
                    type="text"
                    placeholder={'id of task u want to delete'}
                    value={taskId}
                    onChange={(e) => setTaskId(e.currentTarget.value)}/>
            </div>
            <div>
                <button onClick={() => deleteTask(todoListId, taskId)}>Delete task</button>
            </div>
        </div>
    )
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState(initTodoListId)
    const [taskId, setTaskId] = useState('')
    const [updatedTitle, setUpdatedTitle] = useState('')

    const updateTaskModel: TTaskUpdateModel = {
        title: updatedTitle,
        description: 'task, that I update in UpdateTask story',
        deadline: '',
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Middle,
        startDate: '',
    }

    const updateTask = (todoListId: string, taskId: string, model: TTaskUpdateModel) => {
        tasksAPI.updateTask(todoListId, taskId, model)
            .then(data => {
                console.log(data)
                setState(data)
            })
    }

    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <div>
                <input
                    type="text"
                    placeholder={'id of todo list'}
                    value={todoListId}
                    onChange={(e) => setTodoListId(e.currentTarget.value)}/>
                <input
                    type="text"
                    placeholder={'id of task u want to update'}
                    value={taskId}
                    onChange={(e) => setTaskId(e.currentTarget.value)}/>
                <input
                    type="text"
                    placeholder={'new title to update'}
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.currentTarget.value)}/>
            </div>
            <div>
                <button onClick={() => updateTask(todoListId, taskId, updateTaskModel)}>Update task</button>
            </div>
        </div>
    )
}