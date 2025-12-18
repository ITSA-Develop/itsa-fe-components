import React from 'react';
import type { StoryObj } from '@storybook/react';
import { TabsMaintenance } from '../../components/TabsMaintenance';
import { ITabsMaintenanceItem } from '../../interfaces';
import { ITabsItemContent, TabsItemContent } from '../../components/TabsItemContent';

const meta = {
	title: 'Components/TabsMaintenance',
	component: TabsMaintenance,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: 'Ejemplo de Tabs con Ant Design para mantenimiento interno.',
			},
		},
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

const items: ITabsMaintenanceItem[] = [
	{
		key: '1',
		label: 'Datos personales',
		children: <TabsItemContent>Datos personales</TabsItemContent>,
	},
	{
		key: '2',
		label: 'Correo electrónico',
		children: <TabsItemContent maxWidth="100%">Correo electrónico</TabsItemContent>,
	},
	{ key: '3', label: 'Teléfonos', children: <TabsItemContent maxWidth="100%">Teléfonos</TabsItemContent> },
	{ key: '4', label: 'Dirección', children: <TabsItemContent maxWidth="100%">Dirección</TabsItemContent> },
	{ key: '5', label: 'Contactos', children: <TabsItemContent maxWidth="100%">Contactos</TabsItemContent> },
];

export const Default: Story = {
	args: {
		defaultActiveKey: '1',
		items,
		onChange: (key: string) => {
			console.log(key);
		},
	},
	render: args => (
		<TabsMaintenance items={args.items} onChange={args.onChange} defaultActiveKey={args.defaultActiveKey} />
	),
};
