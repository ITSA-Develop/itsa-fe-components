import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Iconos, type IconosProps } from '../../components/IconSelector';
import { ICON_OPTIONS } from '../../constants/iconOptions';

const meta: Meta<IconosProps> = {
	title: 'Components/Iconos',
	component: Iconos,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: 'Selector simple de íconos con búsqueda por nombre.',
			},
		},
	},
	argTypes: {
		columns: { control: 'number', description: 'Cantidad de columnas en el grid' },
		placeholder: { control: 'text', description: 'Texto del filtro' },
	},
	args: {
		options: ICON_OPTIONS,
		columns: 6,
		placeholder: 'Buscar icono...',
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
	render: args => {
		const [selected, setSelected] = useState<string | null>(null);
		return (
			<div className="space-y-3">
				<Iconos
					{...args}
					value={selected}
					onChange={opt => setSelected(opt?.label ?? null)}
				/>
				<div className="text-sm text-gray-600">
					Seleccionado: <b>{selected ?? '—'}</b>
				</div>
			</div>
		);
	},
};


