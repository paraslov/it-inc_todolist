import React, {useState} from 'react';
import './App.css';
import Todolist from './Todolist';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'completed' | 'active'


function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JavaScript', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Rest API', isDone: false},
        {id: 5, title: 'GraphQL', isDone: false},
    ])
    let [filter, setFilter] = useState<FilterValuesType>('all')

    let tasksForTodolist = tasks
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }

    function removeTask(id: number) {
        setTasks(tasks.filter(t => t.id !== id))
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
            />
        </div>
    );
}

export default App;
