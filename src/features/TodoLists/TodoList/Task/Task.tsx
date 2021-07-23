import React, {useCallback} from 'react'
import {Checkbox, IconButton} from '@material-ui/core'
import {EditableSpan} from '../../../../components'
import {Delete} from '@material-ui/icons'
import {TaskStatuses} from '../../../../api/tasks_api'
import {TTaskDomain} from '../tasks_reducer'
import {useActions} from '../../../../app/store'
import {tasksActions} from '../../index'

//* Types declaration ================================================================================================>>
export type TaskPropsType = {
    task: TTaskDomain
    disabled?: boolean
}

export const Task = React.memo((props: TaskPropsType) => {

    const {removeTask, updateTask} = useActions(tasksActions)

    //* Callbacks  ===================================================================================================>>
    const removeTaskCallback = useCallback(() => removeTask({todoListId: props.task.todoListId, taskId: props.task.id}), [])
    const changeTaskIsDone = useCallback(() =>
        updateTask({
            todoListId: props.task.todoListId,
            task: props.task,
            model: {status: props.task.status === TaskStatuses.New ? TaskStatuses.Completed : TaskStatuses.New}
        }), [props.task.todoListId, props.task, props.task.status])
    const changeTaskTitle = useCallback((newTaskTitle: string) => {
        updateTask({todoListId: props.task.todoListId, task: props.task, model: {title: newTaskTitle}})
    }, [props.task.todoListId, props.task])

    return (
        <div style={{opacity: props.task.status === TaskStatuses.Completed ? 0.5 : 1}} key={props.task.id}>
            <Checkbox onChange={changeTaskIsDone}
                      disabled={props.disabled}
                      color={'primary'}
                      checked={props.task.status === TaskStatuses.Completed}/>
            <EditableSpan title={props.task.title} onChange={changeTaskTitle} disabled={props.disabled}/>
            <IconButton onClick={removeTaskCallback} disabled={props.disabled}>
                <Delete/>
            </IconButton>
        </div>
    )
})