import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FilterInputDatePicker, FilterInputDatePickerProps } from '../../components/FilterInputDatePicker';

const meta: Meta<FilterInputDatePickerProps> = {
	title: 'components/FilterInputDatePicker',
	component: FilterInputDatePicker,
	parameters: { layout: 'padded' },
	argTypes: {
		title: { control: 'text' },
		placeholder: { control: 'text' },
		format: { control: 'text' },
		disabled: { control: 'boolean' },
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	name: 'Default',
	args: {
		title: 'Fecha',
		placeholder: 'Seleccione una fecha',
	},
	render: (args) => {
		const [value, setValue] = useState<string>('');
		return (
			<div style={{ width: 360 }}>
				<FilterInputDatePicker 
					{...args} 
					value={value}
					onChange={(date) => {
						console.log('Fecha seleccionada (formato YYYY-MM-DD):', date);
						setValue(date);
					}}
				/>
				<div style={{ marginTop: '16px', fontSize: '12px', color: '#666' }}>
					<strong>Formato por defecto:</strong> YYYY-MM-DD (ej: {value || '2025-12-23'})
				</div>
			</div>
		);
	},
};

export const WithInitialValue: Story = {
	name: 'Con valor inicial',
	render: () => {
		const [value, setValue] = useState<string>('2024-01-15');
		return (
			<div style={{ width: 360 }}>
				<FilterInputDatePicker 
					title="Fecha de inicio"
					value={value}
					onChange={(date) => {
						console.log('Fecha seleccionada:', date);
						setValue(date);
					}}
				/>
			</div>
		);
	},
};

export const CustomFormat: Story = {
	name: 'Formato personalizado',
	render: () => {
		const [value, setValue] = useState<string>('');
		return (
			<div style={{ width: 360 }}>
				<FilterInputDatePicker 
					title="Fecha de nacimiento"
					placeholder="DD/MM/YYYY"
					format="DD/MM/YYYY"
					value={value}
					onChange={(date) => {
						console.log('Fecha seleccionada:', date);
						setValue(date);
					}}
				/>
			</div>
		);
	},
};

export const Disabled: Story = {
	name: 'Deshabilitado',
	render: () => (
		<div style={{ width: 360 }}>
			<FilterInputDatePicker 
				title="Fecha"
				value="2024-01-15"
				disabled
				onChange={() => {}}
			/>
		</div>
	),
};

export const WithoutTitle: Story = {
	name: 'Sin título',
	render: () => {
		const [value, setValue] = useState<string>('');
		return (
			<div style={{ width: 360 }}>
				<FilterInputDatePicker 
					placeholder="Seleccione fecha"
					value={value}
					onChange={(date) => {
						console.log('Fecha seleccionada:', date);
						setValue(date);
					}}
				/>
			</div>
		);
	},
};

export const MultipleFilters: Story = {
	name: 'Múltiples filtros de fecha',
	render: () => {
		const [startDate, setStartDate] = useState<string>('');
		const [endDate, setEndDate] = useState<string>('');
		return (
			<div style={{ width: 360, display: 'flex', flexDirection: 'column', gap: '16px' }}>
				<FilterInputDatePicker 
					title="Fecha desde"
					placeholder="Fecha de inicio"
					value={startDate}
					onChange={(date) => {
						console.log('Fecha inicio:', date);
						setStartDate(date);
					}}
				/>
				<FilterInputDatePicker 
					title="Fecha hasta"
					placeholder="Fecha de fin"
					value={endDate}
					onChange={(date) => {
						console.log('Fecha fin:', date);
						setEndDate(date);
					}}
				/>
			</div>
		);
	},
};
