import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Title, type ITitle } from '../../components/Title';

const meta: Meta<ITitle> = {
	title: 'Components/Title',
	component: Title,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Título tipográfico basado en Typography.Title de Ant Design. Útil para jerarquizar encabezados en páginas y secciones.\n\n👉 Ver documentación de Ant Design: https://ant.design/components/typography',
			},
		},
	},
	argTypes: {
		title: {
			control: 'text',
			description: 'Texto del título a mostrar',
		},
		level: {
			control: { type: 'radio' },
			options: [1, 2, 3, 4, 5],
			description: 'Nivel del encabezado (1-5)',
		},
	},
	args: {
		title: 'Título de ejemplo',
		level: 1,
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Level1: Story = {
	args: { level: 1, title: 'Título nivel 1' },
	parameters: {
		docs: { description: { story: 'Encabezado principal, uso para títulos de página.' } },
	},
};

export const Level2: Story = {
	args: { level: 2, title: 'Título nivel 2' },
	parameters: {
		docs: { description: { story: 'Subtítulo de sección principal.' } },
	},
};

export const Level3: Story = {
	args: { level: 3, title: 'Título nivel 3' },
	parameters: {
		docs: { description: { story: 'Subsección o encabezado terciario.' } },
	},
};

export const Level4: Story = {
	args: { level: 4, title: 'Título nivel 4', type: 'secondary' },
	parameters: {
		docs: { description: { story: 'Encabezado con estilo tenue (gris). secondary es el color por defecto.' } },
	},
};

export const Level5: Story = {
	args: { level: 5, title: 'Título nivel 5' },
	parameters: {
		docs: { description: { story: 'Encabezado pequeño con estilo tenue (gris).' } },
	},
};


