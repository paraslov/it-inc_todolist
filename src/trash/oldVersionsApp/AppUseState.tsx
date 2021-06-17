import React, {useState} from 'react';
import '../../app/App.css';
import Todolist from '../../features/TodoLists/TodoList/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TFilterValues, TTodoListDomain} from '../../features/TodoLists/todolists_reducer';
import {TaskPriorities, TaskStatuses, TTask} from '../../api/tasks_api';
import {TTaskDomain, TTasks} from '../../features/TodoLists/TodoList/tasks_reducer';


function App() {
    console.log('APP')

    //* Todolists data declaration section  =============================================================>

    const todolist1 = v1()
    const todolist2 = v1()
    const todolist3 = v1()

    const [todolists, setTodolists] = useState<Array<TTodoListDomain>>([
        {
            id: todolist1,
            title: 'What to learn',
            filter: 'all', addedDate: '', order: 0, todoListStatus: 'idle'
        },
        {
            id: todolist2,
            title: 'What to buy',
            filter: 'active', addedDate: '', order: 0, todoListStatus: 'idle'
        },
        {
            id: todolist3,
            title: 'TODO with todolist, lol',
            filter: 'completed', addedDate: '', order: 0, todoListStatus: 'idle'
        }
    ])

    //* Tasks data declaration section =====================================================================>

    const [tasks, setTasks] = useState<TTasks>({
        [todolist1]: [
            {
                id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todolist1, description: 'desc', taskStatus: 'idle'
            },
            {
                id: v1(), title: 'JavaScript', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todolist1, description: 'desc', taskStatus: 'idle'
            },
            {
                id: v1(), title: 'ReactJS', status: TaskStatuses.New, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todolist1, description: 'desc', taskStatus: 'idle'
            },
            {
                id: v1(), title: 'Rest API', status: TaskStatuses.New, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todolist1, description: 'desc', taskStatus: 'idle'
            },
            {
                id: v1(), title: 'GraphQL', status: TaskStatuses.New, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todolist1, description: 'desc', taskStatus: 'idle'
            },
        ],
        [todolist2]: [
            {
                id: v1(), title: 'CD', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todolist1, description: 'desc', taskStatus: 'idle'
            },
            {
                id: v1(), title: 'HF:JavaScript', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todolist1, description: 'desc', taskStatus: 'idle'
            },
            {
                id: v1(), title: 'Clean code', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todolist1, description: 'desc', taskStatus: 'idle'
            },
            {
                id: v1(), title: 'Algorithms', status: TaskStatuses.New, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todolist1, description: 'desc', taskStatus: 'idle'
            },
        ],
        [todolist3]: [
            {
                id: v1(), title: 'Create Todolist', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todolist1, description: 'desc', taskStatus: 'idle'
            },
            {
                id: v1(), title: 'Create tasks func', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todolist1, description: 'desc', taskStatus: 'idle'
            },
            {
                id: v1(), title: 'Create mult TL', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todolist1, description: 'desc', taskStatus: 'idle'
            },
            {
                id: v1(), title: 'Add TL func-ty', status: TaskStatuses.New, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todolist1, description: 'desc', taskStatus: 'idle'
            },
            {
                id: v1(), title: 'Add API', status: TaskStatuses.New, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todolist1, description: 'desc', taskStatus: 'idle'
            },
        ],
    })

    //* Callbacks for Tasks management  ==================================================================>
    function removeTask(id: string, todolistId: string) {
        tasks[todolistId] = tasks[todolistId].filter(t => t.id !== id)
        setTasks({...tasks})
    }

    function addNewTask(newTaskTitle: string, todolistId: string) {
        const newTask: TTaskDomain = {
            id: v1(),
            title: newTaskTitle,
            status: TaskStatuses.New, priority: TaskPriorities.Middle,
            addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todolist1, description: 'desc', taskStatus: 'idle'
        }
        tasks[todolistId] = [newTask, ...tasks[todolistId]]
        setTasks({...tasks})
    }

    function changeTaskIsDone(todolistId: string, task: TTask, status: TaskStatuses) {
        const updatingTask = tasks[todolistId].find(t => t.id === task.id)
        if (updatingTask) {
            updatingTask.status = status
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(todolistId: string, task: TTask, newTaskTitle: string) {
        const updatingTask = tasks[todolistId].find(t => t.id === task.id)
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
        const newTodolist: TTodoListDomain = {
            id: v1(),
            title: newTodolistTitle,
            filter: 'all',
            addedDate: '',
            order: 0,
            todoListStatus: 'idle'
        }
        setTodolists([newTodolist, ...todolists])
        setTasks({
            ...tasks,
            [newTodolist.id]: []
        })
    }

    function filterTasks(id: string, filterCondition: TFilterValues) {
        let todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.filter = filterCondition
            setTodolists([...todolists])
        }
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
                                tasksForTodolist = tasks[tl.id].filter(t => t.status === TaskStatuses.Completed)
                            }
                            if (tl.filter === 'active') {
                                tasksForTodolist = tasks[tl.id].filter(t => t.status === TaskStatuses.New)
                            }
                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        tasks={tasksForTodolist}
                                        todoList={tl}
                                        removeTask={removeTask}
                                        filterTasks={filterTasks}
                                        addNewTask={addNewTask}
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
