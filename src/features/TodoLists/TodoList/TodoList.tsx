import React, {useCallback, useEffect} from 'react'
import {AddItemForm} from '../../../components'
import {EditableSpan} from '../../../components'
import {Button, IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import {Task} from '../index'
import {TFilterValues, TTodoListDomain} from '../todolists_reducer'
import {TaskStatuses, TTask} from '../../../api/tasks_api'
import {TTaskDomain} from './tasks_reducer'
import {useActions} from '../../../app/store'
import {tasksActions, todoListsActions} from '../index'

//* Types declaration ================================================================================================>>
export type TodolistPropsType = {
    demo?: boolean
    todoList: TTodoListDomain
    tasks: Array<TTaskDomain>
}

export const TodoList = React.memo(({demo = false, ...props}: TodolistPropsType) => {
    console.log('TL R')

    const {fetchTasks, addTask, removeTask, updateTask} = useActions(tasksActions)
    const {removeTodoList, _changeTodoListFilter, changeTodoListTitle} = useActions(todoListsActions)

    useEffect(() => {
        if(demo) return
        fetchTasks({todoListId: props.todoList.id})
    }, [])

    //* Callbacks for EditableSpan, AddItemForm and Buttons callbacks  ===============================================>>

    const changeTaskIsDone = useCallback((todoListId: string, task: TTask, status: TaskStatuses) => {
        updateTask({todoListId, task, model: {status}})
    }, [])
    const changeTaskTitle = useCallback((todoListId: string, task: TTask, newTaskTitle: string) => {
        updateTask({todoListId, task, model: {title: newTaskTitle}})
    }, [])

    const addNewTask = useCallback((newTaskTitle: string) =>
        addTask({todoListId: props.todoList.id, title: newTaskTitle}), [props.todoList.id])
    const removeTodolist = useCallback(() =>
        removeTodoList({todoListId: props.todoList.id}), [props.todoList.id])
    const setFilterAll = useCallback(() =>
        _changeTodoListFilter({todoListId: props.todoList.id, filter: 'all'}), [props.todoList.id])
    const setFilterCompleted = useCallback(() =>
        _changeTodoListFilter({todoListId: props.todoList.id, filter: 'completed'}), [props.todoList.id])
    const setFilterActive = useCallback(() =>
        _changeTodoListFilter({todoListId: props.todoList.id, filter: 'active'}), [props.todoList.id])
    const setFilterVariant = useCallback((filter: TFilterValues) =>
        props.todoList.filter === filter ? 'contained' : 'outlined', [props.todoList.filter])
    const setFilterColor = useCallback((filter: TFilterValues) =>
        props.todoList.filter === filter ? 'primary' : 'default', [props.todoList.filter])
    const changeTodolistTitle = useCallback((newTodolistTitle: string) =>
        changeTodoListTitle({title: newTodolistTitle, todoListId: props.todoList.id}), [props.todoList.id])

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
        .map(task => <Task key={task.id}
                           task={task}
                           disabled={task.taskStatus === 'loading'}
                           changeTaskIsDone={changeTaskIsDone}
                           changeTaskTitle={changeTaskTitle}
                           removeTask={removeTask}
        />)

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
                <Button variant={setFilterVariant('all')}
                        color={setFilterColor('all')}
                        style={{marginRight: '2px'}}
                        onClick={setFilterAll}>All
                </Button>
                <Button variant={setFilterVariant('active')}
                        color={setFilterColor('active')}
                        style={{marginRight: '2px'}}
                        onClick={setFilterActive}>Active
                </Button>
                <Button variant={setFilterVariant('completed')}
                        color={setFilterColor('completed')}
                        onClick={setFilterCompleted}>Completed
                </Button>
            </div>
        </div>
    )
})

