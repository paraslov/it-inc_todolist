import {v1} from 'uuid'
import {TTasks} from './tasks_reducer'
import {TaskPriorities, TaskStatuses} from '../../../api/tasks_api'
import {tasksActions, tasksReducer, todoListsActions} from '../index'

const {addTodoList, removeTodoList} = todoListsActions
const {addTask, fetchTasks, removeTask, updateTask, _setTaskStatus} = tasksActions

const todolist1 = v1()
const todolist2 = v1()

let tasks: TTasks

beforeEach(() => {
    tasks = {
        [todolist1]: [
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                todoListId: todolist1,
                description: 'desc',
                taskStatus: 'idle'
            },
            {
                id: v1(),
                title: 'JavaScript',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                todoListId: todolist1,
                description: 'desc',
                taskStatus: 'idle'
            },
            {
                id: v1(),
                title: 'ReactJS',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                todoListId: todolist1,
                description: 'desc',
                taskStatus: 'idle'
            },
            {
                id: v1(),
                title: 'Rest API',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                todoListId: todolist1,
                description: 'desc',
                taskStatus: 'idle'
            },
            {
                id: v1(),
                title: 'GraphQL',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                todoListId: todolist1,
                description: 'desc',
                taskStatus: 'idle'
            },
        ],
        [todolist2]: [
            {
                id: v1(),
                title: 'CD',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                todoListId: todolist2,
                description: 'desc',
                taskStatus: 'idle'
            },
            {
                id: v1(),
                title: 'HF:JavaScript',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                todoListId: todolist2,
                description: 'desc',
                taskStatus: 'idle'
            },
            {
                id: v1(),
                title: 'Clean code',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                todoListId: todolist2,
                description: 'desc',
                taskStatus: 'idle'
            },
            {
                id: v1(),
                title: 'Algorithms',
                status: TaskStatuses.Draft,
                priority: TaskPriorities.Middle,
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                todoListId: todolist2,
                description: 'desc',
                taskStatus: 'idle'
            },
        ],
    }
})

test('should delete task #3 from todolist1', () => {

    const taskToRemoveId = tasks[todolist1][2].id
    const newTasks: TTasks = tasksReducer(tasks, removeTask.fulfilled({todoListId: todolist1, taskId: taskToRemoveId},
        'requestId', {todoListId: todolist1, taskId: taskToRemoveId}))

    expect(newTasks[todolist1].length).toBe(4)
    expect(newTasks[todolist1][2].title).toBe('Rest API')
    expect(newTasks[todolist1].every(t => t.id !== taskToRemoveId)).toBeTruthy()
    expect(newTasks).not.toBe(tasks)
    expect(tasks[todolist1][2].title).toBe('ReactJS')
    expect(tasks[todolist1].length).toBe(5)

})

test('should add task to todolist2', () => {

    const newTaskTitle = 'WebStorm'
    const newTasks = tasksReducer(tasks, addTask.fulfilled({
        task: {
            id: '101', title: newTaskTitle, status: TaskStatuses.New, priority: TaskPriorities.Middle,
            addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todolist2, description: 'desc'
        }
    }, 'requestId', {todoListId: todolist2, title: newTaskTitle}))

    expect(newTasks[todolist2].length).toBe(5)
    expect(newTasks[todolist2][0].title).toBe(newTaskTitle)
    expect(newTasks[todolist2][0].status).toBe(TaskStatuses.New)
    expect(newTasks[todolist2][0].id).toBeDefined()
    expect(newTasks).not.toBe(tasks)
    expect(tasks[todolist2].length).toBe(4)
})

test('should change task title "HTML&CSS" to "Layout"', () => {

    const newTaskTitle = 'Layout'
    const taskId = tasks[todolist1][0].id
    let updatedModel = {
        title: newTaskTitle,
        status: TaskStatuses.New,
        priority: TaskPriorities.Middle,
        startDate: '',
        deadline: '',
        description: 'desc'
    }
    const newTasks = tasksReducer(tasks, updateTask.fulfilled({todoListId: todolist1, taskId, model: updatedModel},
        'requestId', {todoListId: todolist1, task: tasks[todolist1][0], model: updatedModel}))

    expect(newTasks[todolist1].length).toBe(5)
    expect(newTasks[todolist1][0].title).toBe(newTaskTitle)
    expect(newTasks).not.toBe(tasks)
    expect(tasks[todolist1][0].title).toBe('HTML&CSS')
})

test('should toggle todolist2 4th task isDone', () => {
    const taskId = tasks[todolist2][3].id
    let updatedModel = {
        title: 'Algorithms', status: TaskStatuses.New, priority: TaskPriorities.Middle,
        startDate: '', deadline: '', description: 'desc'
    }
    const newTasks = tasksReducer(tasks, updateTask.fulfilled({
        todoListId: todolist2, taskId, model: updatedModel
    }, 'requestId', {todoListId: todolist2, task: tasks[todolist2][3], model: updatedModel}))

    expect(newTasks).not.toBe(tasks)
    expect(newTasks[todolist2][3].status === TaskStatuses.New).toBeTruthy()
    expect(tasks[todolist2][3].status === TaskStatuses.New).toBeFalsy()
})

test('when removing todolist, array of tasks should be removed', () => {

    const newTasks = tasksReducer(tasks, removeTodoList.fulfilled({todoListId: todolist2}, 'requestId', {todoListId: todolist2}))
    const keys = Object.keys(newTasks)

    expect(keys.length).toBe(1)
    expect(newTasks[todolist2]).toBeUndefined()
    expect(tasks[todolist2]).toBeDefined()
})

test('when adding todolist, array of tasks should be added', () => {

    const newTasks = tasksReducer(tasks, addTodoList.fulfilled({
        todoList: {
            id: v1(),
            title: 'todolist data has no matter',
            addedDate: '',
            order: 0
        }
    }, 'requestId', {title: 'todolist data has no matter'}))
    const keys = Object.keys(newTasks)
    const newKey = keys.find(k => k !== todolist1 && k !== todolist2)

    if (!newKey) {
        throw new Error('no key was generated!')
    }

    expect(keys.length).toBe(3)
    expect(newTasks[newKey]).toStrictEqual([])
    expect(tasks[newKey]).toBeUndefined()
})

test('tasks should be settled to todo list', () => {

    let payload = {todoListId: 'newTodoListId', tasks: tasks[todolist2]}
    const newTasks = tasksReducer({}, fetchTasks.fulfilled(payload, 'requestId', {todoListId: payload.todoListId}))

    expect(newTasks['newTodoListId'].length).toBe(4)
    expect(newTasks['newTodoListId'][1].title).toBe('HF:JavaScript')
})

test('should change task status from "idle" to "loading"', () => {

    const newTaskStatus = 'loading'
    const taskId = tasks[todolist1][0].id
    const newTasks = tasksReducer(tasks, _setTaskStatus({todoListId: todolist1, taskId, taskStatus: 'loading'}))

    expect(newTasks[todolist1].length).toBe(5)
    expect(newTasks[todolist1][0].taskStatus).toBe(newTaskStatus)
    expect(newTasks).not.toBe(tasks)
    expect(tasks[todolist1][0].taskStatus).toBe('idle')
})