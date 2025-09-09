import type { StoryObj } from '@storybook/react';
import { Footer } from '../../components/Footer/Footer';

const meta = {
	title: 'Components/Footer',
	component: Footer,
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
		version: 'v1',
		text: 'Some disclaimer',
	},
};
