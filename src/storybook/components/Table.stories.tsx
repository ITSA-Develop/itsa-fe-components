import React from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { Table, type ITableProps } from '../../components/Table';
import { DEFAULT_PAGINATION_CONFIG, OPTIONS_STATUS } from '../../constants';
import { useTable } from '../../hooks/useTable/useTable';
import { ITableColumnAction } from '../../types';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { Button } from '../../components/Button';
import { FilterSelect } from '../../components/FilterSelect';
import { FilterInput } from '../../components/FilterInput';
import { FilterValue, TableCurrentDataSource } from 'antd/es/table/interface';
import { ISorterTable } from '../../interfaces';
import { message } from 'antd';

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

export type ITableCreditNoteData = {
	id: number;
	observations: string;
	noteNumber: string;
	invoiceNumber: string;
	type: string;
	documentType: string;
	reason: string;
	status: string;
	issueDate: string;
	registerDate: string;
	sriStatus: string;
	sriDocumentId: string;
	discount: number;
	subtotal: number;
	total: number;
};

const creditNoteSampleData: ITableCreditNoteData[] = Array.from({ length: 20 }, (_, index) => ({
	id: index + 1,
	observations: index % 2 === 0 ? 'TEST NOTA DE DESCUENTO' : 'TEST NOTA DE CREDITO COMPLETA',
	noteNumber: `NC-${String(index + 1).padStart(6, '0')}`,
	invoiceNumber: `FAC-${String(index + 100).padStart(6, '0')}`,
	type: 'NOTA DE CREDITO',
	documentType: 'ELECTRONICO',
	reason: 'DEVOLUCION TOTAL DE FACTURA',
	status: 'ACTIVO',
	issueDate: '2026-05-20',
	registerDate: '2026-05-21',
	sriStatus: 'AUTORIZADO',
	sriDocumentId: `DOC-${index + 1}`,
	discount: 30 + index,
	subtotal: 800 + index * 12.34,
	total: 830 + index * 12.34,
}));

const creditNoteColumns: ColumnsType<ITableCreditNoteData> = [
	{ title: 'ID', dataIndex: 'id', width: 80 },
	{ title: 'Observaciones', dataIndex: 'observations', width: 220 },
	{ title: 'Número de nota', dataIndex: 'noteNumber', width: 160 },
	{ title: '# de factura', dataIndex: 'invoiceNumber', width: 150 },
	{ title: 'Tipo', dataIndex: 'type', width: 170 },
	{ title: 'Tipo de documento', dataIndex: 'documentType', width: 170 },
	{ title: 'Razón de la nota', dataIndex: 'reason', width: 220 },
	{ title: 'Estado de la nota', dataIndex: 'status', width: 150 },
	{ title: 'Fecha de emisión', dataIndex: 'issueDate', width: 150 },
	{ title: 'Fecha de registro', dataIndex: 'registerDate', width: 150 },
	{ title: 'Estado de verificación SRI', dataIndex: 'sriStatus', width: 190 },
	{ title: 'ID de documento electrónico SRI', dataIndex: 'sriDocumentId', width: 240 },
	{ title: 'Descuento', dataIndex: 'discount', width: 120 },
	{ title: 'Subtotal', dataIndex: 'subtotal', width: 120 },
	{ title: 'Total', dataIndex: 'total', width: 120 },
];

const sampleColumns: ColumnsType<ITablePersonData> = [
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
		danger: true,
		confirmDelete: {
			title: 'Confirmar eliminación',
			content: record => `¿Estás seguro de eliminar a ${record.name}?`,
			confirmLabel: 'Confirmar',
			cancelLabel: 'Cancelar',
		},
	},
];

const sampleColumnsWithActionsAndDisabled: ITableColumnAction<ITablePersonData>[] = [
	{
		key: 'edit',
		title: 'Editar el elemento actual',
		icon: <EditOutlined />,
		action: record => console.log('edit', record),
		disabled: record => record.age < 30, // Deshabilitar "Editar" si age < 30
	},
	{
		key: 'delete',
		title: 'Eliminar el elemento actual',
		icon: <DeleteOutlined />,
		action: record => console.log('delete', record),
		disabled: record => record.age >= 45, // Deshabilitar "Eliminar" si age >= 45
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
		bordered: false,
		showPagination: true,
		showColumnActions: true,
		columnActions: sampleColumnsWithActions,
		rowKey: 'id',
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

const TableWithPaginationState = () => {
	const { pagination, onChangePagination } = useTable(DEFAULT_PAGINATION_CONFIG);
	

	const handleTableChange: ITableProps<ITablePersonData>['onChange'] = (
		pagination,
		sorter,
		filters,
		extra,
	) => {
		console.log('sorter =========> =>', sorter);
		newOnChangePagination(pagination, sorter, filters, extra);
	};

	const newOnChangePagination = (
		pagination?: TablePaginationConfig,
		sorter?: ISorterTable,
		filters?: Record<string, FilterValue | null>,
		extra?: TableCurrentDataSource<ITablePersonData>,
	) => {
		console.log('sorter aaaaaaaaa =>',sorter);
		onChangePagination(pagination, sorter, filters, extra);
	};

	return (
		<div className="h-full flex flex-col gap-2 p-2">
			<div className="grid grid-cols-3 gap-1 bg-gray-250 p-2 rounded-md">
				<FilterInput
					type="text"
					defaultValue={undefined}
					placeholder="Buscar marcap"
					onSearch={() => {}}
					loading={true}
					disabled={false}
					title="Buscar marca"
				/>
				<FilterSelect
					label="Filtrar por columna"
					options={OPTIONS_STATUS}
					value={1}
					onChange={value => console.log(value)}
					disabled={false}
					placeholder="Seleccionar estado"
				/>
				<FilterInput
					type="text"
					defaultValue={undefined}
					placeholder="Buscar marcap"
					onSearch={() => {}}
					loading={true}
					disabled={false}
					title="Buscar marca"
				/>
				<FilterInput
					type="text"
					defaultValue={undefined}
					placeholder="Buscar marcap"
					onSearch={() => {}}
					loading={true}
					disabled={false}
					title="Buscar marcap"
				/>
				<FilterSelect
					label="Filtrar por columna"
					options={OPTIONS_STATUS}
					value={2}
					onChange={value => console.log(value)}
					disabled={false}
					placeholder="Seleccionar estado"
				/>
				<div className="flex items-end pb-0.5">
					<Button type="primary" label="Crear entidad" size="middle" onClick={() => {}} block={true} />
				</div>
			</div>
			<Table
				columns={sampleColumns}
				data={sampleData}
				loading={false}
				bordered={false}
				showPagination={true}
				paginationConfig={{ ...pagination, total: sampleData.length }}
				onChange={handleTableChange}
				rowKey={'id'}
				showColumnActions={true}
				columnActions={sampleColumnsWithActions}
			/>
		</div>
	);
};

const TableWithSingleSelection = () => {
	const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);

	return (
		<Table
			columns={sampleColumns}
			data={sampleData}
			loading={false}
			bordered={false}
			showPagination={false}
			rowSelection={{
				selectedRowKeys,
				hideSelectAll: false,
				onChange: keys => setSelectedRowKeys(keys),
			}}
			selectionMode="multiple"
			onChange={() => {}}
			rowKey={'id'}
		/>
	);
};

const TableWithRefreshAndHorizontalScroll = () => {
	const { pagination, onChangePagination } = useTable(DEFAULT_PAGINATION_CONFIG);
	const [loading, setLoading] = React.useState(false);

	const handleRefresh = () => {
		setLoading(true);
		window.setTimeout(() => {
			setLoading(false);
			message.success('Datos actualizados');
		}, 1200);
	};

	return (
		<div className="h-full flex flex-col gap-2 p-2">
			<div className="grid grid-cols-3 gap-1 bg-gray-250 p-2 rounded-md">
				<FilterInput
					type="text"
					defaultValue={undefined}
					placeholder="Número interno"
					onSearch={() => {}}
					loading={false}
					disabled={false}
					title="Número interno"
				/>
				<FilterInput
					type="text"
					defaultValue={undefined}
					placeholder="Número de factura"
					onSearch={() => {}}
					loading={false}
					disabled={false}
					title="Número de factura"
				/>
				<FilterSelect
					label="Estado"
					options={OPTIONS_STATUS}
					value={1}
					onChange={value => console.log(value)}
					disabled={false}
					placeholder="Todos"
				/>
			</div>
			<Table
				columns={creditNoteColumns}
				data={creditNoteSampleData}
				loading={loading}
				bordered={false}
				showPagination
				paginationConfig={{ ...pagination, total: creditNoteSampleData.length }}
				onChange={onChangePagination}
				rowKey="id"
				refreshDataFunction={handleRefresh}
				scroll={{ x: 2200, y: 'calc(100dvh - 323px)' }}
			/>
		</div>
	);
};

export const WithRefreshAndHorizontalScroll: Story = {
	render: () => (
		<div className="h-full flex flex-col">
			<TableWithRefreshAndHorizontalScroll />
		</div>
	),
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				story:
					'Tabla ancha con scroll horizontal y barra de Refrescar integrada sobre el header. Las columnas conservan sus títulos y el botón permanece visible al hacer scroll.',
			},
		},
	},
};

export const WithPaginationAndPageSizeChange: Story = {
	render: () => (
		<div className="h-full flex flex-col">
			<TableWithPaginationState />
		</div>
	),
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				story: 'Tabla con paginación habilitada que detecta cambios en el tamaño de página y navegación entre páginas.',
			},
		},
	},
};

export const WithSingleSelectionMode: Story = {
	render: () => <TableWithSingleSelection />,
	parameters: {
		docs: {
			description: {
				story:
					'Muestra la tabla usando selección única (radio). La tabla normaliza el comportamiento y solo mantiene el último elemento seleccionado.',
			},
		},
	},
};

export const WithPerItemDisabled: Story = {
	render: () => (
		<Table
			columns={sampleColumns}
			data={sampleData}
			loading={false}
			bordered={false}
			showPagination={false}
			showColumnActions={true}
			columnActions={sampleColumnsWithActionsAndDisabled}
			onChange={() => {}}
			rowKey={'id'}
		/>
	),
	parameters: {
		docs: {
			description: {
				story: 'Ejemplo donde algunos ítems del menú están deshabilitados dinámicamente en función del record.',
			},
		},
	},
};

export const WithTriggerDisabledPerRow: Story = {
	render: () => (
		<Table
			columns={sampleColumns}
			data={sampleData}
			loading={false}
			bordered={false}
			showPagination={false}
			showColumnActions={true}
			columnActions={sampleColumnsWithActions}
			getActionsTriggerDisabled={record => record.age < 30}
			onChange={() => {}}
			rowKey={'id'}
		/>
	),
	parameters: {
		docs: {
			description: {
				story: 'Deshabilita el trigger (botón de tres puntos) por fila; en este ejemplo, para age < 30.',
			},
		},
	},
};

export const WithActionsDisabledPerRow: Story = {
	render: () => (
		<Table
			columns={sampleColumns}
			data={sampleData}
			loading={false}
			bordered={false}
			showPagination={false}
			showColumnActions={true}
			columnActions={sampleColumnsWithActions}
			getActionsDisabled={record => record.age >= 50}
			onChange={() => {}}
			rowKey={'id'}
		/>
	),
	parameters: {
		docs: {
			description: {
				story: 'Deshabilita todo el Dropdown de acciones por fila; en este ejemplo, para age ≥ 50.',
			},
		},
	},
};

export const WithExpandableRows: Story = {
	render: () => (
		<Table
			columns={sampleColumns}
			data={sampleData.slice(0, 5)}
			loading={false}
			bordered={false}
			showPagination={false}
			showColumnActions={false}
			onChange={() => {}}
			rowKey="id"
			expandable={{
				expandedRowRender: record => (
					<div style={{ margin: 0, padding: '8px 0' }}>
						<p style={{ margin: 0, fontSize: 12, color: '#666' }}>
							Detalle de <strong>{record.name}</strong>: edad {record.age}, dirección {record.address}
						</p>
					</div>
				),
			}}
		/>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Filas expandibles: la prop `expandable` se reenvía a la tabla de Ant Design (por ejemplo `expandedRowRender`).',
			},
		},
	},
};
