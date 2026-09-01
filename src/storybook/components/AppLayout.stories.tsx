import React, { useEffect } from 'react';
import type { StoryObj } from '@storybook/react';
import { AppLayout } from '../../components/AppLayoutRefactor';
import { useAppLayoutStore } from '../../components/AppLayoutRefactor/components/store/useAppLayoutStore';
import { PERMISSIONS_MOCK } from '../../components/AppLayoutRefactor/mocks/permissions.mock';
import { IProgram } from '../../interfaces';

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

const defaultArgs = {
	optionsCompany: [
		{
			label: 'Empresa 1',
			value: '1',
		},
		{
			label: 'Empresa 2',
			value: '2',
		},
		{
			label: 'Empresa 3',
			value: '3',
		},
	],
	notifications: [],
	loadingAppLayout: false,
	children: <div>Hello World</div>,
	appNavigate: () => {},
	menuItemsNavigate: (program: IProgram) => {
		console.log('menuItemsNavigate', program);
	},
};

const withPermissions = (Story: React.ComponentType) => {
	const setPermissions = useAppLayoutStore(state => state.setPermissions);

	useEffect(() => {
		setPermissions(PERMISSIONS_MOCK);
	}, [setPermissions]);

	return <Story />;
};

export const Default: Story = {
	args: defaultArgs,
};

export const WithExampleData: Story = {
	name: 'Con data de ejemplo',
	decorators: [withPermissions],
	args: defaultArgs,
	parameters: {
		docs: {
			description: {
				story: 'Carga PERMISSIONS_MOCK en el store (`permissions`). Agencia CUENCA con subagencias MATRIZ y CAPULISPAMBA.',
			},
		},
	},
};
