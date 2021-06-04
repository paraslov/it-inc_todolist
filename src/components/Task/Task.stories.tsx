import React from 'react'
import {Task, TaskPropsType} from './Task';
import {Meta, Story} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {TaskPriorities, TaskStatuses} from '../../api/tasks_api';


export default {
    title: 'Todo List/Task',
    component: Task
} as Meta

const changeTaskIsDoneCallback = action('Task isDone wants to changes')
const changeTaskTitleCallback = action('Task title wants to changes')
const removeTaskCallback = action('Task wants to be removed')

const baseArgs = {
    changeTaskIsDone: changeTaskIsDoneCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback,
}

const Template: Story<TaskPropsType> = (args) => <Task {...args}/>

export const TaskDoneBaseExample = Template.bind({})
TaskDoneBaseExample.args = {
    ...baseArgs,
    task: {
        id: '101', title: 'HTML', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
        addedDate: '', order: 0, startDate: '', deadline: '', todoListId: 'todolist1', description: 'desc'
    }
}

export const TaskNotDoneBaseExample = Template.bind({})
TaskNotDoneBaseExample.args = {
    ...baseArgs,
    task: {
        id: '102', title: 'Angular', status: TaskStatuses.New, priority: TaskPriorities.Middle,
        addedDate: '', order: 0, startDate: '', deadline: '', todoListId: 'todolist2', description: 'desc'
    }
}
