import type { StoryObj } from '@storybook/react';
import { Tooltip } from '../../components/Tooltip/Tooltip';

const meta = {
	title: 'Components/Tooltip',
	component: Tooltip,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Component Tooltip usando Ant Design.\n\n👉 [Ver documentación oficial](https://ant.design/components/Tooltip)',
			},
		},
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: 'prompt text',
		children: 'Tooltip will show on mouse enter.',
	},
};
