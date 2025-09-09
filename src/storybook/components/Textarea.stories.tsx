import type { StoryObj } from '@storybook/react';
import { Textarea } from '../../components/Textarea/Textarea';

const meta = {
	title: 'Components/Form/Textarea',
	component: Textarea,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Component Textarea usando Ant Design.\n\n👉 [Ver documentación oficial](https://ant.design/components/Input)',
			},
		},
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		rows: 4,
	},
};
