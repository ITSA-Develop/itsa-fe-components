import type { StoryObj } from '@storybook/react';
import { DropdownCustomLabel } from '../../components/DropdownCustomLabel';
import { SettingOutlined } from '@ant-design/icons';

const meta = {
	title: 'Components/DropdownCustomLabel',
	component: DropdownCustomLabel,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Component DropdownCustomLabel - Dropdown personalizado con etiqueta',
			},
		},
	},
	argTypes: {
		emptyLabel: {
			control: 'text',
			description: 'Label que se muestra cuando no hay opciones',
		},
		defaultValue: {
			control: 'text',
			description: 'Valor por defecto seleccionado',
		},
		loading: {
			control: 'boolean',
			description: 'Estado de carga',
		},
		hiddenLabelForWidthWindows: {
			control: 'boolean',
			description: 'Ocultar label en ventanas grandes',
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

const sampleItems = {
	items: [
		{
			key: '1',
			label: 'Módulo de Ventas',
			onClick: () => console.log('Módulo de Ventas clicked'),
		},
		{
			key: '2',
			label: 'Módulo de Inventario',
			onClick: () => console.log('Módulo de Inventario clicked'),
		},
		{
			key: '3',
			label: 'Módulo de Contabilidad',
			onClick: () => console.log('Módulo de Contabilidad clicked'),
		},
		{
			key: '4',
			label: 'Módulo de Recursos Humanos',
			onClick: () => console.log('Módulo de RRHH clicked'),
		},
	],
};

export const Default: Story = {
	args: {
		emptyLabel: 'Sin módulos asignados',
		defaultValue: '2',
		itemOptions: sampleItems,
		loading: false,
		icon: <SettingOutlined className="text-white-100 w-4 h-4" />,
		hiddenLabelForWidthWindows: true,
	},
};

export const WithoutItems: Story = {
	args: {
		emptyLabel: 'Sin módulos asignados',
		itemOptions: { items: [] },
		loading: false,
		icon: <SettingOutlined className="text-white-100 w-4 h-4" />,
		hiddenLabelForWidthWindows: true,
	},
};

export const Loading: Story = {
	args: {
		emptyLabel: 'Sin módulos asignados',
		itemOptions: sampleItems,
		loading: true,
		icon: <SettingOutlined className="text-white-100 w-4 h-4" />,
		hiddenLabelForWidthWindows: true,
	},
};

export const MobileView: Story = {
	args: {
		emptyLabel: 'Sin módulos asignados',
		defaultValue: '1',
		itemOptions: sampleItems,
		loading: false,
		icon: <SettingOutlined className="text-white-100 w-4 h-4" />,
		hiddenLabelForWidthWindows: true,
	},
	parameters: {
		viewport: {
			defaultViewport: 'mobile1',
		},
	},
};
