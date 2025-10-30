import type { StoryObj } from '@storybook/react';
import type { IModule } from '../../interfaces';
import { Dashboard } from '../../components/Dashboard';
import { AGENCIES_DATA } from '../../constants/agencies';

const meta = {
	title: 'Components/Dashboard',
	component: Dashboard,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: 'Muestra la lista de módulos disponibles.',
			},
		},
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

const sampleModules: IModule[] = AGENCIES_DATA[0].modules;
// [
// 	{
// 		id: 1,
// 		name: 'Administración',
// 		icon: 'settings',
// 		entorno: 'web',
// 		submodules: [
// 			{
// 				id: 11,
// 				name: 'Usuarios',
// 				pathPadre: '/admin',
// 				path: '/admin/users',
// 				icon: 'user',
// 				url: null,
// 				groups: [],
// 				programs: [],
// 				actions: {
// 					allActions: true,
// 					read: true,
// 					create: true,
// 					update: true,
// 					delete: true,
// 				},
// 			},
// 		],
// 	},
// 	{
// 		id: 2,
// 		name: 'Reportes',
// 		icon: 'file',
// 		entorno: 'web',
// 		submodules: [],
// 	},
// ];

export const Default: Story = {
	args: {
		modules: sampleModules,
		handleNavigateProgram: () => {},
	},
};

export const Empty: Story = {
	args: {
		modules: [],
		handleNavigateProgram: () => {},
	},
	parameters: {
		docs: {
			description: {
				story: 'Sin módulos.',
			},
		},
	},
};

export const ManyModules: Story = {
	args: {
		handleNavigateProgram: () => {},
		modules: sampleModules,
	},
	parameters: {
		docs: {
			description: {
				story: 'Lista grande para ver el conteo, resaltado y expandibles.',
			},
		},
	},
};
