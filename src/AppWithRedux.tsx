import React, {useReducer} from 'react';
import './App.css';
import Todolist from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './state/todolists_reducer';
import {addTaskAC, changeTaskIsDoneAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks_reducer';

//* Types declaration ==================================================================================>
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = 'all' | 'completed' | 'active'


function AppWithRedux() {

    //* Todolists data declaration section  =============================================================>

    const todolist1 = v1()
    const todolist2 = v1()
    const todolist3 = v1()

    const [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
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

    const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
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
        dispatchToTasksReducer(removeTaskAC(todolistId, id))
    }

    function addNewTask(newTaskTitle: string, todolistId: string) {
        dispatchToTasksReducer(addTaskAC(todolistId, newTaskTitle))
    }

    function changeTaskIsDone(taskId: string, todolistId: string) {
        dispatchToTasksReducer(changeTaskIsDoneAC(todolistId, taskId))
    }

    function changeTaskTitle(newTaskTitle: string, taskId: string, todolistId: string) {
        dispatchToTasksReducer(changeTaskTitleAC(todolistId, taskId, newTaskTitle))
    }

    //* Callbacks for Todolists management  ====================================================================>
    function removeTodolist(todolistId: string) {
        dispatchToTodolistsReducer(removeTodolistAC(todolistId))
        dispatchToTasksReducer(removeTodolistAC(todolistId))
    }

    function addNewTodolist(newTodolistTitle: string) {
        const action = addTodolistAC(newTodolistTitle)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    function filterTasks(id: string, filterCondition: FilterValuesType) {
        dispatchToTodolistsReducer(changeTodolistFilterAC(id, filterCondition))
    }

    function changeTodolistTitle(newTodolistTitle: string, todolistId: string) {
        dispatchToTodolistsReducer(changeTodolistTitleAC(todolistId, newTodolistTitle))
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

export default AppWithRedux;
