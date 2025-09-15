import React from 'react';
import type { StoryObj } from '@storybook/react';
import { Button } from '../../components/Button';

const meta = {
	title: 'Components/Button',
	component: Button,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Component Button usando Ant Design.\n\n👉 [Ver documentación oficial](https://ant.design/components/Button)',
			},
		},
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['small', 'middle', 'large'],
			description: 'Tamaño del botón',
		},
		type: {
			control: 'select',
			options: ['primary', 'secondary'],
			description: 'Estilo del botón',
		},
		default: {
			control: 'boolean',
			description: 'Solo aplica en type="secondary". Usa gris #595959',
		},
		title: {
			control: 'text',
			description: 'Contenido del botón',
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const AllSizes: Story = {
	args: {
		label: 'Button',
		type: 'primary',
	},
	render: (args) => {
		const sizes: Array<'small' | 'middle' | 'large'> = ['small', 'middle', 'large'];
		return (
			<div className="flex flex-col max-w-1/4 gap-4 p-4">
				{sizes.map(size => (
					<Button key={size} width={30} {...args} size={size} label={size.charAt(0).toUpperCase() + size.slice(1)} />
				))}
				{sizes.map(size => (
					<Button
						key={size}
						{...args}
						size={size}
						label={size.charAt(0).toUpperCase() + size.slice(1)}
						type="secondary"
						width={30}
					/>
				))}
				{sizes.map(size => (
					<Button
						key={size}
						{...args}
						size={size}
						label={size.charAt(0).toUpperCase() + size.slice(1)}
						type="primary"
						disabled={true}
						width={20}
					/>
				))}
				{sizes.map(size => (
					<Button
						key={size}
						{...args}
						size={size}
						label={size.charAt(0).toUpperCase() + size.slice(1)}
						type="secondary"
						default={true}
						width={30}
					/>
				))}
			</div>
		);
	},
};

