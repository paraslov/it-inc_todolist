import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App';

//* Types declaration ===================================================>
type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    filterTasks: (filterCondition: FilterValuesType, id: string) => void
    addNewTask: (newTaskTitle: string, todolistId: string) => void
}

function Todolist(props: PropsType) {

    //* useState =========================================================>
    const [newTaskTitle, setNewTaskTitle] = useState('')

    //* <li> elements mapping for tasks <ul> list =========================>
    const tasksElements = props.tasks
        .map(task => {
            const removeTask = () => props.removeTask(task.id, props.id)
            return <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        })

    //* Callbacks for adding new task, <input> and <button> tags  ==========>
    const addNewTask = () => {
        props.addNewTask(newTaskTitle, props.id)
        setNewTaskTitle('')
    }
    const onTaskTitleChange = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)
    const onTaskTitleKeyEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) addNewTask()
    }
    const setFilterAll = () => props.filterTasks('all', props.id)
    const setFilterCompleted = () => props.filterTasks('completed', props.id)
    const setFilterActive = () => props.filterTasks('active', props.id)


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onTaskTitleChange}
                       onKeyPress={onTaskTitleKeyEnterPress}/>
                <button onClick={addNewTask}>+</button>
            </div>
            <ul>
                {tasksElements}
            </ul>
            <div>
                <button onClick={setFilterAll}>All</button>
                <button onClick={setFilterActive}>Active</button>
                <button onClick={setFilterCompleted}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist;