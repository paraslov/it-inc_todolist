import {v1} from 'uuid';
import {TasksType} from '../App';
import {addTaskAC, changeTaskIsDoneAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks_reducer';
import {addTodolistAC, removeTodolistAC} from './todolists_reducer';

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

    const taskToRemoveId = tasks[todolist1][2].id

    const newTasks = tasksReducer(tasks, removeTaskAC(todolist1, taskToRemoveId))

    expect(newTasks[todolist1].length).toBe(4)
    expect(newTasks[todolist1][2].title).toBe('Rest API')
    expect(newTasks[todolist1].every(t => t.id !== taskToRemoveId)).toBeTruthy()
    expect(newTasks).not.toBe(tasks)
    expect(tasks[todolist1][2].title).toBe('ReactJS')
    expect(tasks[todolist1].length).toBe(5)

})

test('should add task to todolist2', () => {

    const newTaskTitle = 'WebStorm'

    const newTasks = tasksReducer(tasks, addTaskAC(todolist2, newTaskTitle))

    expect(newTasks[todolist2].length).toBe(5)
    expect(newTasks[todolist2][0].title).toBe(newTaskTitle)
    expect(newTasks[todolist2][0].isDone).toBe(false)
    expect(newTasks[todolist2][0].id).toBeDefined()
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

    expect(newTasks[todolist2][3].isDone).toBeTruthy()
    expect(newTasks).not.toBe(tasks)
    expect(tasks[todolist2][3].isDone).toBeFalsy()
})

test('when removing todolist, array of tasks should be removed', () => {
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

    const newTasks = tasksReducer(tasks, removeTodolistAC(todolist2))

    const keys = Object.keys(newTasks)

    expect(keys.length).toBe(1)
    expect(newTasks[todolist2]).toBeUndefined()
    expect(tasks[todolist2]).toBeDefined()
})

test('when adding todolist, array of tasks should be added', () => {
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

    const newTasks = tasksReducer(tasks, addTodolistAC('title no matter'))

    const keys = Object.keys(newTasks)

    const newKey = keys.find(k => k !== todolist1 && k !== todolist2)

    if (!newKey) {
        throw new Error('no key was generated!')
    }

    expect(keys.length).toBe(3)
    expect(newTasks[newKey]).toStrictEqual([])
    expect(tasks[newKey]).toBeUndefined()
})