import React, { type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Button } from '../../components/Button';
import {
	TableMobileTypeCollapse,
	type ITableMobileTypeCollapseProps,
} from '../../components/TableMobileTypeCollapse/TableMobileTypeCollapse';
import type { ITableColumnAction, TStrictTableColumnsType } from '../../types';

type PersonRow = {
	id: number;
	name: string;
	age: number;
	address: string;
	phone: ReactNode;
};

const columns: TStrictTableColumnsType<PersonRow> = [
	{ title: 'Nombre', key: 'name', dataIndex: 'name' },
	{ title: 'Edad', key: 'age', dataIndex: 'age' },
	{ title: 'Dirección', key: 'address', dataIndex: 'address' },
	{
		title: 'Teléfono',
		key: 'phone',
		dataIndex: 'phone',
		render: value => <Input size="small" readOnly value={String(value ?? '')} className="w-full" />,
	},
];

const sampleData: PersonRow[] = [
	{ id: 1, name: 'Jim Green', age: 32, address: 'New York No. 1 Lake Park', phone: '+57 317 890 1234' },
	{ id: 2, name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park', phone: '+57 318 111 2222' },
	{ id: 3, name: 'John Smith', age: 45, address: 'New York No. 5 West Street', phone: '+57 319 333 4444' },
];

const columnActions: ITableColumnAction<PersonRow>[] = [
	{
		key: 'edit',
		title: 'Editar',
		icon: <EditOutlined />,
		action: record => console.log('edit', record),
	},
	{
		key: 'delete',
		title: 'Eliminar',
		icon: <DeleteOutlined />,
		action: record => console.log('delete', record),
		danger: true,
		confirmDelete: {
			title: 'Confirmar eliminación',
			content: record => `¿Eliminar a ${record.name}?`,
			confirmLabel: 'Confirmar',
			cancelLabel: 'Cancelar',
		},
	},
];

const meta: Meta<ITableMobileTypeCollapseProps<PersonRow>> = {
	title: 'Components/TableMobileTypeCollapse',
	component: TableMobileTypeCollapse as React.ComponentType<ITableMobileTypeCollapseProps<PersonRow>>,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Vista móvil con collapse: encabezado con los dos primeros campos, detalle con el resto (soporta column.render).',
			},
		},
	},
};

export default meta;

type Story = StoryObj<ITableMobileTypeCollapseProps<PersonRow>>;

const StoryWrapper = (args: ITableMobileTypeCollapseProps<PersonRow>) => (
	<div style={{ maxWidth: 480, margin: '0 auto' }}>
		<TableMobileTypeCollapse {...args} />
	</div>
);

export const Default: Story = {
	args: {
		columns,
		data: sampleData,
		showColumnActions: true,
		columnActions,
	},
	render: StoryWrapper,
};

export const WithRenderInput: Story = {
	args: {
		columns,
		data: sampleData,
		showColumnActions: true,
		columnActions,
	},
	parameters: {
		docs: {
			description: {
				story:
					'La columna Teléfono usa `render` con un `Input`. Expande una fila para ver el control en el detalle.',
			},
		},
	},
	render: StoryWrapper,
};

export const Empty: Story = {
	args: {
		columns,
		data: [],
	},
	render: StoryWrapper,
};

type VehicleModelRow = {
	id: number;
	itemCode: string;
	itemDescription: string;
	itemSuffix: string;
};

const vehicleModelColumns: TStrictTableColumnsType<VehicleModelRow> = [
	{ title: 'Código del modelo', dataIndex: 'itemCode', key: 'itemCode' },
	{ title: 'Descripción del modelo', dataIndex: 'itemDescription', key: 'itemDescription' },
	{ title: 'Sufijo', dataIndex: 'itemSuffix', key: 'itemSuffix' },
	{
		title: 'Acciones',
		dataIndex: 'id',
		key: 'actions',
		render: (_value: unknown, record: VehicleModelRow) => (
			<Button size="small" type="text" label="Seleccionar" onClick={() => console.log('select', record)} />
		),
	},
];

const vehicleModelData: VehicleModelRow[] = [
	{
		id: 1,
		itemCode: 'A251LA',
		itemDescription: 'TEST CREACION DE VEHICULO EXONERADO',
		itemSuffix: 'TME',
	},
	{
		id: 2,
		itemCode: 'LC250',
		itemDescription: 'LAND CRUISER PRADO 250 AC 2.4 5P 4X4 TM',
		itemSuffix: 'GMLF',
	},
];

export const WithInlineActionsColumn: StoryObj<ITableMobileTypeCollapseProps<VehicleModelRow>> = {
	args: {
		columns: vehicleModelColumns,
		data: vehicleModelData,
	},
	parameters: {
		docs: {
			description: {
				story:
					'Columnas con `key: "actions"` y `render` personalizado (ej. botón Seleccionar) se muestran en el detalle del collapse.',
			},
		},
	},
	render: (args: ITableMobileTypeCollapseProps<VehicleModelRow>) => (
		<div style={{ maxWidth: 480, margin: '0 auto' }}>
			<TableMobileTypeCollapse {...args} />
		</div>
	),
};
