import type { StoryObj } from '@storybook/react';
import { Progress } from '../../components/Progress/Progress';

const meta = {
	title: 'Components/Progress',
	component: Progress,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Component Progress usando Ant Design.\n\n👉 [Ver documentación oficial](https://ant.design/components/progress)',
			},
		},
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		percent: 40,
	},
};
