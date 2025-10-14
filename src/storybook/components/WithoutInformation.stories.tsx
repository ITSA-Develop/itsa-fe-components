import React from 'react';
import type { StoryObj } from '@storybook/react';
import { WithoutInformation } from '../../components/WithoutInformation';

const meta = {
	title: 'Components/WithoutInformation',
	component: WithoutInformation,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Componente para mostrar estado vacío/ausencia de datos, centrado vertical y horizontalmente dentro de su contenedor.',
			},
		},
	},
	argTypes: {
		title: { control: 'text', description: 'Texto del mensaje' },
		color: { control: 'color', description: 'Color del ícono' },
	},
	decorators: [
		(Story: any) => (
			<div className="w-full h-96 border border-dashed border-gray-300 bg-gray-50 p-4">
				<Story />
			</div>
		),
	],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: 'Sin información',
	},
};

export const CustomTitle: Story = {
	args: {
		title: 'No hay datos disponibles',
	},
};

export const CustomColor: Story = {
	args: {
		title: 'Sin información',
		color: '#00000073',
	},
};


