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
		handleClick: () => console.log('click'),
	},
};
