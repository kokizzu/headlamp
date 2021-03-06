import minusCircle from '@iconify/icons-mdi/plus-circle';
import { Icon } from '@iconify/react';
import IconButton from '@material-ui/core/IconButton';
import { Meta, Story } from '@storybook/react/types-6-0';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import TooltipIcon, { TooltipIconProps } from './TooltipIcon';

export default {
  title: 'Tooltip/TooltipIcon',
  component: TooltipIcon,
} as Meta;

const Template: Story<TooltipIconProps> = args => <TooltipIcon {...args} />;

export const JustText = Template.bind({});
JustText.args = {
  children: 'This is the text',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  children: 'Some other text',
  icon: minusCircle,
};
