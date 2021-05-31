import React from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from '../common/EditableSpan/EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskStatuses, TaskType} from '../../api/tasks_api';

export type TaskPropsType = {
    task: TaskType
    todolistId: string
    changeTaskIsDone: (taskId: string, todolistId: string, status: TaskStatuses) => void
    changeTaskTitle: (newTaskTitle: string, taskId: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    const removeTask = () => props.removeTask(props.task.id, props.todolistId)
    const changeTaskIsDone = () =>
        props.changeTaskIsDone(props.task.id, props.todolistId,
            props.task.status === TaskStatuses.New ? TaskStatuses.Completed : TaskStatuses.New)
    const changeTaskTitle = (newTaskTitle: string) => {
        props.changeTaskTitle(newTaskTitle, props.task.id, props.todolistId)
    }

    return (
        <div style={{opacity: props.task.status === TaskStatuses.Completed ? 0.5 : 1}} key={props.task.id}>
            <Checkbox onChange={changeTaskIsDone}
                      color={'primary'}
                      checked={props.task.status === TaskStatuses.Completed}/>
            <EditableSpan title={props.task.title} onChange={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>
    )
})