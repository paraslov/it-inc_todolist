import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

//* Types declaration ============================================================================================>
type PropsType = {
    todolistId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    filterTasks: (filterCondition: FilterValuesType, id: string) => void
    addNewTask: (newTaskTitle: string, todolistId: string) => void
    changeTaskTitle: (newTaskTitle: string, taskId: string, todolistId: string) => void
    changeTaskIsDone: (taskId: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (newTodolistTitle: string, todolistId: string) => void
}

function Todolist(props: PropsType) {

    //* Callbacks for adding new task, <input> and <button> tags callbacks  =======================================>
    const addNewTask = (newTaskTitle: string) => props.addNewTask(newTaskTitle, props.todolistId)
    const removeTodolist = () => props.removeTodolist(props.todolistId)
    const setFilterAll = () => props.filterTasks('all', props.todolistId)
    const setFilterCompleted = () => props.filterTasks('completed', props.todolistId)
    const setFilterActive = () => props.filterTasks('active', props.todolistId)
    const setFilterClassName = (filter: FilterValuesType) => props.filter === filter ? 'activeFilter' : ''
    const changeTodolistTitle = (newTodolistTitle: string) => {
        props.changeTodolistTitle(newTodolistTitle, props.todolistId)
    }

    //* <li> elements mapping for tasks <ul> list ================================================================>
    const tasksElements = props.tasks
        .map(task => {
            const removeTask = () => props.removeTask(task.id, props.todolistId)
            const changeTaskIsDone = (e: ChangeEvent<HTMLInputElement>) =>
                props.changeTaskIsDone(task.id, e.currentTarget.checked, props.todolistId)
            const changeTaskTitle = (newTaskTitle: string) => {
                props.changeTaskTitle(newTaskTitle, task.id, props.todolistId)
            }

            return <li className={task.isDone ? 'completedTasks' : ''} key={task.id}>
                <input type="checkbox"
                       onChange={changeTaskIsDone}
                       checked={task.isDone}/>
                <EditableSpan title={task.title} onChange={changeTaskTitle}/>
                <button onClick={removeTask}>x</button>
            </li>
        })

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <button onClick={removeTodolist}>X</button>
            </h3>
            <AddItemForm addNewItem={addNewTask}/>
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

export default Todolist

