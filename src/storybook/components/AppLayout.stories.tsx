import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { AppLayout } from '../../components/AppLayout/AppLayout';
import { useAppLayoutStore } from '../../store/appLayout.store';
import { AGENCIES_DATA } from '../../constants/agencies';
import { IAgency } from '../../interfaces';
import { TExtendedMenuItem } from '../../types';
import { useCustomNavigation } from '../../hooks/useCustomNavigation';

// Mock data para las agencias y módulos
const mockAgencies: IAgency[] = AGENCIES_DATA;

const mockNotifications = {
	items: [
		{
			key: '1',
			label: 'Nueva notificación',
			icon: 'BellOutlined',
		},
		{
			key: '2',
			label: 'Mensaje importante',
			icon: 'ExclamationCircleOutlined',
		},
	],
};

const mockUserActions = {
	items: [
		{
			key: 'profile',
			label: 'Mi Perfil',
			icon: 'UserOutlined',
		},
		{
			key: 'settings',
			label: 'Configuración',
			icon: 'SettingOutlined',
		},
		{
			type: 'divider' as const,
		},
		{
			key: 'logout',
			label: 'Cerrar Sesión',
			icon: 'LogoutOutlined',
			danger: true,
		},
	],
};

// Componente wrapper para inicializar el store con datos mock
const AppLayoutWithMockData = (args: any) => {
	const { navigateRoute } = useCustomNavigation();
	const { setAgencies, setModulesAgency, setCurrentAgency, setUserName, setUserRole } = useAppLayoutStore();
	const agency = useAppLayoutStore(state => state.currentAgency);

	useEffect(() => {
		console.log('agency =>', agency);
	}, [agency]);


	useEffect(() => {
		// Inicializar datos mock
		setAgencies(mockAgencies);
		setModulesAgency(mockAgencies[0].modules);
		setCurrentAgency(mockAgencies[0]);
		setUserName('Juan Pérez');
		setUserRole('Administrador');
	}, [setAgencies, setModulesAgency, setCurrentAgency, setUserName, setUserRole]);

	const onClickOptionMenu = (key: string, item: TExtendedMenuItem) => {
		const itemMenu = item.data;

		if(itemMenu){
			navigateRoute({ path: itemMenu.path ?? '' });
		}
	};

	return (
		<div style={{ height: '100vh', width: '100vw' }}>
			<AppLayout {...args} onClickOptionMenu={ (info: { key: string; item: TExtendedMenuItem }) => onClickOptionMenu(info.key, info.item)} >
				<div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100%' }}>
					<h1>Contenido Principal gg</h1>
					<p>Este es el contenido principal de la aplicación dentro del AppLayout.</p>
					<div style={{ background: 'white', padding: '16px', borderRadius: '8px', marginTop: '16px' }}>
						<h2>Ejemplo de Contenido</h2>
						<p>Aquí puedes colocar cualquier contenido que necesites mostrar en tu aplicación.</p>
						<ul>
							<li>Dashboard principal</li>
							<li>Formularios</li>
							<li>Tablas de datos</li>
							<li>Gráficos y reportes</li>
						</ul>
					</div>
				</div>
			</AppLayout>
		</div>
	);
};

const meta: Meta<typeof AppLayout> = {
    title: 'Components/AppLayout',
    component: AppLayout,
    tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Componente principal de layout de la aplicación que incluye header, sidebar y área de contenido principal.',
			},
		},
	},
	argTypes: {
		loading: {
			control: 'boolean',
			description: 'Estado de carga del layout',
		},
		currentPath: {
			control: 'text',
			description: 'Ruta actual de la aplicación',
		},
		widthSidebar: {
			control: { type: 'range', min: 200, max: 400, step: 10 },
			description: 'Ancho del sidebar en píxeles',
		},
		modeSidebar: {
			control: 'select',
			options: ['inline', 'vertical', 'horizontal'],
			description: 'Modo de visualización del menú del sidebar',
		},
		logo: {
			control: 'text',
			description: 'URL del logo de la aplicación',
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: args => <AppLayoutWithMockData {...args} />,
	args: {
		loading: false,
		currentPath: '/dashboard',
		widthSidebar: 280,
		modeSidebar: 'inline',
		notifications: mockNotifications,
		userActions: mockUserActions,
		logo: '',
	},
};

// export const Loading: Story = {
// 	args: {
// 		...Default.args,
// 		loading: true,
// 	},
// };

export const VerticalMenu: Story = {
    render: args => <AppLayoutWithMockData {...args} />,
	args: {
		...Default.args,
		modeSidebar: 'vertical',
	},
};

// export const NarrowSidebar: Story = {
// 	args: {
// 		...Default.args,
// 		widthSidebar: 220,
// 	},
// };

// export const WideSidebar: Story = {
// 	args: {
// 		...Default.args,
// 		widthSidebar: 350,
// 	},
// };

// export const WithoutLogo: Story = {
// 	args: {
// 		...Default.args,
// 		logo: '',
// 	},
// };

// export const DifferentPath: Story = {
// 	args: {
// 		...Default.args,
// 		currentPath: '/users/permissions',
// 	},
// };

// export const MinimalNotifications: Story = {
// 	args: {
// 		...Default.args,
// 		notifications: { items: [] },
// 	},
// };

// export const MinimalUserActions: Story = {
// 	args: {
// 		...Default.args,
// 		userActions: { items: [] },
// 	},
// };
