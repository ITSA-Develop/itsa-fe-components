import type { StoryObj } from '@storybook/react';
import { Switch } from '../../components/Switch/Switch';

const meta = {
	title: 'Components/Form/Switch',
	component: Switch,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Component Switch usando Ant Design.\n\n👉 [Ver documentación oficial](https://ant.design/components/Switch)',
			},
		},
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
