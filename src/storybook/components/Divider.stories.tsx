import type { StoryObj } from '@storybook/react';
import { Divider } from '../../components/Divider/Divider';

const meta = {
	title: 'Components/Divider',
	component: Divider,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Component Divider usando Ant Design.\n\n👉 [Ver documentación oficial](https://ant.design/components/Divider)',
			},
		},
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DividerDefault: Story = {
	args: {},
};
