import React, { type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input, Tag } from 'antd';
import { TableMobile, type ITableMobileProps } from '../../components/TableMobile/TableMobile';
import type { TStrictTableColumnsType } from '../../types';

type PersonRow = {
	id: number;
	name: string;
	age: number;
	address: string;
	phone: ReactNode;
};

const personColumns: TStrictTableColumnsType<PersonRow> = [
	{ title: 'Nombre de preueba', key: 'name', dataIndex: 'name' },
	{ title: 'Edad', key: 'age', dataIndex: 'age' },
	{ title: 'Dirección', key: 'address', dataIndex: 'address' },
	{ title: 'Telefono', key: 'phone', dataIndex: 'phone', },
];

const personSampleData: PersonRow[] = [
	{ id: 1, name: 'Jim Green data de prueba extensa', age: 32, address: 'New York No. 1 Lake Park', phone: '+57 317 890 1234' },
	{ id: 2, name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park', phone: '+57 317 890 1234' },
	{ id: 3, name: 'John Smith', age: 45, address: 'New York No. 5 West Street', phone: <Input value="+57 317 890 1234" /> },
];

const meta: Meta<ITableMobileProps<PersonRow>> = {
	title: 'Components/TableMobile',
	component: TableMobile as React.ComponentType<ITableMobileProps<PersonRow>>,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Vista tipo tabla para móvil: columnas (`TStrictTableColumnsType`) y filas (`data`), alineadas con el componente `Table`.',
			},
		},
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<ITableMobileProps<PersonRow>>;

export const Default: Story = {
	args: {
		columns: personColumns,
		data: personSampleData,
	},
	render: (args: ITableMobileProps<PersonRow>) => (
		<div style={{ maxWidth: 480, margin: '0 auto' }}>
			<TableMobile {...args} />
		</div>
	),
};

export const Empty: Story = {
	args: {
		columns: personColumns,
		data: [],
		emptyContent: <p className="text-center text-gray-500">No hay datos para mostrar.</p>,
	},
	render: (args: ITableMobileProps<PersonRow>) => (
		<div style={{ maxWidth: 480, margin: '0 auto' }}>
			<TableMobile {...args} />
		</div>
	),
};

type ClientRow = {
	id: number;
	client: string;
	status: ReactNode;
	balance: ReactNode;
};

const clientColumns: TStrictTableColumnsType<ClientRow> = [
	{ title: 'Cliente', key: 'client', dataIndex: 'client' },
	{ title: 'Estado', key: 'status', dataIndex: 'status' },
	{ title: 'Saldo', key: 'balance', dataIndex: 'balance' },
];

const clientSampleData: ClientRow[] = [
	{
		id: 1,
		client: 'ACME S.A.',
		status: <Tag color="success">Activo</Tag>,
		balance: <span className="font-mono">$ 1.250,00</span>,
	},
	{
		id: 2,
		client: 'Beta Ltda.',
		status: <Tag color="warning">Pendiente</Tag>,
		balance: <span className="font-mono">$ 0,00</span>,
	},
];

export const WithCustomValues: StoryObj<ITableMobileProps<ClientRow>> = {
	render: () => (
		<div style={{ maxWidth: 480, margin: '0 auto' }}>
			<TableMobile<ClientRow> columns={clientColumns} data={clientSampleData} />
		</div>
	),
};
