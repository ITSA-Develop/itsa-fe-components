import type { StoryObj } from '@storybook/react';
import type { IModule } from '../../interfaces';
import { Dashboard } from '../../components/Dashboard';

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

const sampleModules: IModule[] = [
	{
		id: 1,
		name: 'Administración',
		path: '/admin',
		icon: 'settings',
		entorno: 'web',
		submodules: [
			{
				id: 11,
				name: 'Usuarios',
				pathPadre: '/admin',
				path: '/admin/users',
				icon: 'user',
				url: null,
				groups: [],
				programs: [],
				actions: {
					allActions: 15,
					read: 1,
					create: 2,
					update: 4,
					delete: 8,
				},
			},
		],
	},
	{
		id: 2,
		name: 'Reportes',
		path: '/reports',
		icon: 'file',
		entorno: 'web',
		submodules: [],
	},
];

export const Default: Story = {
	args: {
		modules: sampleModules,
	},
};

export const Empty: Story = {
	args: {
		modules: [],
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
        modules: [
            ...sampleModules,
            {
                id: 3,
                name: 'Configuración',
                path: '/settings',
                icon: 'settings',
                entorno: 'web',
                submodules: [
                    { id: 31, name: 'Preferencias', pathPadre: '/settings', path: '/settings/prefs', icon: 'settings', url: null, groups: [], programs: [], actions: { allActions: 0, read: 0, create: 0, update: 0, delete: 0 } },
                    { id: 32, name: 'Seguridad', pathPadre: '/settings', path: '/settings/security', icon: 'lock', url: null, groups: [], programs: [], actions: { allActions: 0, read: 0, create: 0, update: 0, delete: 0 } },
                ],
            },
            {
                id: 4,
                name: 'Usuarios',
                path: '/users',
                icon: 'user',
                entorno: 'web',
                submodules: [
                    { id: 41, name: 'Listado', pathPadre: '/users', path: '/users/list', icon: 'list', url: null, groups: [], programs: [], actions: { allActions: 0, read: 0, create: 0, update: 0, delete: 0 } },
                    { id: 42, name: 'Permisos', pathPadre: '/users', path: '/users/perms', icon: 'shield', url: null, groups: [], programs: [], actions: { allActions: 0, read: 0, create: 0, update: 0, delete: 0 } },
                ],
            },
        ],
    },
    parameters: {
        docs: {
            description: {
                story: 'Lista grande para ver el conteo, resaltado y expandibles.',
            },
        },
    },
};


