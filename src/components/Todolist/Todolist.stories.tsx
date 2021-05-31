import React from 'react';
import Todolist, {TodolistPropsType} from './Todolist';
import {Meta, Story} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses} from '../../api/tasks_api';


export default {
    title: 'Todo List/Todolist component',
    component: Todolist,
    argTypes: {
        title: {
            description: 'Todo list title',
            defaultValue: 'Technologies'
        },
        filter: {
            description: 'filter value for isDone status filtration',
            defaultValue: 'all'
        },
        removeTask: {
            description: 'callback that removes task',
            defaultValue: action('task wants to be removed')
        },
        filterTasks: {
            description: 'callback that filters tasks by isDone status'
        }
    }
} as Meta

const baseArgs = {
    filterTasks: action('tasks wants to be filtered'),
    addNewTask: action('new task wants to be added'),
    changeTaskTitle: action('task wants to change its title'),
    changeTaskIsDone: action('task wants to change its isDone status'),
    removeTodolist: action('todolist wants to be removed'),
    changeTodolistTitle: action('todolist wants to change its title')
}

const Template: Story<TodolistPropsType> = (args) => <Todolist {...args}/>

export const TodolistBaseExample = Template.bind({})
TodolistBaseExample.args = {
    ...baseArgs,
    todolistId: 'todolistId1',
    tasks: [
        {
            id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
            addedDate: '', order: 0, startDate: '', deadline: '', todoListId: 'todolistId1', description: 'desc'
        },
        {
            id: v1(), title: 'JS', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
            addedDate: '', order: 0, startDate: '', deadline: '', todoListId: 'todolistId1', description: 'desc'
        },
        {
            id: v1(), title: 'Angular', status: TaskStatuses.New, priority: TaskPriorities.Middle,
            addedDate: '', order: 0, startDate: '', deadline: '', todoListId: 'todolistId1', description: 'desc'
        },
    ]
}