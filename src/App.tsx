import React, {useState} from 'react';
import './App.css';
import Todolist from './Todolist';
import {v1} from 'uuid';

//* Types declaration ===================================================>
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'completed' | 'active'


function App() {
    //* useState =========================================================>
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JavaScript', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
    ])
    let [filter, setFilter] = useState<FilterValuesType>('all')

    //* Component filters logic ==========================================>
    let tasksForTodolist = tasks
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }

    //* Callbacks for Todolist.tsx  =======================================>
    function removeTask(id: string) {
        setTasks(tasks.filter(t => t.id !== id))
    }

    function addNewTask(newTaskTitle: string) {
        const newTask = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    function filterTasks(filterCondition: FilterValuesType) {
        setFilter(filterCondition)
    }


    return (
        <div className="App">
            <Todolist title='What to learn'
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      filterTasks={filterTasks}
                      addNewTask={addNewTask}
            />
        </div>
    );
}

export default App;
