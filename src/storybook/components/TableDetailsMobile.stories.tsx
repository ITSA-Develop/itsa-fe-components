import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TableDetailsMobile } from '../../components/TableDetailsMobile';
import type { ITableDetailsProps } from '../../components/TableDetails';
import type { ITableDetailsColumn } from '../../interfaces';
import type { ITableDetailsData } from './TableDetails.stories';

const sampleData: ITableDetailsData[] = [
	{
		id: 1,
		name: 'John Doe',
		age: 32,
		discount: 10,
		salary: 1250,
		startDate: '2026-03-10',
		expiresAt: '2026-03-10 14:30',
		email: 'john.doe@example.com',
		description:
			'Seguro de transporte - gastos no sujetos a IVA con detalle largo para mostrar el tooltip completo.',
		status: 'active',
	},
	{
		id: 2,
		name: 'Jane Smith',
		age: 28,
		discount: 20,
		salary: 980,
		startDate: '2026-03-14',
		expiresAt: '2026-03-14 08:45',
		email: 'jane.smith@example.com',
		description:
			'Seguro de transporte - gastos gravados con IVA y texto extendido para ver el truncado y el popup.',
		status: 'inactive',
	},
	{
		id: 3,
		name: 'Bob Johnson',
		age: 45,
		discount: 30,
		salary: 1575,
		startDate: '2026-03-18',
		expiresAt: '2026-03-18 17:15',
		email: 'bob.johnson@example.com',
		description:
			'Seguro de transporte - prima neta (grava IVA) con una descripción suficientemente larga.',
		status: 'active',
	},
];

const sampleColumns: ITableDetailsColumn<ITableDetailsData>[] = [
	{
		title: 'Discount',
		dataIndex: 'discount',
		key: 'discount',
		type: 'percentage',
		maxDigits: 3,
	},
	{
		title: 'Descripción',
		dataIndex: 'description',
		key: 'description',
		mobileTitle: true,
	},
	{
		title: 'Fecha inicio',
		dataIndex: 'startDate',
		key: 'startDate',
		type: 'date',
	},
	{
		title: 'Vence',
		dataIndex: 'expiresAt',
		key: 'expiresAt',
		type: 'date',
		includeTime: true,
	},
	{
		title: 'Salary',
		dataIndex: 'salary',
		key: 'salary',
		type: 'money',
		maxDigits: 6,
		mobileTitle: true,
	},
];

const meta: Meta<typeof TableDetailsMobile> = {
	title: 'Components/TableDetailsMobile',
	component: TableDetailsMobile,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Vista mobile de TableDetails: asocia cada columna con su valor por fila para renderizar label + contenido.',
			},
		},
	},
	argTypes: {
		data: {
			control: 'object',
			description: 'Filas a renderizar.',
		},
		columns: {
			control: 'object',
			description: 'Configuración de columnas (misma estructura que TableDetails).',
		},
		rowKey: {
			control: 'text',
			description: 'Clave única por fila.',
		},
		onDelete: { table: { disable: true } },
		onChangeData: { table: { disable: true } },
	},
};

export default meta;

type Story = StoryObj<ITableDetailsProps<ITableDetailsData>>;

export const Default: Story = {
	args: {
		data: sampleData,
		columns: sampleColumns,
		rowKey: 'id',
		onDelete: () => {},
	},
	render: args => {
		const [rows, setRows] = useState<ITableDetailsData[]>(args.data);

		const handleChangeData: NonNullable<ITableDetailsProps<ITableDetailsData>['onChangeData']> = ({
			record,
			dataIndex,
			value,
		}) => {
			setRows(prev =>
				prev.map(item => (item.id === record.id ? { ...record, [dataIndex as keyof ITableDetailsData]: value } : item)),
			);
		};

		const handleDelete: ITableDetailsProps<ITableDetailsData>['onDelete'] = (_value, record) => {
			setRows(prev => prev.filter(item => item.id !== record.id));
		};

		return (
			<div style={{ maxWidth: 480, margin: '0 auto' }}>
				<TableDetailsMobile {...args} data={rows} onChangeData={handleChangeData} onDelete={handleDelete} />
			</div>
		);
	},
};

export const Empty: Story = {
	args: {
		data: [],
		columns: sampleColumns,
		rowKey: 'id',
		onDelete: () => {},
	},
	render: args => (
		<div style={{ maxWidth: 480, margin: '0 auto' }}>
			<TableDetailsMobile {...args} />
		</div>
	),
};
