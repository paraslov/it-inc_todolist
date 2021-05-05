import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

//* Types declaration ============================================================================================>
type PropsType = {
    todolistId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    filterTasks: (id: string, filterCondition: FilterValuesType) => void
    addNewTask: (newTaskTitle: string, todolistId: string) => void
    changeTaskTitle: (newTaskTitle: string, taskId: string, todolistId: string) => void
    changeTaskIsDone: (taskId: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (newTodolistTitle: string, todolistId: string) => void
}

function Todolist(props: PropsType) {

    //* Callbacks for adding new task, <input> and <button> tags callbacks  =======================================>
    const addNewTask = (newTaskTitle: string) => props.addNewTask(newTaskTitle, props.todolistId)
    const removeTodolist = () => props.removeTodolist(props.todolistId)
    const setFilterAll = () => props.filterTasks(props.todolistId, 'all')
    const setFilterCompleted = () => props.filterTasks(props.todolistId, 'completed')
    const setFilterActive = () => props.filterTasks(props.todolistId, 'active')
    const setFilterVariant = (filter: FilterValuesType) => props.filter === filter ? 'contained' : 'outlined'
    const setFilterColor = (filter: FilterValuesType) => props.filter === filter ? 'primary' : 'default'
    const changeTodolistTitle = (newTodolistTitle: string) => {
        props.changeTodolistTitle(newTodolistTitle, props.todolistId)
    }
    //* <li> elements mapping for tasks <ul> list ================================================================>
    const tasksElements = props.tasks
        .map(task => {
            const removeTask = () => props.removeTask(task.id, props.todolistId)
            const changeTaskIsDone = () =>
                props.changeTaskIsDone(task.id, props.todolistId)
            const changeTaskTitle = (newTaskTitle: string) => {
                props.changeTaskTitle(newTaskTitle, task.id, props.todolistId)
            }

            return <div style={{opacity: task.isDone ? 0.5 : 1}} key={task.id}>
                <Checkbox onChange={changeTaskIsDone}
                          color={'primary'}
                          checked={task.isDone}/>
                <EditableSpan title={task.title} onChange={changeTaskTitle}/>
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </div>
        })

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
}

export default Todolist

