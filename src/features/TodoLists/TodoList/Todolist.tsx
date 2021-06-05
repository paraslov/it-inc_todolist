import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task/Task';
import {FilterValuesType} from '../todolists_reducer';
import {TaskStatuses, TaskType} from '../../../api/tasks_api';
import {useDispatch} from 'react-redux';
import {fetchTasks} from './tasks_reducer';

//* Types declaration ================================================================================================>>
export type TodolistPropsType = {
    todolistId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    filterTasks: (id: string, filterCondition: FilterValuesType) => void
    addNewTask: (newTaskTitle: string, todolistId: string) => void
    changeTaskTitle: (todolistId: string, task: TaskType, newTaskTitle: string) => void
    changeTaskIsDone: (todolistId: string, task: TaskType, status: TaskStatuses) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (newTodolistTitle: string, todolistId: string) => void
}

const Todolist = React.memo((props: TodolistPropsType) => {
    console.log('TL R')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasks(props.todolistId))
    }, [])

    //* Callbacks for EditableSpan, AddItemForm and Buttons callbacks  ===============================================>>
    const addNewTask = useCallback((newTaskTitle: string) =>
        props.addNewTask(props.todolistId, newTaskTitle), [props.addNewTask, props.todolistId])
    const removeTodolist = useCallback(() =>
        props.removeTodolist(props.todolistId), [props.removeTodolist, props.todolistId])
    const setFilterAll = useCallback(() =>
        props.filterTasks(props.todolistId, 'all'), [props.todolistId, props.filterTasks])
    const setFilterCompleted = useCallback(() =>
        props.filterTasks(props.todolistId, 'completed'), [props.todolistId, props.filterTasks])
    const setFilterActive = useCallback(() =>
        props.filterTasks(props.todolistId, 'active'), [props.todolistId, props.filterTasks])
    const setFilterVariant = useCallback((filter: FilterValuesType) =>
        props.filter === filter ? 'contained' : 'outlined', [props.filter])
    const setFilterColor = useCallback((filter: FilterValuesType) =>
        props.filter === filter ? 'primary' : 'default', [props.filter])
    const changeTodolistTitle = useCallback((newTodolistTitle: string) =>
        props.changeTodolistTitle(newTodolistTitle, props.todolistId), [props.changeTodolistTitle, props.todolistId])

    //* Todolist filters logic ======================================================================================>
    let tasksForTodolist = props.tasks
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }

    //* <li> elements mapping for tasks <ul> list ===================================================================>
    const tasksElements = tasksForTodolist
        .map(task => <Task key={task.id}
                           task={task}
                           changeTaskIsDone={props.changeTaskIsDone}
                           changeTaskTitle={props.changeTaskTitle}
                           removeTask={props.removeTask}
        />)

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm label={'Add task'} addNewItem={addNewTask}/>
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

