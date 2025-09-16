import React from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { Table, type ITableProps } from '../../components/Table';
import { DEFAULT_PAGINATION_CONFIG } from '../../constants';
import { useTable } from '../../hooks/useTable/useTable';
import { ITableColumnAction, TStrictTableColumnsType } from '../../types';

export type ITablePersonData = {
	id: number;
	name: string;
	age: number;
	address: string;
};

export const sampleData: ITablePersonData[] = [
	{
		id: 1,
		name: 'Jim Green',
		age: 32,
		address: 'New York No. 1 Lake Park',
	},
	{
		id: 2,
		name: 'Jim Greens',
		age: 42,
		address: 'London No. 1 Lake Park',
	},
	{
		id: 3,
		name: 'Joe Black',
		age: 32,
		address: 'Sydney No. 1 Lake Park',
	},
	{
		id: 4,
		name: 'Jim Red',
		age: 28,
		address: 'London No. 2 Lake Park',
	},
	{
		id: 5,
		name: 'John Smith',
		age: 45,
		address: 'New York No. 5 West Street',
	},
	{
		id: 6,
		name: 'Joe White',
		age: 25,
		address: 'Sydney No. 3 East Road',
	},
	{
		id: 7,
		name: 'Jim Blue',
		age: 38,
		address: 'London No. 4 North Avenue',
	},
	{
		id: 8,
		name: 'John Wilson',
		age: 50,
		address: 'New York No. 7 South Lane',
	},
	{
		id: 9,
		name: 'Mike Johnson',
		age: 35,
		address: 'Chicago No. 10 Main St',
	},
	{
		id: 10,
		name: 'Sarah Davis',
		age: 29,
		address: 'Boston No. 15 Oak Ave',
	},
	{
		id: 11,
		name: 'Tom Miller',
		age: 41,
		address: 'Miami No. 20 Beach Blvd',
	},
	{
		id: 12,
		name: 'Lisa Garcia',
		age: 33,
		address: 'Seattle No. 25 Pine St',
	},
	{
		id: 13,
		name: 'David Rodriguez',
		age: 47,
		address: 'Denver No. 30 Mountain Rd',
	},
	{
		id: 14,
		name: 'Emily Taylor',
		age: 26,
		address: 'Portland No. 35 River Way',
	},
	{
		id: 15,
		name: 'Chris Martinez',
		age: 39,
		address: 'Atlanta No. 40 Peach St',
	},
];

const sampleColumns: TStrictTableColumnsType<ITablePersonData> = [
	{
		title: 'Name',
		dataIndex: 'name',
		sorter: (a, b) => a.name.localeCompare(b.name),
		filters: [
			{
				text: 'John',
				value: 'John',
			},
			{
				text: 'Jim',
				value: 'Jim',
			},
			{
				text: 'Joe',
				value: 'Joe',
			},
		],
		onFilter: (value, record) => record.name.includes(value as string),
		filterSearch: true,
	},
	{
		title: 'Age',
		dataIndex: 'age',
		sorter: (a, b) => a.age - b.age,
		filters: [
			{
				text: '≥ 40',
				value: '40+',
			},
			{
				text: '30-39',
				value: '30-39',
			},
			{
				text: '< 30',
				value: '30-',
			},
		],
		onFilter: (value, record) => {
			if (value === '40+') return record.age >= 40;
			if (value === '30-39') return record.age >= 30 && record.age < 40;
			if (value === '30-') return record.age < 30;
			return true;
		},
	},
	{
		title: 'Address',
		dataIndex: 'address',
		sorter: (a, b) => a.address.localeCompare(b.address),
		filters: [
			{
				text: 'New York',
				value: 'New York',
			},
			{
				text: 'London',
				value: 'London',
			},
			{
				text: 'Sydney',
				value: 'Sydney',
			},
		],
		onFilter: (value, record) => record.address.includes(value as string),
		filterSearch: true,
	},
];

const sampleColumnsWithActions: ITableColumnAction<ITablePersonData>[] = [
	{
		key: 'edit',
		title: 'Editar el elemento actual',
		icon: <EditOutlined />,
		action: record => console.log('edit', record),
	},
	{
		key: 'delete',
		title: 'Eliminar el elemento actual',
		icon: <DeleteOutlined />,
		action: record => console.log('delete', record),
	},
];

const meta: Meta<ITableProps<ITablePersonData>> = {
	title: 'Components/Table',
	component: Table,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Componente Table simple basado en Ant Design con funcionalidades básicas de selección de filas y bordes.\n\n👉 [Ver documentación oficial de Ant Design](https://ant.design/components/table)',
			},
		},
	},
	argTypes: {
		loading: {
			control: 'boolean',
			description: 'Muestra un indicador de carga',
		},
		bordered: {
			control: 'boolean',
			description: 'Agrega bordes a la tabla',
		},
		rowSelection: {
			control: 'object',
			description: 'Configuración de selección de filas',
		},
		data: {
			control: 'object',
			description: 'Datos de la tabla',
		},
	},
	args: {
		columns: sampleColumns,
		data: sampleData,
		loading: false,
		bordered: true,
		showPagination: true,
		showColumnActions: true,
		columnActions: sampleColumnsWithActions,
		rowKey: 'id',
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

const TableWithPaginationState = () => {
	const { pagination, filters, sorter, onChangePagination } = useTable(DEFAULT_PAGINATION_CONFIG);

	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-col gap-2 border-1 border-gray-500 rounded-md">
				<span>Current Page: {pagination.current}</span>
				<span>Page Size: {pagination.pageSize}</span>
				<span>Filtered Data: {JSON.stringify(filters)}</span>
				<span>Sorter: {JSON.stringify(sorter)}</span>
			</div>
			<Table
				columns={sampleColumns}
				data={sampleData}
				loading={false}
				bordered={true}
				showPagination={true}
				paginationConfig={{ ...pagination, total: 200 }}
				onChange={onChangePagination}
				rowKey={'id'}
				showColumnActions={true}
				columnActions={sampleColumnsWithActions}
			/>
		</div>
	);
};

export const WithPaginationAndPageSizeChange: Story = {
	render: () => <TableWithPaginationState />,
	parameters: {
		docs: {
			description: {
				story: 'Tabla con paginación habilitada que detecta cambios en el tamaño de página y navegación entre páginas.',
			},
		},
	},
};
