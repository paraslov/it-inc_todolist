import React, {useCallback, useEffect} from 'react';
import './App.css';
import Todolist from './components/Todolist/Todolist';
import {AddItemForm} from './components/common/AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    _changeTodoListFilter,
    addTodoList,
    changeTodoListTitle,
    fetchTodoListsTC,
    FilterValuesType,
    removeTodoList
} from './state/todolists_reducer';
import {useDispatch, useSelector} from 'react-redux';
import {SelectTasks, SelectTodoLists} from './selectors/selectors';
import {TaskStatuses, TaskType} from './api/tasks_api';
import {addTask, removeTask, updateTask} from './state/tasks_reducer';


function AppWithRedux() {
    console.log('APP R')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, [])

    //* TodoLists data declaration section  =============================================================>
    const todoLists = useSelector(SelectTodoLists)

    //* Tasks data declaration section =====================================================================>
    const tasks = useSelector(SelectTasks)

    //* Callbacks for Tasks management  ==================================================================>
    const removeTaskCallback = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTask(todolistId, taskId))
    }, [dispatch])

    const addNewTask = useCallback((todolistId: string, newTaskTitle: string) => {
        dispatch(addTask(todolistId, newTaskTitle))
    }, [dispatch])

    const changeTaskIsDone = useCallback((todolistId: string, task: TaskType, status: TaskStatuses) => {
        dispatch(updateTask(todolistId, task, {status}))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, task: TaskType, newTaskTitle: string) => {
        dispatch(updateTask(todolistId, task, {title: newTaskTitle}))
    }, [dispatch])

    //* Callbacks for Todolists management  ====================================================================>
    const removeTodolistCallback = useCallback((todolistId: string) => {
        dispatch(removeTodoList(todolistId))
    }, [dispatch])

    const addNewTodolist = useCallback((newTodolistTitle: string) => {
        dispatch(addTodoList(newTodolistTitle))
    }, [dispatch])

    const filterTasks = useCallback((id: string, filterCondition: FilterValuesType) => {
        dispatch(_changeTodoListFilter(id, filterCondition))
    }, [dispatch])

    const changeTodoListTitleCallback = useCallback((newTodolistTitle: string, todolistId: string) => {
        dispatch(changeTodoListTitle(todolistId, newTodolistTitle))
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
                    {todoLists.map((tl: any) => {
                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        title={tl.title}
                                        tasks={tasks[tl.id]}
                                        todolistId={tl.id}
                                        removeTask={removeTaskCallback}
                                        filterTasks={filterTasks}
                                        addNewTask={addNewTask}
                                        filter={tl.filter}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTaskIsDone={changeTaskIsDone}
                                        removeTodolist={removeTodolistCallback}
                                        changeTodolistTitle={changeTodoListTitleCallback}
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
