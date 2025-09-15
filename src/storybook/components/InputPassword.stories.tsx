import React from 'react';
import type { StoryObj } from '@storybook/react';
import { InputPassword } from '../../components/InputPassword';

const meta = {
	title: 'Components/Form/InputPassword',
	component: InputPassword,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Campo de contraseña basado en Ant Design con icono de mostrar/ocultar.\n\n👉 [Ver documentación oficial](https://ant.design/components/Input)',
			},
		},
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: 'Contraseña',
		type: 'password',
	},
};

export const WithDefaultValue: Story = {
	args: {
		defaultValue: '123456',
		type: 'password',
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		placeholder: 'Deshabilitado',
		type: 'password',
	},
};

export const WithoutVisibilityToggle: Story = {
	args: {
		placeholder: 'Sin ícono de visibilidad',
		type: 'password',
	},
};
