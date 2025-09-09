import type { StoryObj } from '@storybook/react';
import { Card } from '../../components/Card/Card';

const meta = {
	title: 'Components/Card',
	component: Card,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Component Card usando Ant Design.\n\n👉 [Ver documentación oficial](https://ant.design/components/Card)',
			},
		},
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const CardDefault: Story = {
	args: {
		children: 'simple card',
	},
};
