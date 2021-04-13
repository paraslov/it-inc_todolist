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

    //* Callbacks for Todolist.tsx  =======================================>
    function removeTask(id: string, todolistId: string) {
        tasks[todolistId].filter(t => t.id !== id)
        setTasks({...tasks})
    }

    function addNewTask(newTaskTitle: string, todolistId: string) {
        const newTask = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }
        tasks[todolistId] = [newTask, ...tasks[todolistId]]
        setTasks({...tasks})
    }

    function filterTasks(filterCondition: FilterValuesType, id: string) {
        let todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.filter = filterCondition
            setTodolists([...todolists])
        }
    }

    //* Todolists declaration section  =======================================>
    type TodolistType = {
        id: string
        title: string
        filter: FilterValuesType
    }

    const todolist1 = v1()
    const todolist2 = v1()
    const todolist3 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {
            id: todolist1,
            title: 'What to learn',
            filter: 'all'
        },
        {
            id: todolist2,
            title: 'What to buy',
            filter: 'active'
        },
        {
            id: todolist3,
            title: 'TODO with todolist, lol',
            filter: 'completed'
        }
    ])

    //* Tasks declaration section =========================================================>
    type TasksType = {
        [key: string] : Array<TaskType>
    }

    const [tasks, setTasks] = useState({
        [todolist1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JavaScript', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolist2]: [
            {id: v1(), title: 'CD', isDone: false},
            {id: v1(), title: 'HF:JavaScript', isDone: true},
            {id: v1(), title: 'Clean code', isDone: true},
            {id: v1(), title: 'Algorithms', isDone: false},
        ],
        [todolist3]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JavaScript', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    return (
        <div className="App">
            {todolists.map((tl: any) => {

                    //* Component filters logic ==========================================>
                    let tasksForTodolist = tasks[tl.id]
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
                    }
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)
                    }

                    return <Todolist title={tl.title}
                                     tasks={tasksForTodolist}
                                     id={tl.id}
                                     removeTask={removeTask}
                                     filterTasks={filterTasks}
                                     addNewTask={addNewTask}

                    />
                }
            )}

        </div>
    );
}

export default App;
