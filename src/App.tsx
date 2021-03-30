import React from 'react';
import './App.css';
import Todolist from "./Todolist";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}


function App() {
    const tasks1: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JavaScript", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
    ]
    const tasks2: Array<TaskType> = [
        {id: 1, title: "Hello, world", isDone: true},
        {id: 2, title: "I am so happy", isDone: false},
        {id: 3, title: "Yo yo yo", isDone: false},
    ]

    return (
        <div className="App">
            <Todolist title = "What to learn" tasks = {tasks1}/>
            <Todolist title = "Songs" tasks = {tasks2}/>
        </div>
    );
}

export default App;
