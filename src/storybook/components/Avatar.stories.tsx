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
	argTypes: {
		size: {
			control: 'select',
			options: ['small', 'default', 'large'],
			description: 'Tamaño del avatar',
		},
		name: {
			control: 'text',
			description: 'Nombre para generar las iniciales del avatar',
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const AvatarSmall: Story = {
	args: {
		size: 'small',
		name: 'John Doe',
	},
};

export const AvatarMedium: Story = {
	args: {
		size: 'default',
		name: 'John Doe',
	},
};

export const AvatarLarge: Story = {
	args: {
		size: 'large',
		name: 'John Doe',
	},
};
