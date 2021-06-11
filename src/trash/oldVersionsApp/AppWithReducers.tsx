import React, {useReducer} from 'react';
import '../../app/App.css';
import Todolist from '../../features/TodoLists/TodoList/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    _addTodoList,
    _changeTodoListFilter,
    _changeTodoListTitle,
    _removeTodoList,
    FilterValuesType,
    TodoListDomainType,
    todoListsReducer
} from '../../features/TodoLists/todolists_reducer';
import {_addTask, _removeTask, _updateTask, tasksReducer} from '../../features/TodoLists/TodoList/tasks_reducer';
import {TaskPriorities, TaskStatuses, TaskType} from '../../api/tasks_api';


function AppWithReducers() {

    //* Todolists data declaration section  =============================================================>

    const todolist1 = v1()
    const todolist2 = v1()
    const todolist3 = v1()

    const [todolists, dispatchToTodolistsReducer] = useReducer(todoListsReducer, [
        {
            id: todolist1,
            title: 'What to learn',
            filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'
        },
        {
            id: todolist2,
            title: 'What to buy',
            filter: 'active', addedDate: '', order: 0, entityStatus: 'idle'
        },
        {
            id: todolist3,
            title: 'TODO with todolist, lol',
            filter: 'completed', addedDate: '', order: 0, entityStatus: 'idle'
        }
    ])

    //* Tasks data declaration section =====================================================================>

    const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolist1]: [
            {
                id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todolist1, description: 'desc'
            },
            {
                id: v1(), title: 'JavaScript', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todolist1, description: 'desc'
            },
            {
                id: v1(), title: 'ReactJS', status: TaskStatuses.New, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todolist1, description: 'desc'
            },
            {
                id: v1(), title: 'Rest API', status: TaskStatuses.New, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todolist1, description: 'desc'
            },
            {
                id: v1(), title: 'GraphQL', status: TaskStatuses.New, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todolist1, description: 'desc'
            },
        ],
        [todolist2]: [
            {
                id: v1(), title: 'CD', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todolist1, description: 'desc'
            },
            {
                id: v1(), title: 'HF:JavaScript', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todolist1, description: 'desc'
            },
            {
                id: v1(), title: 'Clean code', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todolist1, description: 'desc'
            },
            {
                id: v1(), title: 'Algorithms', status: TaskStatuses.New, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todolist1, description: 'desc'
            },
        ],
        [todolist3]: [
            {
                id: v1(), title: 'Create Todolist', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todolist1, description: 'desc'
            },
            {
                id: v1(), title: 'Create tasks func', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todolist1, description: 'desc'
            },
            {
                id: v1(), title: 'Create mult TL', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todolist1, description: 'desc'
            },
            {
                id: v1(), title: 'Add TL func-ty', status: TaskStatuses.New, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todolist1, description: 'desc'
            },
            {
                id: v1(), title: 'Add API', status: TaskStatuses.New, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todolist1, description: 'desc'
            },
        ],
    })

    //* Callbacks for Tasks management  ==================================================================>
    function removeTask(id: string, todolistId: string) {
        dispatchToTasksReducer(_removeTask(todolistId, id))
    }

    function addNewTask(newTaskTitle: string, todolistId: string) {
        dispatchToTasksReducer(_addTask(todolistId, {
            id: '101', title: newTaskTitle, status: TaskStatuses.New, priority: TaskPriorities.Middle,
            addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todolistId, description: 'desc'
        }))
    }

    function changeTaskIsDone(todolistId: string, task: TaskType, status: TaskStatuses) {
        dispatchToTasksReducer(_updateTask(todolistId, task.id, {...task, status}))
    }

    function changeTaskTitle(todolistId: string, task: TaskType, newTaskTitle: string) {
        dispatchToTasksReducer(_updateTask(todolistId, task.id, {...task, title: newTaskTitle}))
    }

    //* Callbacks for Todolists management  ====================================================================>
    function removeTodolist(todolistId: string) {
        dispatchToTodolistsReducer(_removeTodoList(todolistId))
        dispatchToTasksReducer(_removeTodoList(todolistId))
    }

    function addNewTodolist(newTodolistTitle: string) {
        const action = _addTodoList({id: v1(), title: newTodolistTitle, addedDate: '', order: 0})
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    function filterTasks(id: string, filterCondition: FilterValuesType) {
        dispatchToTodolistsReducer(_changeTodoListFilter(id, filterCondition))
    }

    function changeTodolistTitle(newTodolistTitle: string, todolistId: string) {
        dispatchToTodolistsReducer(_changeTodoListTitle(todolistId, newTodolistTitle))
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
                    {todolists.map((tl: TodoListDomainType) => {
                            //* Todolist filters logic ==============================================================>
                            let tasksForTodolist = tasks[tl.id]
                            if (tl.filter === 'completed') {
                                tasksForTodolist = tasks[tl.id].filter((t: TaskType) => t.status === TaskStatuses.Completed)
                            }
                            if (tl.filter === 'active') {
                                tasksForTodolist = tasks[tl.id].filter((t: TaskType) => t.status === TaskStatuses.New)
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

export default AppWithReducers;
