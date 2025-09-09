import type { StoryObj } from '@storybook/react';
import { ActionPanel } from '../../components/ActionPanel/ActionPanel';

const meta = {
	title: 'Components/ActionPanel',
	component: ActionPanel,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		items: [
			{
				key: '1',
				label: 'Editar',
				onClick: () => console.log('Editar'),
			},
			{
				key: '2',
				label: 'Duplicar',
				onClick: () => console.log('Duplicar'),
			},
			{
				type: 'divider',
			},
			{
				key: '3',
				label: <span style={{ color: 'red' }}>Eliminar</span>,
				onClick: () => console.log('Eliminar'),
			},
		],
	},
};
