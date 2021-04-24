import {v1} from 'uuid';
import {TasksType} from '../App';
import {addTaskAC, changeTaskIsDoneAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks_reducer';

const todolist1 = v1()
const todolist2 = v1()

const tasks: TasksType = {
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
}

test('should delete task #3 from todolist1', () => {

    const taskToRemove = tasks[todolist1][2].id

    const newTasks = tasksReducer(tasks, removeTaskAC(todolist1, taskToRemove))

    expect(newTasks[todolist1].length).toBe(4)
    expect(newTasks[todolist1][2].title).toBe('Rest API')
    expect(newTasks).not.toBe(tasks)
    expect(tasks[todolist1][2].title).toBe('ReactJS')
    expect(tasks[todolist1].length).toBe(5)
})

test('should add task to todolist2', () => {

    const newTaskTitle = 'WebStorm'

    const newTasks = tasksReducer(tasks, addTaskAC(todolist2, newTaskTitle))

    expect(newTasks[todolist2].length).toBe(5)
    expect(newTasks[todolist2][0].title).toBe(newTaskTitle)
    expect(newTasks).not.toBe(tasks)
    expect(tasks[todolist2].length).toBe(4)
})

test('should change task title "HTML&CSS" to "Layout"', () => {

    const newTaskTitle = 'Layout'
    const taskId = tasks[todolist1][0].id

    const newTasks = tasksReducer(tasks, changeTaskTitleAC(todolist1, taskId, newTaskTitle))

    expect(newTasks[todolist1].length).toBe(5)
    expect(newTasks[todolist1][0].title).toBe(newTaskTitle)
    expect(newTasks).not.toBe(tasks)
    expect(tasks[todolist1][0].title).toBe('HTML&CSS')
})

test('should toggle todolist2 4th task isDone', () => {
    const taskId = tasks[todolist2][3].id

    const newTasks = tasksReducer(tasks, changeTaskIsDoneAC(todolist2, taskId))

    expect(newTasks[todolist2][3].isDone).toBe(true)
    expect(newTasks).not.toBe(tasks)
    expect(tasks[todolist2][3].isDone).toBe(false)
})