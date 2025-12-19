import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TableDetails, type ITableColumn, ITableDetailsProps } from '../../components/TableDetails';

export type ITableDetailsData = {
	id: number;
	name: string;
	age: number;
	discount: number;
	email: string;
	status: 'active' | 'inactive';
};

const sampleData: ITableDetailsData[] = [
	{
		id: 1,
		name: 'John Doe',
		age: 32,
		discount: 10,
		email: 'john.doe@example.com',
		status: 'active',
	},
	{
		id: 2,
		name: 'Jane Smith',
		age: 28,
		discount: 20,
		email: 'jane.smith@example.com',
		status: 'inactive',
	},
	{
		id: 3,
		name: 'Bob Johnson',
		age: 45,
		discount: 30,
		email: 'bob.johnson@example.com',
		status: 'active',
	},
];

const sampleColumns: ITableColumn<ITableDetailsData>[] = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		type: 'text',
	},
	{
		title: 'Age',
		dataIndex: 'age',
		key: 'age',
		type: 'number',
	},
	{
		title: 'Discount',
		dataIndex: 'discount',
		key: 'discount',
		type: 'percentage',
	},
	{
		title: 'Email',
		dataIndex: 'email',
		key: 'email',
		type: 'text',
	},
	{
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
		type: 'select',
		options: [
			{ label: 'Activo', value: 'active' },
			{ label: 'Inactivo', value: 'inactive' },
		],
	},
];

const meta: Meta<typeof TableDetails> = {
	title: 'Components/TableDetails',
	component: TableDetails,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: 'Componente TableDetails basado en Ant Design Table para mostrar detalles en formato de tabla.',
			},
		},
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<ITableDetailsProps<ITableDetailsData>>;

export const Default: Story = {
	render: args => {
		const [rows, setRows] = useState<ITableDetailsData[]>(args.data);

		const handleChangeData: NonNullable<ITableDetailsProps<ITableDetailsData>['onChangeData']> = ({
			record,
			dataIndex,
			value,
		}) => {
			setRows(prev =>
				prev.map(item => (item.id === record.id ? { ...item, [dataIndex as keyof ITableDetailsData]: value } : item)),
			);
		};

		const handleDelete = (record: ITableDetailsData) => {
			setRows(prev => prev.filter(item => item.id !== record.id));
		};

		return (
			<div>
				<TableDetails
					{...args}
					data={rows}
					onDelete={handleDelete}
					onChangeData={handleChangeData}
				/>
			</div>
		);
	},
	args: {
		data: sampleData,
		columns: sampleColumns,
	},
};

export const WithData: Story = {
	render: args => {
		const [rows, setRows] = useState<ITableDetailsData[]>(args.data);
        console.log('rows =>',rows);

		const handleChangeData = ({
			record,
			dataIndex,
			value,
		}) => {
			setRows(prev =>
				prev.map(item => (item.id === record.id ? { ...item, [dataIndex as keyof ITableDetailsData]: value } : item)),
			);
		};

		const handleDelete = (record: ITableDetailsData) => {
			setRows(prev => prev.filter(item => item.id !== record.id));
		};

		return (
			<div>
				<TableDetails
					{...args}
					data={rows}
					onDelete={handleDelete}
					onChangeData={handleChangeData}
				/>
			</div>
		);
	},
	args: {
		data: sampleData,
		columns: sampleColumns,
	},
	parameters: {
		docs: {
			description: {
				story: 'Ejemplo básico del componente TableDetails con columnas de texto y select.',
			},
		},
	},
};

