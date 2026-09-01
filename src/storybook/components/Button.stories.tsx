import React from 'react';
import type { StoryObj } from '@storybook/react';
import { Button, type TButtonColor, type TButtonType } from '../../components/Button';

const meta = {
	title: 'Components/Button',
	component: Button,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Component Button usando Ant Design.\n\nUsa `color` para seleccionar la paleta pastel (`primary`, `danger`, `warning`, `success`, `info`). Para confirmaciones verdes: `color="success"` o `type="success"`.\n\n👉 [Ver documentación oficial](https://ant.design/components/Button)',
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
			options: [
				'primary',
				'secondary',
				'default',
				'dashed',
				'text',
				'link',
				'submit',
				'danger',
				'warning',
				'success',
				'info',
			],
			description: 'Apariencia del botón o alias de color semántico',
		},
		color: {
			control: 'select',
			options: ['primary', 'danger', 'warning', 'success', 'info'],
			description: 'Paleta pastel semántica',
		},
		danger: {
			control: 'boolean',
			description: 'Alias compatible con Ant Design para color="danger"',
		},
		default: {
			control: 'boolean',
			description: 'Solo aplica en type="secondary". Usa gris #595959',
		},
		label: {
			control: 'text',
			description: 'Contenido del botón',
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
	args: {
		label: 'Confirmar',
		type: 'primary',
		color: 'success',
		size: 'middle',
	},
	parameters: {
		docs: {
			description: {
				story:
					'Usa el control `color` para aplicar la paleta pastel (primary, danger, warning, success, info). También puedes usar `type="success"` como atajo sin enviar `color`.',
			},
		},
	},
};

export const ConfirmActions: Story = {
	render: () => (
		<div className="flex flex-col gap-6 p-6">
			<div className="flex flex-wrap items-center gap-2">
				<Button type="secondary" label="Cancelar" onClick={() => console.log('cancel')} />
				<Button type="primary" color="success" label="Confirmar" onClick={() => console.log('confirm')} />
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Button type="secondary" label="Cancelar" onClick={() => console.log('cancel')} />
				<Button type="success" label="Confirmar" onClick={() => console.log('confirm')} />
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Button type="secondary" default label="No" onClick={() => console.log('no')} />
				<Button type="primary" color="success" label="Guardar cambios" onClick={() => console.log('save')} />
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Ejemplo de acciones de confirmación. Para el botón verde usa `color="success"` con cualquier `type`, o el atajo `type="success"`.',
			},
		},
	},
};

export const SemanticTypeShortcuts: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-2 p-6">
			<Button type="danger" label="Eliminar" onClick={() => console.log('danger')} />
			<Button type="warning" label="Advertencia" onClick={() => console.log('warning')} />
			<Button type="success" label="Confirmar" onClick={() => console.log('success')} />
			<Button type="info" label="Información" onClick={() => console.log('info')} />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Atajos semánticos: `type="success"` aplica automáticamente el verde pastel sin necesidad de enviar `color`.',
			},
		},
	},
};

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

const semanticColors: TButtonColor[] = ['primary', 'danger', 'warning', 'success', 'info'];
const buttonAppearances: TButtonType[] = ['primary', 'secondary', 'default', 'dashed', 'text', 'link'];

export const PastelSemanticVariants: Story = {
	render: () => (
		<div className="flex flex-col gap-5 p-6">
			{semanticColors.map(color => (
				<div key={color} className="flex flex-col gap-2">
					<strong className="capitalize">{color}</strong>
					<div className="flex flex-wrap items-center gap-2">
						{buttonAppearances.map(type => (
							<Button
								key={`${color}-${type}`}
								type={type}
								color={color}
								label={type.charAt(0).toUpperCase() + type.slice(1)}
								onClick={() => console.log({ color, type })}
							/>
						))}
					</div>
				</div>
			))}
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Las apariencias Primary, Secondary, Default, Dashed, Text y Link reutilizan la misma lógica de permisos, conexión, loading, teclado y validación por API. `color` aplica una paleta pastel semántica.',
			},
		},
	},
};

export const DangerCompatibility: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-2 p-6">
			{buttonAppearances.map(type => (
				<Button
					key={type}
					type={type}
					danger
					label={type.charAt(0).toUpperCase() + type.slice(1)}
					onClick={() => console.log({ danger: true, type })}
				/>
			))}
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Compatibilidad con la prop `danger` de Ant Design aplicada a todas las apariencias.',
			},
		},
	},
};

