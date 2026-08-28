import type { StoryObj } from '@storybook/react';
import { NotificationsList } from '../../components/NotificationsList';

const meta = {
	title: 'Components/NotificationsList',
	component: NotificationsList,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: 'Componente para listar notificaciones del usuario.',
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => <NotificationsList />,
};
