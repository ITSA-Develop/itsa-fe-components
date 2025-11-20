
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormSelectorDebounce } from '../../components/FormSelectorDebounce';

const mockUsers = [
	{ id: 1, name: 'Alice Johnson' },
	{ id: 2, name: 'Bob Smith' },
	{ id: 3, name: 'Charlie Brown' },
	{ id: 4, name: 'Diana Prince' },
	{ id: 5, name: 'Evan Miller' },
	{ id: 6, name: 'Fiona Gallagher' },
	{ id: 7, name: 'George Lucas' },
	{ id: 8, name: 'Hannah Baker' },
	{ id: 9, name: 'Ian McKellen' },
	{ id: 10, name: 'Julia Roberts' },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const mockFetchUsers = async (search: string) => {
	await delay(600);
	const term = search.trim().toLowerCase();
	const filtered = term
		? mockUsers.filter(u => u.name.toLowerCase().includes(term))
		: mockUsers.slice(0, 6);

	return filtered.map(u => ({
		label: u.name,
		value: u.id,
		avatar: `https://i.pravatar.cc/64?u=${u.id}`,
	}));
};

const meta: Meta<typeof FormSelectorDebounce> = {
	title: 'components/Form/FormSelectorDebounce',
	component: FormSelectorDebounce,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Selector con búsqueda remota con debounce. Provee opciones asíncronas vía la prop `fetchOptions` y muestra un spinner mientras carga.',
			},
		},
	},
	argTypes: {
		mode: {
			control: 'text',
			description: 'Modo del selector: "multiple" o "tags".',
		},
		placeholder: {
			control: 'text',
			description: 'Texto de ayuda para la búsqueda.',
		},
	},
	args: {
		fetchOptions: mockFetchUsers,
		placeholder: 'Buscar usuarios...',
	},
};

export default meta;
type Story = StoryObj<typeof meta>;



export const Multiple: Story = {
	name: 'Múltiple selección',
	args: {
		mode: 'multiple',
		placeholder: 'Buscar y seleccionar múltiples usuarios',
		fetchOptions: mockFetchUsers,
	},
	render: args => (
		<div style={{ width: 480 }}>
			<FormSelectorDebounce fetchOptions={mockFetchUsers} {...args} />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Permite seleccionar varias opciones con búsqueda remota.',
			},
		},
	},
};


