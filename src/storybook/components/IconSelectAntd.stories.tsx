import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { IconSelectAntd, type IconSelectAntdProps } from '../../components/IconSelectAntd';
import { ICON_OPTIONS } from '../../constants/iconOptions';

const meta: Meta<IconSelectAntdProps> = {
	title: 'Components/IconSelectAntd',
	component: IconSelectAntd,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: 'Selector de íconos basado en Ant Design con filtro y selección.',
			},
		},
	},
	argTypes: {
		placeholder: { control: 'text', description: 'Texto del placeholder' },
		allowClear: { control: 'boolean', description: 'Permite limpiar la selección' },
        className: { control: 'text', description: 'Clase CSS para el componente' },
	},
	args: {
		options: ICON_OPTIONS,
		placeholder: 'Buscar icono...',
		allowClear: true,
        className: 'w-full',
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
	render: args => {
		const [selected, setSelected] = useState<string | null>(null);
		const selectedOpt = ICON_OPTIONS.find(o => o.label === selected);
		return (
			<div className="space-y-3">
				<IconSelectAntd
					{...args}
					value={selected}
					onChange={opt => setSelected(opt?.label ?? null)}
				/>
				<div className="text-sm text-gray-600">
					Seleccionado: <b>{selected ?? '—'}</b>
				</div>
				{selectedOpt ? (
					<div className="flex items-center gap-2">
						<span className="text-gray-500 text-sm">Vista previa:</span>
						<span className="text-xl">{selectedOpt.value}</span>
					</div>
				) : null}
			</div>
		);
	},
};



