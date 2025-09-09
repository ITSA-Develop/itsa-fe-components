import type { StoryObj } from '@storybook/react';
import { FilterSearchContainer } from '../../components/FilterSearchContainer/FilterSearchContainer';

const meta = {
	title: 'Components/FilterSearchContainer',
	component: FilterSearchContainer,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		handleSubmit: () => console.log('on submit'),
		reset: () => console.log('reset'),
		children: 'Inputs here',
	},
};
