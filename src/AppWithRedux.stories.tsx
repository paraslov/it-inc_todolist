import React from 'react'
import AppWithRedux from './AppWithRedux';
import {Meta, Story} from '@storybook/react';
import {ReduxStoreProviderDecorator} from './utils/ReduxStoreProviderDecorator/ReduxStoreProviderDecorator';


export default {
    title: 'Todo List/App With Redux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as Meta

const Template: Story = (args) => <AppWithRedux {...args}/>

export const AppBaseExample = Template.bind({})