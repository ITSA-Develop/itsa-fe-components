import type { StoryObj } from '@storybook/react';
import { Button } from '../../components/Button/Button';

const meta = {
	title: 'Components/Button',
	component: Button,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Component Button usando Ant Design.\n\n👉 [Ver documentación oficial](https://ant.design/components/Button)',
			},
		},
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ButtonSolid: Story = {
	args: {
		children: 'primary',
		type: 'primary',
	},
};
