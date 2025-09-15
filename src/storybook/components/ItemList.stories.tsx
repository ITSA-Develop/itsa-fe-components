import React from 'react';
import type { StoryObj } from '@storybook/react';
import { ItemList } from '../../components/ItemList';

const meta = {
	title: 'Components/ItemList',
	component: ItemList,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: 'Componente de lista simple con acción de eliminar.',
			},
		},
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: 'Elemento de ejemplo',
		description: 'Descripción del elemento',
		time: '12:00',
	},
	render: args => <ItemList {...args} onDelete={() => console.log('Eliminar elemento')} />,
};

export const WithDelete: Story = {
	args: {
		title: 'Elemento de ejemplo',
		description: 'Descripción del elemento',
		time: '12:00',
	},
	render: args => <ItemList {...args} onDelete={() => console.log('Eliminar elemento')} />,
};

export const WithArrayData: Story = {
	args: {
		title: 'Elemento de ejemplo',
		description: 'Descripción del elemento',
		time: '12:00',
	},
	render: () => (
		<div style={{ maxWidth: 480 }}>
			{['Elemento A', 'Elemento B', 'Elemento C', 'Elemento D', 'Elemento E'].map((title, idx) => (
				<ItemList
					key={idx}
					title={title}
					description={title}
					time={title}
					onDelete={() => console.log('Eliminar elemento', title)}
				/>
			))}
		</div>
	),
};
