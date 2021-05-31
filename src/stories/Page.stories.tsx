import React from 'react';
// @ts-ignore
import {Story, Meta} from '@storybook/react';

import {Page, PageProps} from './Page';
import * as HeaderStories from './Header.stories';

export default {
    title: 'Example/Page',
    component: Page,
} as Meta;

const Template: Story<PageProps> = (args: any) => <Page {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
    ...HeaderStories.LoggedIn.args,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
    ...HeaderStories.LoggedOut.args,
};
