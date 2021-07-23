import React, {useCallback, useEffect} from 'react'
import {AddItemForm, EditableSpan} from '../../../components'
import {Button, IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import {Task, tasksActions, todoListsActions} from '../index'
import {TFilterValues, TTodoListDomain} from '../todolists_reducer'
import {TaskStatuses} from '../../../api/tasks_api'
import {TTaskDomain} from './tasks_reducer'
import {useActions} from '../../../app/store'

//* Types declaration ================================================================================================>>
export type TodolistPropsType = {
    demo?: boolean
    todoList: TTodoListDomain
    tasks: Array<TTaskDomain>
}

export const TodoList = React.memo(({demo = false, ...props}: TodolistPropsType) => {
    console.log('TL R')

    const {fetchTasks, addTask} = useActions(tasksActions)
    const {removeTodoList, _changeTodoListFilter, changeTodoListTitle} = useActions(todoListsActions)

    useEffect(() => {
        if(demo) return
        fetchTasks({todoListId: props.todoList.id})
    }, [])

    //* Callbacks for EditableSpan, AddItemForm and Buttons callbacks  ===============================================>>

    const addNewTask = useCallback((newTaskTitle: string) =>
        addTask({todoListId: props.todoList.id, title: newTaskTitle}), [props.todoList.id])
    const removeTodolist = useCallback(() =>
        removeTodoList({todoListId: props.todoList.id}), [props.todoList.id])
    const changeTodolistTitle = useCallback((newTodolistTitle: string) =>
        changeTodoListTitle({title: newTodolistTitle, todoListId: props.todoList.id}), [props.todoList.id])
    const setFilter = useCallback((filter: TFilterValues) =>
        _changeTodoListFilter({todoListId: props.todoList.id, filter}), [props.todoList.id])

    const renderTodoListButton = useCallback((filter: TFilterValues, text: string) => {
        return <Button variant={props.todoList.filter === filter ? 'contained' : 'outlined'}
                       color={props.todoList.filter === filter ? 'primary' : 'default'}
                       style={{marginRight: '2px'}}
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
        <div>
            <h3><EditableSpan title={props.todoList.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist} disabled={props.todoList.todoListStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm label={'Add task'} addNewItem={addNewTask} disabled = {props.todoList.todoListStatus === 'loading'}/>
            <div>
                {tasksElements}
            </div>
            <div>
                {renderTodoListButton('all', 'All')}
                {renderTodoListButton('active', 'Active')}
                {renderTodoListButton('completed', 'Completed')}
            </div>
        </div>
    )
})

