import type { StoryObj } from '@storybook/react';
import { Checkbox } from '../../components/Checkbox/Checkbox';

const meta = {
	title: 'Components/Checkbox',
	component: Checkbox,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Component Checkbox usando Ant Design.\n\n👉 [Ver documentación oficial](https://ant.design/components/Checkbox)',
			},
		},
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const CheckboxDefault: Story = {
	args: {
		onChange: () => console.log('changed'),
	},
};
