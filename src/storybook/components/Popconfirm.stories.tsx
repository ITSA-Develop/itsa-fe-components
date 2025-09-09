import type { StoryObj } from '@storybook/react';
import { Popconfirm } from '../../components/Popconfirm/Popconfirm';

const meta = {
	title: 'Components/Popconfirm',
	component: Popconfirm,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Component Popconfirm usando Ant Design.\n\n👉 [Ver documentación oficial](https://ant.design/components/Popconfirm)',
			},
		},
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: 'Delete the task',
		description: 'Are you sure to delete this task?',
		onConfirm: () => console.log('confirm'),
		onCancel: () => console.log('cancel'),
		okText: 'Yes',
		cancelText: 'No',
		children: 'trigger!',
	},
};
