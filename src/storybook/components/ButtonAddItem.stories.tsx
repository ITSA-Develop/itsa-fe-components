import React from 'react';
import type { StoryObj } from '@storybook/react';
import { ButtonAddItem } from '../../components/ButtonAddItem';

const meta = {
	title: 'Components/ButtonAddItem',
	component: ButtonAddItem,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: 'Botón con icono de “agregar” basado en Ant Design.',
			},
		},
	},
	argTypes: {
		label: {
			control: 'text',
			description: 'Texto del botón',
		},
		onClick: {
			action: 'clicked',
			description: 'Evento al hacer clic',
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Agregar ítem',
		onClick: () => {},
	},
	render: (args) => (
		<div className="p-4">
			<ButtonAddItem {...args} />
		</div>
	),
};


