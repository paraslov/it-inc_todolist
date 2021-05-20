import React from 'react'
import {Task, TaskPropsType} from './Task';
import {Meta, Story} from '@storybook/react';
import {action} from '@storybook/addon-actions';


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
    todolistId: 'todolist1',
    task: {id: '101', title: 'HTML', isDone: true}
}

export const TaskNotDoneBaseExample = Template.bind({})
TaskNotDoneBaseExample.args = {
    ...baseArgs,
    todolistId: 'todolist2',
    task: {id: '102', title: 'Angular', isDone: false}
}
