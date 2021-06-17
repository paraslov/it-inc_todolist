import {useDispatch, useSelector} from 'react-redux';
import React, {useCallback, useEffect} from 'react';
import {
    _changeTodoListFilter,
    addTodoList,
    changeTodoListTitle,
    fetchTodoListsTC,
    TFilterValues,
    removeTodoList
} from './todolists_reducer';
import {selectIsAuth, selectTasks, selectTodoLists} from '../../utils/selectors/selectors';
import {addTask, removeTask, updateTask} from './TodoList/tasks_reducer';
import {TaskStatuses, TTask} from '../../api/tasks_api';
import {Grid, Paper} from '@material-ui/core';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import Todolist from './TodoList/Todolist';
import {Redirect} from 'react-router-dom';

type PropsType = {
    demo?: boolean
}
export function TodoLists({demo = false}: PropsType) {
    console.log('TodoLists R')

    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)

    useEffect(() => {
        if(demo || !isAuth) return
        dispatch(fetchTodoListsTC())
    }, [])

    //* TodoLists data declaration section  =============================================================>
    const todoLists = useSelector(selectTodoLists)

    //* Tasks data declaration section =====================================================================>
    const tasks = useSelector(selectTasks)

    //* Callbacks for Tasks management  ==================================================================>
    const removeTaskCallback = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTask(todolistId, taskId))
    }, [dispatch])
    const addNewTask = useCallback((todolistId: string, newTaskTitle: string) => {
        dispatch(addTask(todolistId, newTaskTitle))
    }, [dispatch])
    const changeTaskIsDone = useCallback((todolistId: string, task: TTask, status: TaskStatuses) => {
        dispatch(updateTask(todolistId, task, {status}))
    }, [dispatch])
    const changeTaskTitle = useCallback((todolistId: string, task: TTask, newTaskTitle: string) => {
        dispatch(updateTask(todolistId, task, {title: newTaskTitle}))
    }, [dispatch])

    //* Callbacks for TodoLists management  ====================================================================>
    const removeTodolistCallback = useCallback((todolistId: string) => {
        dispatch(removeTodoList(todolistId))
    }, [dispatch])
    const addNewTodolist = useCallback((newTodolistTitle: string) => {
        dispatch(addTodoList(newTodolistTitle))
    }, [dispatch])
    const filterTasks = useCallback((id: string, filterCondition: TFilterValues) => {
        dispatch(_changeTodoListFilter(id, filterCondition))
    }, [dispatch])
    const changeTodoListTitleCallback = useCallback((newTodolistTitle: string, todolistId: string) => {
        dispatch(changeTodoListTitle(todolistId, newTodolistTitle))
    }, [dispatch])

    if(!isAuth) return <Redirect to={'/login'} />

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm label={'Add TODO list'} addNewItem={addNewTodolist}/>
            </Grid>

            <Grid container spacing={2}>
                {todoLists.map((tl: any) => {
                        return <Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    demo = {demo}
                                    todoList={tl}
                                    tasks={tasks[tl.id]}
                                    removeTask={removeTaskCallback}
                                    filterTasks={filterTasks}
                                    addNewTask={addNewTask}
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
        </>
    )
}