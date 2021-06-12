import {AddItemForm, AddItemFormPropsType} from './AddItemForm';
import {Meta, Story} from '@storybook/react';
import React from 'react';
import {action} from '@storybook/addon-actions';


export default {
    title: 'Todo List/Add Item Form',
    component: AddItemForm,
    argTypes: {
        addNewItem: {
            description: 'adding new item to the list'
        },
        label: {
            description: 'description in a couple of words of what kind of items are creating with this add item form',
            defaultValue: 'add new task'
        }
    }
} as Meta

const callback = action('Item form wants to be added')

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args}/>

export const AddItemFormBaseExample = Template.bind({})
AddItemFormBaseExample.args = {
    addNewItem: callback
}

export const AddItemFormDisabledExample = Template.bind({})
AddItemFormDisabledExample.args = {
    disabled: true,
    addNewItem: callback
}