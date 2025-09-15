import type { Meta, StoryObj } from '@storybook/react';
import { Select, type ISelectProps } from '../../components/Select';

const sampleOptions = [
	{ label: 'Apple', value: 'apple' },
	{ label: 'Banana', value: 'banana' },
	{ label: 'Cherry', value: 'cherry' },
	{ label: 'Date', value: 'date' },
	{ label: 'Elderberry', value: 'elderberry' },
	{ label: 'Fig', value: 'fig' },
	{ label: 'Grape', value: 'grape' },
];

const meta: Meta<ISelectProps> = {
	title: 'Components/Select',
	component: Select,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Componente Select simple basado en Ant Design. Incluye la opción de búsqueda en los items.\n\n👉 [Ver documentación oficial de Ant Design](https://ant.design/components/select)',
			},
		},
	},
	argTypes: {
		showSearch: {
			control: 'boolean',
			description: 'Habilita la barra de búsqueda',
		},
		options: {
			control: 'object',
			description: 'Lista de opciones del selector',
		},
		placeholder: {
			control: 'text',
			description: 'Texto de ayuda',
		},
		allowClear: {
			control: 'boolean',
			description: 'Muestra el botón para limpiar la selección',
		},
		mode: {
			control: 'text',
			description: 'Modo del selector (e.g., multiple, tags)',
		},
	},
	args: {
		options: sampleOptions,
		placeholder: 'Seleccione una opción',
		allowClear: true,
		showSearch: true,
		filterOption: (input, option) =>
			((option?.label as string) ?? '').toLowerCase().includes(input.toLowerCase()),
		style: { width: '100%' },
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Searchable: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Select con búsqueda habilitada para filtrar opciones por texto.',
			},
		},
	},
};

export const MultipleWithSearch: Story = {
	args: {
		mode: 'multiple',
		placeholder: 'Seleccione una o varias opciones',
	},
	parameters: {
		docs: {
			description: {
				story: 'Select en modo múltiple con búsqueda de opciones.',
			},
		},
	},
};


