import React, { useEffect } from 'react';
import type { StoryObj } from '@storybook/react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../../components/AppLayout';
import { AGENCIES_DATA } from '../../constants/agencies';
import { useEncrypt } from '../../hooks/useEncrypt/useEncrypt';
import { useAppLayoutStore } from '../../store/appLayout.store';

const OPTIONS_COMPANY = [
	{ value: '1', label: 'IMPORTADORA TOMEBAMBA' },
	{ value: '2', label: 'MOTOR UNO' },
	{ value: '3', label: 'ITSA' },
];

const USER_ACTIONS_ITEMS = [
	{ key: 'profile', label: 'Mi perfil' },
	{ key: 'settings', label: 'Configuración' },
	{ key: 'logout', label: 'Cerrar sesión', danger: true },
];

const NOTIFICATIONS_ITEMS = [
	{ key: '1', label: 'Nueva solicitud pendiente de aprobación' },
	{ key: '2', label: 'Actualización del sistema disponible' },
	{ key: '3', label: 'Recordatorio: cierre de inventario' },
];

const withAppLayoutData = (Story: React.ComponentType, context: object) => {
	const AppLayoutStory = () => {
		const { encryptKey } = useEncrypt();
		const {
			setAgencies,
			setModulesAgency,
			setCurrentAgency,
			setCurrentModule,
			setCurrentSubmodule,
			setCurrentCompany,
			setCurrentSubAgency,
			setUserName,
			setUserRole,
		} = useAppLayoutStore();

		useEffect(() => {
			const agency = AGENCIES_DATA[0];
			const module = agency?.modules[0];
			const submodule = module?.submodules?.[0];

			setAgencies(AGENCIES_DATA);

			if (agency) {
				setCurrentAgency(agency, encryptKey);
				setCurrentSubAgency(agency, encryptKey);
				setModulesAgency(agency.modules);
			}

			if (module) {
				setCurrentModule(module, encryptKey);
			}

			if (submodule) {
				setCurrentSubmodule(submodule, encryptKey);
			}

			setCurrentCompany(OPTIONS_COMPANY[0], encryptKey);
			setUserName('John Doe');
			setUserRole({
				id: 1,
				code: 'ADMIN',
				name: 'Administrador',
				moduleId: module?.id ?? 1,
			});
		}, [
			encryptKey,
			setAgencies,
			setCurrentAgency,
			setCurrentModule,
			setCurrentSubmodule,
			setCurrentCompany,
			setCurrentSubAgency,
			setModulesAgency,
			setUserName,
			setUserRole,
		]);

		return <Story {...context} />;
	};

	return <AppLayoutStory />;
};

const meta = {
	title: 'Components/AppLayout',
	component: AppLayout,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: 'Componente de layout principal de la aplicación.',
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: <div>Hello World</div>,
		navigateApp: () => {},
		loadingAppLayout: false,
		onClickOptionMenu: () => {},
		showMultiCompanySelector: true,
		optionsCompany: [],
		accessDenied: false,
	},
};

export const WithData: Story = {
	decorators: [withAppLayoutData],
	render: args => {
		const navigate = useNavigate();

		return (
			<AppLayout
				{...args}
				navigateApp={navigate}
				optionsCompany={OPTIONS_COMPANY}
				userActions={{ items: USER_ACTIONS_ITEMS }}
				notifications={{ items: NOTIFICATIONS_ITEMS }}
			/>
		);
	},
	args: {
		children: (
			<div className="rounded-lg border border-gray-200 bg-white p-6">
				<h2 className="mb-2 text-lg font-semibold text-primary-700">Contenido principal</h2>
				<p className="text-gray-600">
					Layout con datos de ejemplo: empresas, módulos, agencia, usuario, rol, menú lateral y acciones del header.
				</p>
			</div>
		),
		navigateApp: () => {},
		loadingAppLayout: false,
		onClickOptionMenu: info => {
			console.log('Menú seleccionado:', info);
		},
		showMultiCompanySelector: true,
		optionsCompany: OPTIONS_COMPANY,
		accessDenied: false,
	},
	parameters: {
		docs: {
			description: {
				story:
					'AppLayout precargado con agencias, módulo activo, empresa seleccionada, usuario, rol y menús de acciones/notificaciones.',
			},
		},
	},
};
