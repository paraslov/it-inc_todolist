import React, {useCallback, useEffect} from 'react'
import {AddItemForm, EditableSpan} from '../../../components'
import {Button, IconButton, Paper} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import {Task, tasksActions, todoListsActions} from '../index'
import {TFilterValues, TTodoListDomain} from '../todolists_reducer'
import {TaskStatuses} from '../../../api/tasks_api'
import {TTaskDomain} from './tasks_reducer'
import {TAddItemFormHelpers} from '../../../components/AddItemForm/AddItemForm'
import {useActions, useAppDispatch} from '../../../utils/redux-utils'

//* Types declaration ================================================================================================>>
export type TodolistPropsType = {
    demo?: boolean
    todoList: TTodoListDomain
    tasks: Array<TTaskDomain>
}

export const TodoList = React.memo(({demo = false, ...props}: TodolistPropsType) => {
    console.log('TL R')
    const {fetchTasks} = useActions(tasksActions)
    const {removeTodoList, _changeTodoListFilter, changeTodoListTitle} = useActions(todoListsActions)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if(demo) return
        !props.tasks.length && fetchTasks({todoListId: props.todoList.id})
    }, [])

    //* Callbacks for EditableSpan, AddItemForm and Buttons callbacks  ===============================================>>

    const addNewTask = useCallback(async (newTaskTitle: string, helpers: TAddItemFormHelpers) => {
        let res = await dispatch(tasksActions.addTask({todoListId: props.todoList.id, title: newTaskTitle}))

        if(tasksActions.addTask.rejected.match(res)) {
            if(res.payload?.errors?.length) {
                const error = res.payload.errors[0]
                helpers.setError(error)
            } else {
                helpers.setError('Some error occurred')
            }
        } else {
            helpers.setNewTaskTitle('')
        }

    }, [props.todoList.id])
    const removeTodolist = useCallback(() =>
        removeTodoList({todoListId: props.todoList.id}), [props.todoList.id])
    const changeTodolistTitle = useCallback((newTodolistTitle: string) =>
        changeTodoListTitle({title: newTodolistTitle, todoListId: props.todoList.id}), [props.todoList.id])
    const setFilter = useCallback((filter: TFilterValues) =>
        _changeTodoListFilter({todoListId: props.todoList.id, filter}), [props.todoList.id])

    const renderTodoListButton = useCallback((filter: TFilterValues, text: string) => {
        return <Button variant={props.todoList.filter === filter ? 'contained' : 'outlined'}
                       color={props.todoList.filter === filter ? 'primary' : 'default'}
                       style={{marginRight: '5px'}}
                       onClick={() => setFilter(filter)}>{text}
        </Button>
    }, [props.todoList.filter])

    //* TodoList filters logic ======================================================================================>
    let tasksForTodolist = props.tasks
    if (props.todoList.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    if (props.todoList.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }

    //* <li> elements mapping for tasks <ul> list ===================================================================>
    const tasksElements = tasksForTodolist
        .map(task => <Task key={task.id} task={task} disabled={task.taskStatus === 'loading'}/>)

    return (
        <Paper style={{padding: '10px', position: 'relative'}}>
            <IconButton onClick={removeTodolist}
                        style = {{position: 'absolute', top: '-5px', right: '-5px'}}
                        disabled={props.todoList.todoListStatus === 'loading'}>
                <Delete fontSize = {'small'}/>
            </IconButton>
            <h3 style={{width: '260px'}}>
                <EditableSpan title={props.todoList.title} onChange={changeTodolistTitle}/>
            </h3>
            <AddItemForm label={'Add task'} addNewItem={addNewTask} disabled = {props.todoList.todoListStatus === 'loading'}/>
            <div>
                {tasksElements.length ? tasksElements : <div style={{padding: '10px', opacity: '0.5'}}>No tasks</div>}
            </div>
            <div>
                {renderTodoListButton('all', 'All')}
                {renderTodoListButton('active', 'Active')}
                {renderTodoListButton('completed', 'Completed')}
            </div>
        </Paper>
    )
})

