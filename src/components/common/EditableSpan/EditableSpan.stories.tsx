import React from 'react'
import {EditableSpan, EditableSpanPropsType} from './EditableSpan';
import {Meta, Story} from '@storybook/react';
import {action} from '@storybook/addon-actions';


export default {
    title: 'Todo List/Editable Span',
    component: EditableSpan,
    argTypes: {
        onChange: {
            description: 'editable span wants to change it\'s title'
        },
        title: {
            description: 'editable span start title',
            defaultValue: 'ReactJS'
        }
    }
} as Meta

const onChangeCallback = action('span wants to changes')

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args}/>

export const EditableSpanBaseExample = Template.bind({})
EditableSpanBaseExample.args = {
    onChange: onChangeCallback
}