import type { StoryObj } from '@storybook/react';
import { Alert } from '../../components/Alert/Alert';

const meta = {
	title: 'Components/Alert',
	component: Alert,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Component Alert usando Ant Design.\n\n👉 [Ver documentación oficial](https://ant.design/components/Alert)',
			},
		},
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const AlertSuccess: Story = {
	args: {
		message: 'some successful message',
		type: 'success',
	},
};
