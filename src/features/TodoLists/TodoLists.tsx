import {useDispatch, useSelector} from 'react-redux';
import React, {useCallback, useEffect} from 'react';
import {
    _changeTodoListFilter,
    addTodoList,
    changeTodoListTitle,
    fetchTodoLists,
    TFilterValues,
    removeTodoList, TTodoListDomain
} from './todolists_reducer'
import {addTask, removeTask, updateTask} from './TodoList/tasks_reducer';
import {TaskStatuses, TTask} from '../../api/tasks_api';
import {Grid, Paper} from '@material-ui/core';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import Todolist from './TodoList/Todolist';
import {Redirect} from 'react-router-dom';
import {selectTasks, selectTodoLists} from './selectors'
import {authSelectors} from '../Login'

type PropsType = {
    demo?: boolean
}
export function TodoLists({demo = false}: PropsType) {
    console.log('TodoLists R')

    const dispatch = useDispatch()
    const isAuth = useSelector(authSelectors.selectIsAuth)

    useEffect(() => {
        if(demo || !isAuth) return
        dispatch(fetchTodoLists())
    }, [])

    //* TodoLists data declaration section  =============================================================>
    const todoLists = useSelector(selectTodoLists)

    //* Tasks data declaration section =====================================================================>
    const tasks = useSelector(selectTasks)

    //* Callbacks for Tasks management  ==================================================================>
    const removeTaskCallback = useCallback((todoListId: string, taskId: string) => {
        dispatch(removeTask({todoListId, taskId}))
    }, [dispatch])
    const addNewTask = useCallback((todoListId: string, newTaskTitle: string) => {
        dispatch(addTask({todoListId, title: newTaskTitle}))
    }, [dispatch])
    const changeTaskIsDone = useCallback((todoListId: string, task: TTask, status: TaskStatuses) => {
        dispatch(updateTask({todoListId, task, model: {status}}))
    }, [dispatch])
    const changeTaskTitle = useCallback((todoListId: string, task: TTask, newTaskTitle: string) => {
        dispatch(updateTask({todoListId, task, model: {title: newTaskTitle}}))
    }, [dispatch])

    //* Callbacks for TodoLists management  ====================================================================>
    const removeTodolistCallback = useCallback((todoListId: string) => {
        dispatch(removeTodoList({todoListId}))
    }, [dispatch])
    const addNewTodolist = useCallback((newTodolistTitle: string) => {
        dispatch(addTodoList({title: newTodolistTitle}))
    }, [dispatch])
    const filterTasks = useCallback((id: string, filterCondition: TFilterValues) => {
        dispatch(_changeTodoListFilter({todoListId: id, filter: filterCondition}))
    }, [dispatch])
    const changeTodoListTitleCallback = useCallback((newTodolistTitle: string, todolistId: string) => {
        dispatch(changeTodoListTitle({todoListId: todolistId, title: newTodolistTitle}))
    }, [dispatch])

    if(!isAuth) return <Redirect to={'/login'} />

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm label={'Add TODO list'} addNewItem={addNewTodolist}/>
            </Grid>

            <Grid container spacing={2}>
                {todoLists.map((tl: TTodoListDomain) => {
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