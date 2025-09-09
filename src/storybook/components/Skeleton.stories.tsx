import type { StoryObj } from '@storybook/react';
import { Skeleton } from '../../components/Skeleton/Skeleton';

const meta = {
	title: 'Components/Skeleton',
	component: Skeleton,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Component Skeleton usando Ant Design.\n\n👉 [Ver documentación oficial](https://ant.design/components/Skeleton)',
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
