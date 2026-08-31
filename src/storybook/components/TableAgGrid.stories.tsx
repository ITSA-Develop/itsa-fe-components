import type { Meta, StoryObj } from '@storybook/react';
import { GridExample } from '../../components/TableAgGrid';

const meta: Meta<typeof GridExample> = {
	title: 'Components/TableAgGrid',
	component: GridExample,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Tabla basada en AG Grid Community con filtros de texto/número y paginación.\n\n👉 [Filtros Community](https://www.ag-grid.com/react-data-grid/filtering/)',
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div style={{ width: '100%', height: 560 }}>
			<GridExample />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Filtra desde el floating filter bajo cada columna o abriendo el popup del filtro. Year y Price usan filtro numérico; el resto, filtro de texto.',
			},
		},
	},
};
