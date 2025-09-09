import type { StoryObj } from '@storybook/react';
import { Avatar } from '../../components/Avatar/Avatar';

const meta = {
	title: 'Components/Avatar',
	component: Avatar,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Component Avatar usando Ant Design.\n\n👉 [Ver documentación oficial](https://ant.design/components/Avatar)',
			},
		},
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const AvatarLarge: Story = {
	args: {
		size: 'large',
		name: 'John Doe',
	},
};
