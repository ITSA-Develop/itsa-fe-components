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
	{ key: '1', label: 'Datos personales', children: <TabsItemContent width='100%' title='Datos personales'>Datos personales</TabsItemContent> },
	{ key: '2', label: 'Correo electrónico', children: <TabsItemContent title='Correo electrónico'>Correo electrónico</TabsItemContent> },
	{ key: '3', label: 'Teléfonos', children: <TabsItemContent title='Teléfonos principales'>Teléfonos</TabsItemContent> },
	{ key: '4', label: 'Dirección', children: <TabsItemContent title='Dirección'>Dirección</TabsItemContent> },
	{ key: '5', label: 'Contactos', children: <TabsItemContent>Contactos</TabsItemContent> },
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
