import type { StoryObj } from '@storybook/react';
import { LoadingApp } from '../../components/LoadingApp';

const meta = {
	title: 'Components/LoadingApp',
	component: LoadingApp,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Overlay de carga a pantalla completa con spinner y título opcional.',
			},
		},
	},
	argTypes: {
		title: {
			control: 'text',
			description: 'Título opcional mostrado debajo del spinner',
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const WithTitle: Story = {
	args: {
		title: 'Cargando módulos…',
	},
};


