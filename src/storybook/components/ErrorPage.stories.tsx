import type { StoryObj } from '@storybook/react';
import { ErrorPage } from '../../components/ErrorPage/ErrorPage';

const meta = {
	title: 'Components/ErrorPage',
	component: ErrorPage,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ErrorPage404: Story = {
	args: {
		error: '404',
		message: 'Not Found',
		handleClick: () => console.log('click'),
	},
};
