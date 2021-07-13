import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task/Task';
import {TFilterValues, TTodoListDomain} from '../todolists_reducer';
import {TaskStatuses, TTask} from '../../../api/tasks_api';
import {useDispatch} from 'react-redux';
import {fetchTasks, TTaskDomain} from './tasks_reducer';

//* Types declaration ================================================================================================>>
export type TodolistPropsType = {
    demo?: boolean
    todoList: TTodoListDomain
    tasks: Array<TTaskDomain>
    removeTask: (id: string, todolistId: string) => void
    filterTasks: (id: string, filterCondition: TFilterValues) => void
    addNewTask: (newTaskTitle: string, todolistId: string) => void
    changeTaskTitle: (todolistId: string, task: TTask, newTaskTitle: string) => void
    changeTaskIsDone: (todolistId: string, task: TTask, status: TaskStatuses) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (newTodolistTitle: string, todolistId: string) => void
}

const Todolist = React.memo(({demo = false, ...props}: TodolistPropsType) => {
    console.log('TL R')
    const dispatch = useDispatch()

    useEffect(() => {
        if(demo) return
        dispatch(fetchTasks({todoListId: props.todoList.id}))
    }, [])

    //* Callbacks for EditableSpan, AddItemForm and Buttons callbacks  ===============================================>>
    const addNewTask = useCallback((newTaskTitle: string) =>
        props.addNewTask(props.todoList.id, newTaskTitle), [props.addNewTask, props.todoList.id])
    const removeTodolist = useCallback(() =>
        props.removeTodolist(props.todoList.id), [props.removeTodolist, props.todoList.id])
    const setFilterAll = useCallback(() =>
        props.filterTasks(props.todoList.id, 'all'), [props.todoList.id, props.filterTasks])
    const setFilterCompleted = useCallback(() =>
        props.filterTasks(props.todoList.id, 'completed'), [props.todoList.id, props.filterTasks])
    const setFilterActive = useCallback(() =>
        props.filterTasks(props.todoList.id, 'active'), [props.todoList.id, props.filterTasks])
    const setFilterVariant = useCallback((filter: TFilterValues) =>
        props.todoList.filter === filter ? 'contained' : 'outlined', [props.todoList.filter])
    const setFilterColor = useCallback((filter: TFilterValues) =>
        props.todoList.filter === filter ? 'primary' : 'default', [props.todoList.filter])
    const changeTodolistTitle = useCallback((newTodolistTitle: string) =>
        props.changeTodolistTitle(newTodolistTitle, props.todoList.id), [props.changeTodolistTitle, props.todoList.id])

    //* Todolist filters logic ======================================================================================>
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
                           changeTaskIsDone={props.changeTaskIsDone}
                           changeTaskTitle={props.changeTaskTitle}
                           removeTask={props.removeTask}
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

export default Todolist

