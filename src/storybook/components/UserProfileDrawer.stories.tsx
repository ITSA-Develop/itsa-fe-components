import type { StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { IUserInformation } from '../../interfaces';
import { UserProfileDrawer } from '../../components/UserProfileDrawer';

const meta = {
	title: 'Components/UserProfileDrawer',
	component: UserProfileDrawer,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: 'Component UserProfileDrawer',
			},
		},
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

const mockUserInformation: IUserInformation = {
	identification: '0102030405',
	identificationType: 'Cédula',
	businessLineId: 1,
	name: 'María Pérez',
	picture: '',
	email: 'maria.perez@itsa.local',
	roles: [
		{ id: 1, code: 'FO_ADMIN', name: 'Administrador Front', moduleId: 10 },
		{ id: 2, code: 'BO_USER', name: 'Usuario Back', moduleId: 20 },
	],
};

export const Default: Story = {
	args: {
		open: true,
		onClose: () => undefined,
		isLoading: false,
		currentModuleId: 10,
		userInformation: mockUserInformation,
	},
	render: (args) => {
		const [open, setOpen] = useState(true);
		return (
			<div>
				<button className="mb-3" type="button" onClick={() => setOpen(true)}>
					Abrir
				</button>
				<UserProfileDrawer {...args} open={open} onClose={() => setOpen(false)} />
			</div>
		);
	},
};

export const Loading: Story = {
	args: {
		open: true,
		onClose: () => undefined,
		isLoading: true,
		currentModuleId: 10,
		userInformation: undefined,
	},
	render: (args) => {
		const [open, setOpen] = useState(true);
		return (
			<div>
				<button className="mb-3" type="button" onClick={() => setOpen(true)}>
					Abrir
				</button>
				<UserProfileDrawer {...args} open={open} onClose={() => setOpen(false)} />
			</div>
		);
	},
};
