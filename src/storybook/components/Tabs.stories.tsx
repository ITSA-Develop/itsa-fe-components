import type { StoryObj } from '@storybook/react';
import { Tabs } from '../../components/Tabs/Tabs';

const meta = {
	title: 'Components/Tabs',
	component: Tabs,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Component Tabs usando Ant Design.\n\n👉 [Ver documentación oficial](https://ant.design/components/tabs)',
			},
		},
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
	args: {
		items: [
			{ key: '1', label: 'Settings', children: <div>Content 1</div> },
			{ key: '2', label: 'Other', children: <div>Content 2</div> },
		],
	},
};
