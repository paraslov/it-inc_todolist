import React, {useCallback} from 'react';
import './App.css';
import Todolist from './components/Todolist/Todolist';
import {AddItemForm} from './components/common/AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    TodolistActionsType
} from './state/todolists_reducer';
import {addTaskAC, changeTaskIsDoneAC, changeTaskTitleAC, removeTaskAC, TasksActionsType} from './state/tasks_reducer';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch} from 'redux';
import {SelectTasks, SelectTodoLists} from './selectors/selectors';

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
    console.log('APP R')

    const dispatch = useDispatch<Dispatch<TodolistActionsType | TasksActionsType>>()

    //* Todolists data declaration section  =============================================================>
    const todolists = useSelector(SelectTodoLists)

    //* Tasks data declaration section =====================================================================>
    const tasks = useSelector(SelectTasks)

    //* Callbacks for Tasks management  ==================================================================>
    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskAC(todolistId, id))
    }, [dispatch])

    const addNewTask = useCallback((newTaskTitle: string, todolistId: string) => {
        dispatch(addTaskAC(todolistId, newTaskTitle))
    }, [dispatch])

    const changeTaskIsDone = useCallback((taskId: string, todolistId: string) => {
        dispatch(changeTaskIsDoneAC(todolistId, taskId))
    }, [dispatch])

    const changeTaskTitle = useCallback((newTaskTitle: string, taskId: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTaskTitle))
    }, [dispatch])

    //* Callbacks for Todolists management  ====================================================================>
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, [dispatch])

    const addNewTodolist = useCallback((newTodolistTitle: string) => {
        dispatch(addTodolistAC(newTodolistTitle))
    }, [dispatch])

    const filterTasks = useCallback((id: string, filterCondition: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(id, filterCondition))
    }, [dispatch])

    const changeTodolistTitle = useCallback((newTodolistTitle: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTodolistTitle))
    }, [dispatch])

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
                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        title={tl.title}
                                        tasks={tasks[tl.id]}
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
