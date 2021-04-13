import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App';

//* Types declaration ===================================================>
type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    filterTasks: (filterCondition: FilterValuesType, id: string) => void
    addNewTask: (newTaskTitle: string, todolistId: string) => void
    changeTaskIsDone: (taskId: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
}

function Todolist(props: PropsType) {

    //* useState =========================================================>
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState('')

    //* <li> elements mapping for tasks <ul> list =========================>
    const tasksElements = props.tasks
        .map(task => {
            const removeTask = () => props.removeTask(task.id, props.id)
            const changeTaskIsDone = (e: ChangeEvent<HTMLInputElement>) =>
                props.changeTaskIsDone(task.id, e.currentTarget.checked, props.id)

            return <li className={task.isDone ? 'completedTasks' : ''} key={task.id}>
                <input type="checkbox"
                       onChange={changeTaskIsDone}
                       checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        })

    //* Callbacks for adding new task, <input> and <button> tags callbacks  ==========>
    const addNewTask = () => {
        if (newTaskTitle.trim() === '') {
            setError('Title is required!')
            return
        }
        props.addNewTask(newTaskTitle.trim(), props.id)
        setNewTaskTitle('')
    }
    const removeTodolist = () => props.removeTodolist(props.id)
    const onTaskTitleChange = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)
    const onTaskTitleKeyEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('') // any key press to clear error
        if (e.charCode === 13) addNewTask()
    }
    const setFilterAll = () => props.filterTasks('all', props.id)
    const setFilterCompleted = () => props.filterTasks('completed', props.id)
    const setFilterActive = () => props.filterTasks('active', props.id)
    const setFilterClassName = (filter: FilterValuesType) => props.filter === filter ? 'activeFilter' : ''

    return (
        <div>
            <h3>{props.title} <button onClick={removeTodolist}>X</button></h3>
            <div>
                <input value={newTaskTitle}
                       className={error ? 'error' : ''}
                       onChange={onTaskTitleChange}
                       onKeyPress={onTaskTitleKeyEnterPress}/>
                <button onClick={addNewTask}>+</button>
                {/*//* error message checking ==============================>*/}
                {error ? <div className={'error'}>{error}</div> : false}
            </div>
            <ul>
                {tasksElements}
            </ul>
            <div>
                <button className={setFilterClassName('all')}
                        onClick={setFilterAll}>All
                </button>
                <button className={setFilterClassName('active')}
                        onClick={setFilterActive}>Active
                </button>
                <button className={setFilterClassName('completed')}
                        onClick={setFilterCompleted}>Completed
                </button>
            </div>
        </div>
    )
}

export default Todolist;