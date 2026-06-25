import type { Meta, StoryObj } from '@storybook/react';
import { EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button } from 'antd';
import { Dropdown } from '../../components/Dropdown/Dropdown';

const meta: Meta<typeof Dropdown> = {
	title: 'Components/Dropdown',
	component: Dropdown,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'Wrapper del Dropdown de Ant Design; acepta las mismas props que el componente original.\n\n' +
					'El elemento disparador debe ser un único elemento que admita ref (por ejemplo `Button` de Ant Design).\n\n' +
					'👉 [Ver documentación oficial](https://ant.design/components/dropdown)',
			},
		},
	},
	argTypes: {
		placement: {
			control: { type: 'select' },
			options: [
				'bottomLeft',
				'bottomCenter',
				'bottomRight',
				'topLeft',
				'topCenter',
				'topRight',
			],
			description: 'Posición del menú respecto al disparador',
		},
		trigger: {
			control: { type: 'check' },
			options: ['click', 'hover', 'contextMenu'],
			description: 'Interacciones que abren el menú',
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

const sampleItems: MenuProps['items'] = [
	{
		key: 'edit',
		label: 'Editar',
		icon: <EditOutlined />,
		onClick: () => console.log('editar'),
	},
	{
		key: 'profile',
		label: 'Perfil',
		icon: <UserOutlined />,
		onClick: () => console.log('perfil'),
	},
	{ type: 'divider' },
	{
		key: 'delete',
		label: 'Eliminar',
		danger: true,
		icon: <DeleteOutlined />,
		onClick: () => console.log('eliminar'),
	},
];

export const Default: Story = {
	render: args => (
		<Dropdown {...args} menu={{ items: sampleItems }}>
			<Button type="primary">Pasá el mouse</Button>
		</Dropdown>
	),
	args: {
		trigger: ['hover'],
		placement: 'bottomLeft',
	},
};

export const ClickToOpen: Story = {
	render: args => (
		<Dropdown {...args} menu={{ items: sampleItems }}>
			<Button>Clic para abrir</Button>
		</Dropdown>
	),
	args: {
		trigger: ['click'],
		placement: 'bottomLeft',
	},
};

export const PlacementTop: Story = {
	render: args => (
		<Dropdown {...args} menu={{ items: sampleItems }}>
			<Button type="primary">Menú arriba</Button>
		</Dropdown>
	),
	args: {
		trigger: ['click'],
		placement: 'topCenter',
	},
};

export const DisabledItem: Story = {
	render: args => (
		<Dropdown
			{...args}
			menu={{
				items: [
					{ key: '1', label: 'Opción activa', onClick: () => console.log('1') },
					{
						key: '2',
						label: 'Opción deshabilitada',
						disabled: true,
					},
				],
			}}
		>
			<Button type="primary">Menú</Button>
		</Dropdown>
	),
	args: {
		trigger: ['click'],
		placement: 'bottomLeft',
	},
};
