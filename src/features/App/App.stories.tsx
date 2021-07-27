import React from 'react'
import App from './App'
import {Meta, Story} from '@storybook/react'
import {
    HashRouterDecorator,
    ReduxStoreProviderDecorator
} from '../../utils/ReduxStoreProviderDecorator'


export default {
    title: 'App',
    component: App,
    decorators: [ReduxStoreProviderDecorator, HashRouterDecorator]
} as Meta

const Template: Story = (args) => <App {...args}/>

export const AppBaseExample = Template.bind({})
AppBaseExample.args = {
    demo: true
}