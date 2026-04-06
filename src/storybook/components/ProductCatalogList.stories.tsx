import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
	ProductCatalogList,
	type IProductCatalogListItem,
	type IProductCatalogListProps,
} from '../../components/ProductCatalogList';

const sampleItems: IProductCatalogListItem[] = [
	{
		code: 'ITEM LPH',
		brandName: 'BRANDPRUEBA',
		productCode: 'LPH-1',
		numericCode: 'LPH-1',
		description: 'ITEM LPH CON INF. LOGISTICA',
		status: 'Activo',
		countryOriginName: 'FIYI',
		itemClassName: 'CLASE PARA LPH 1',
		itemSubclassName: 'SUBCLASE LPH 1',
		serialization: 'No serializado',
		suffix: 'TTT',
	},
	{
		code: 'ITEM LOG 2',
		brandName: 'BRAND UNO',
		productCode: 'LPH-2',
		numericCode: 'LPH-2',
		description: 'ITEM DE PRUEBA PARA OPERACION LOGISTICA',
		status: 'Activo',
		countryOriginName: 'ECUADOR',
		itemClassName: 'CLASE GENERAL',
		itemSubclassName: 'SUBCLASE GENERAL',
		serialization: 'Serializado',
		suffix: 'ABC',
	},
	{
		code: 'ITEM INSUMO',
		brandName: 'BRAND DOS',
		productCode: 'LPH-3',
		numericCode: 'LPH-300',
		description: 'ITEM PARA CONTROL DE INVENTARIO INTERNO',
		status: 'Inactivo',
		countryOriginName: 'PERU',
		itemClassName: 'CLASE FARMACIA',
		itemSubclassName: 'SUBCLASE INSUMOS',
		serialization: 'No serializado',
		suffix: 'XYZ',
	},
	{
		code: 'ITEM HOSP',
		brandName: 'BRAND TRES',
		productCode: 'LPH-4',
		numericCode: 'LPH-400',
		description: 'ITEM COMPLEMENTARIO CON DATOS DE ORIGEN',
		status: 'Activo',
		countryOriginName: 'COLOMBIA',
		itemClassName: 'CLASE HOSPITALARIA',
		itemSubclassName: 'SUBCLASE MATERIAL',
		serialization: 'Serializado',
		suffix: 'LMN',
	},
];

const meta: Meta<typeof ProductCatalogList> = {
	title: 'Components/ProductCatalogList',
	component: ProductCatalogList,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Listado de items en tarjetas con informacion operativa relevante. Usa los botones institucionales de la libreria y mantiene el tema claro.',
			},
		},
	},
	argTypes: {
		viewLabel: {
			control: 'text',
			description: 'Texto del botón secundario de visualización.',
		},
		addLabel: {
			control: 'text',
			description: 'Texto del botón principal para agregar.',
		},
		emptyMessage: {
			control: 'text',
			description: 'Mensaje mostrado cuando no existen items.',
		},
	},
	args: {
		items: sampleItems,
		viewLabel: 'Ver',
		addLabel: 'Agregar',
		emptyMessage: 'No hay items disponibles',
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
	render: args => {
		const storyArgs = args as IProductCatalogListProps;

		return (
			<div className="mx-auto max-w-6xl">
				<ProductCatalogList
					{...storyArgs}
					onViewItem={item => console.log('Ver item', item)}
					onAddItem={item => console.log('Agregar item', item)}
				/>
			</div>
		);
	},
};

export const EmptyState: Story = {
	args: {
		items: [],
	},
	render: args => {
		const storyArgs = args as IProductCatalogListProps;

		return (
			<div className="mx-auto max-w-6xl">
				<ProductCatalogList {...storyArgs} />
			</div>
		);
	},
};
