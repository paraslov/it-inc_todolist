import React from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskStatuses, TaskType} from '../../../../api/tasks_api';

//* Types declaration ================================================================================================>>
export type TaskPropsType = {
    task: TaskType
    changeTaskIsDone: (todolistId: string, task: TaskType, status: TaskStatuses) => void
    changeTaskTitle: (todolistId: string, task: TaskType, newTaskTitle: string) => void
    removeTask: (todolistId: string, taskId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    //* Callbacks  ===================================================================================================>>
    const removeTask = () => props.removeTask(props.task.todoListId, props.task.id)
    const changeTaskIsDone = () =>
        props.changeTaskIsDone(props.task.todoListId, props.task,
            props.task.status === TaskStatuses.New ? TaskStatuses.Completed : TaskStatuses.New)
    const changeTaskTitle = (newTaskTitle: string) => {
        props.changeTaskTitle(props.task.todoListId, props.task, newTaskTitle)
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