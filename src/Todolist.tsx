import React from 'react';
import {FilterValuesType, TaskType} from './App';


type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    filterTasks: (filterCondition: FilterValuesType) => void
}

function Todolist(props: PropsType) {

    const tasksElements = props.tasks
        .map(task => <li key={task.id}>
            <input type="checkbox" checked={task.isDone}/>
            <span>{task.title}</span>
            <button onClick={() => {
                props.removeTask(task.id)
            }}>x
            </button>
        </li>)
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksElements}
            </ul>
            <div>
                <button onClick={() => {
                    props.filterTasks('all')
                }}>All
                </button>
                <button onClick={() => {
                    props.filterTasks('active')
                }}>Active
                </button>
                <button onClick={() => {
                    props.filterTasks('completed')
                }}>Completed
                </button>
            </div>
        </div>
    )
}

export default Todolist;