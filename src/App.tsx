import React, {useState} from 'react';
import './App.css';
import Todolist from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import classes from '*.module.css';

//* Types declaration ==================================================================================>
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'completed' | 'active'


function App() {

    //* Todolists data declaration section  =============================================================>
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

    //* Tasks data declaration section =====================================================================>
    type TasksType = {
        [key: string]: Array<TaskType>
    }

    const [tasks, setTasks] = useState<TasksType>({
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
            {id: v1(), title: 'Create Todolist', isDone: true},
            {id: v1(), title: 'Create tasks func', isDone: true},
            {id: v1(), title: 'Create mult TL', isDone: true},
            {id: v1(), title: 'Add TL func-ty', isDone: false},
            {id: v1(), title: 'Add API', isDone: false},
        ],
    })

    //* Callbacks for Tasks management  ==================================================================>
    function removeTask(id: string, todolistId: string) {
        tasks[todolistId] = tasks[todolistId].filter(t => t.id !== id)
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

    function changeTaskIsDone(taskId: string, isDone: boolean, todolistId: string) {
        const updatingTask = tasks[todolistId].find(t => t.id === taskId)
        if (updatingTask) {
            updatingTask.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(newTaskTitle: string, taskId: string, todolistId: string) {
        const updatingTask = tasks[todolistId].find(t => t.id === taskId)
        if (updatingTask) {
            updatingTask.title = newTaskTitle
            setTasks({...tasks})
        }
    }

    //* Callbacks for Todolists management  ====================================================================>
    function removeTodolist(todolistId: string) {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    function addNewTodolist(newTodolistTitle: string) {
        const newTodolist: TodolistType = {id: v1(), title: newTodolistTitle, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({
            ...tasks,
            [newTodolist.id]: []
        })
    }

    function changeTodolistTitle(newTodolistTitle: string, todolistId: string) {
        const updatingTodolist = todolists.find(t => t.id === todolistId)
        if (updatingTodolist) {
            updatingTodolist.title = newTodolistTitle
            setTodolists([...todolists])
        }
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm label={'Add TODO list'} addNewItem={addNewTodolist}/>
                </Grid>

                <Grid container spacing={2}>
                    {todolists.map((tl: any) => {
                            //* Todolist filters logic ==============================================================>
                            let tasksForTodolist = tasks[tl.id]
                            if (tl.filter === 'completed') {
                                tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
                            }
                            if (tl.filter === 'active') {
                                tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)
                            }
                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        todolistId={tl.id}
                                        removeTask={removeTask}
                                        filterTasks={filterTasks}
                                        addNewTask={addNewTask}
                                        filter={tl.filter}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTaskIsDone={changeTaskIsDone}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        }
                    )}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
