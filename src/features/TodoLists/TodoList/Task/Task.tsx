import React from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from '../../../../components';
import {Delete} from '@material-ui/icons';
import {TaskStatuses, TTask} from '../../../../api/tasks_api';
import {TTaskDomain} from '../tasks_reducer';

//* Types declaration ================================================================================================>>
export type TaskPropsType = {
    task: TTaskDomain
    disabled?: boolean
    changeTaskIsDone: (todolistId: string, task: TTask, status: TaskStatuses) => void
    changeTaskTitle: (todolistId: string, task: TTask, newTaskTitle: string) => void
    removeTask: (params: {todoListId: string, taskId: string}) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    //* Callbacks  ===================================================================================================>>
    const removeTask = () => props.removeTask({todoListId: props.task.todoListId, taskId: props.task.id})
    const changeTaskIsDone = () =>
        props.changeTaskIsDone(props.task.todoListId, props.task,
            props.task.status === TaskStatuses.New ? TaskStatuses.Completed : TaskStatuses.New)
    const changeTaskTitle = (newTaskTitle: string) => {
        props.changeTaskTitle(props.task.todoListId, props.task, newTaskTitle)
    }

    return (
        <div style={{opacity: props.task.status === TaskStatuses.Completed ? 0.5 : 1}} key={props.task.id}>
            <Checkbox onChange={changeTaskIsDone}
                      disabled={props.disabled}
                      color={'primary'}
                      checked={props.task.status === TaskStatuses.Completed}/>
            <EditableSpan title={props.task.title} onChange={changeTaskTitle} disabled={props.disabled}/>
            <IconButton onClick={removeTask} disabled={props.disabled}>
                <Delete/>
            </IconButton>
        </div>
    )
})