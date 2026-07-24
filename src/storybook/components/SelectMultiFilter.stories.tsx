import React, { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IDataTypesSelectMultiFilter, IFiltersSelectMultiFilter, SelectMultiFilterProps } from '../../interfaces';
import { SelectMultiFilter } from '../../components/SelectMultiFilter';


const sampleData: IDataTypesSelectMultiFilter[] = [
	{ code: '001', description: 'Producto alimenticio', value: 'ALM-001' },
	{ code: '002', description: 'Producto de limpieza', value: 'LIM-002' },
	{ code: '003', description: 'Producto electrónico', value: 'ELE-003' },
	{ code: '004', description: 'Producto textil', value: 'TEX-004' },
	{ code: '005', description: 'Producto farmacéutico', value: 'FAR-005' },
	{ code: '006', description: 'Producto de oficina', value: 'OFI-006' },
];

const filterData = (
	data: IDataTypesSelectMultiFilter[],
	filters: IFiltersSelectMultiFilter,
	options: {
		showFilterCode?: boolean;
		showFilterDescription?: boolean;
		showFilterValue?: boolean;
	} = {},
) => {
	const {
		showFilterCode = true,
		showFilterDescription = true,
		showFilterValue = false,
	} = options;

	return data.filter(item => {
		const codeMatch =
			!showFilterCode ||
			item.code.toLowerCase().includes(filters.code.toLowerCase());
		const descriptionMatch =
			!showFilterDescription ||
			item.description
				.toLowerCase()
				.includes(filters.description.toLowerCase());
		const valueMatch =
			!showFilterValue ||
			item.value.toLowerCase().includes(filters.value.toLowerCase());

		return codeMatch && descriptionMatch && valueMatch;
	});
};

const SelectMultiFilterDemo = ({
	data = sampleData,
	loading = false,
	initialValue = null,
	showFilterCode = true,
	showFilterDescription = true,
	showFilterValue = false,
	...rest
}: Omit<SelectMultiFilterProps, 'data' | 'loading' | 'value' | 'onFiltersChange' | 'onSelect'> & {
	data?: IDataTypesSelectMultiFilter[];
	loading?: boolean;
	initialValue?: IDataTypesSelectMultiFilter | null;
}) => {
	const [filters, setFilters] = useState<IFiltersSelectMultiFilter>({
		code: '',
		description: '',
		value: '',
	});
	const [selected, setSelected] = useState<IDataTypesSelectMultiFilter | null>(initialValue);

	const filteredData = useMemo(
		() =>
			filterData(data, filters, {
				showFilterCode,
				showFilterDescription,
				showFilterValue,
			}),
		[data, filters, showFilterCode, showFilterDescription, showFilterValue],
	);

	return (
		<div style={{ width: 480, minHeight: 320 }}>
			<SelectMultiFilter
				{...rest}
				data={filteredData}
				loading={loading}
				value={selected}
				showFilterCode={showFilterCode}
				showFilterDescription={showFilterDescription}
				showFilterValue={showFilterValue}
				onFiltersChange={setFilters}
				onSelect={(item: IDataTypesSelectMultiFilter) => {
					setSelected(item);
					console.log('Registro seleccionado:', item);
				}}
				onClear={() => {
					setSelected(null);
					console.log('Selección limpiada');
				}}
			/>
			<div style={{ marginTop: 24, padding: 12, backgroundColor: '#f5f5f5', borderRadius: 4, fontSize: 12 }}>
				<div><strong>Filtros:</strong> {JSON.stringify(filters)}</div>
				<div style={{ marginTop: 4 }}>
					<strong>Seleccionado:</strong> {selected ? `${selected.code} - ${selected.description}` : 'Ninguno'}
				</div>
			</div>
		</div>
	);
};

const meta: Meta<typeof SelectMultiFilter> = {
	title: 'components/SelectMultiFilter',
	component: SelectMultiFilter,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Selector con panel desplegable y filtros opcionales (código, descripción y valor). El filtrado de datos se realiza externamente mediante onFiltersChange.',
			},
		},
	},
	argTypes: {
		loading: { control: 'boolean' },
		showFilterCode: { control: 'boolean' },
		showFilterDescription: { control: 'boolean' },
		showFilterValue: { control: 'boolean' },
		showColumnValue: { control: 'boolean' },
		allowClear: { control: 'boolean' },
		filtersDebounceMs: { control: 'number' },
		labelInputCode: { control: 'text' },
		labelInputDescription: { control: 'text' },
		labelInputName: { control: 'text' },
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	name: 'Default',
	render: args => <SelectMultiFilterDemo {...args} />,
};

export const WithInitialValue: Story = {
	name: 'Con valor inicial',
	render: args => (
		<SelectMultiFilterDemo
			{...args}
			initialValue={sampleData[2]}
		/>
	),
};

export const Loading: Story = {
	name: 'Cargando',
	render: args => <SelectMultiFilterDemo {...args} loading data={[]} />,
};

export const EmptyResults: Story = {
	name: 'Sin resultados',
	render: args => <SelectMultiFilterDemo {...args} data={[]} />,
};

export const CustomLabels: Story = {
	name: 'Etiquetas personalizadas',
	render: args => (
		<SelectMultiFilterDemo
			{...args}
			labelInputCode="SKU"
			placeholderInputCode="Buscar por SKU"
			labelInputDescription="Nombre"
			placeholderInputDescription="Buscar por nombre"
			labelInputName="Referencia"
			placeholderInputName="Buscar por referencia"
		/>
	),
};

export const WithValueFilter: Story = {
	name: 'Con filtro y columna de valor',
	render: args => (
		<SelectMultiFilterDemo
			{...args}
			showFilterValue
			showColumnValue
		/>
	),
};

export const CodeFilterOnly: Story = {
	name: 'Solo filtro por código',
	render: args => (
		<SelectMultiFilterDemo
			{...args}
			showFilterDescription={false}
			showFilterValue={false}
		/>
	),
};

export const ClearableWithDebounce: Story = {
	name: 'Limpiar selección + debounce',
	args: {
		filtersDebounceMs: 500,
	},
	parameters: {
		docs: {
			description: {
				story:
					'Selecciona un registro y usa el ícono "x" para limpiarlo. Al escribir en los filtros, el texto se actualiza al instante, pero onFiltersChange solo se dispara 500ms después de dejar de escribir (abre la consola para verlo).',
			},
		},
	},
	render: args => (
		<SelectMultiFilterDemo
			{...args}
			initialValue={sampleData[1]}
		/>
	),
};
