import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Notification } from '../../components/Notification';
import { Button } from '../../components/Button';

const meta: Meta<typeof Notification> = {
	title: 'Components/Notification',
	component: Notification,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: `
Componente de Notification para mostrar mensajes importantes en el DOM.

**Características:**
- Tres estados principales: info, warning, error, success
- Título y descripción personalizables
- Ancho configurable
- Opción de cierre
- Iconos automáticos según el tipo
- Animación de entrada

**Casos de uso:**
- Mensajes informativos en formularios
- Alertas de validación
- Notificaciones de estado del sistema
- Mensajes de error contextuales
				`,
			},
		},
	},
	argTypes: {
		type: {
			control: 'select',
			options: ['info', 'warning', 'error', 'success'],
			description: 'Tipo de notificación',
			table: {
				defaultValue: { summary: 'info' },
			},
		},
		title: {
			control: 'text',
			description: 'Título de la notificación',
		},
		description: {
			control: 'text',
			description: 'Descripción o mensaje principal',
		},
		closable: {
			control: 'boolean',
			description: 'Permite cerrar la notificación',
			table: {
				defaultValue: { summary: 'false' },
			},
		},
		width: {
			control: 'text',
			description: 'Ancho de la notificación (%, px, auto)',
			table: {
				defaultValue: { summary: '100%' },
			},
		},
		showIcon: {
			control: 'boolean',
			description: 'Muestra el icono',
			table: {
				defaultValue: { summary: 'true' },
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof Notification>;

export const Info: Story = {
	args: {
		type: 'info',
		title: 'Información',
		description: 'Este es un mensaje informativo. Contiene información útil para el usuario.',
		closable: true,
		width: '100%',
		showIcon: true,
	},
};

export const Warning: Story = {
	args: {
		type: 'warning',
		title: 'Advertencia',
		description: 'Ten cuidado, esta acción puede tener consecuencias importantes.',
		closable: true,
		width: '100%',
		showIcon: true,
	},
};

export const Error: Story = {
	args: {
		type: 'error',
		title: 'Error Crítico',
		description: 'Ha ocurrido un error al procesar tu solicitud. Por favor, intenta nuevamente.',
		closable: true,
		width: '100%',
		showIcon: true,
	},
};

export const Success: Story = {
	args: {
		type: 'success',
		title: 'Éxito',
		description: 'La operación se completó exitosamente.',
		closable: true,
		width: '100%',
		showIcon: true,
	},
};

export const WithoutTitle: Story = {
	args: {
		type: 'info',
		description: 'Esta notificación no tiene título, solo descripción.',
		closable: false,
		width: '100%',
		showIcon: true,
	},
};

export const WithoutIcon: Story = {
	args: {
		type: 'warning',
		title: 'Sin Icono',
		description: 'Esta notificación no muestra icono.',
		closable: true,
		width: '100%',
		showIcon: false,
	},
};

export const CustomWidth: Story = {
	args: {
		type: 'info',
		title: 'Ancho Personalizado',
		description: 'Esta notificación tiene un ancho de 400px.',
		closable: true,
		width: '400px',
		showIcon: true,
	},
};

export const AllTypes: Story = {
	render: () => (
		<div className="flex flex-col gap-4 p-4">
			<Notification
				type="info"
				title="Información"
				description="Este es un mensaje informativo para el usuario."
				closable
			/>
			<Notification
				type="success"
				title="Éxito"
				description="La operación se completó correctamente."
				closable
			/>
			<Notification
				type="warning"
				title="Advertencia"
				description="Por favor, revisa esta información antes de continuar."
				closable
			/>
			<Notification
				type="error"
				title="Error"
				description="Ha ocurrido un error al procesar la solicitud."
				closable
			/>
		</div>
	),
};

export const DifferentWidths: Story = {
	render: () => (
		<div className="flex flex-col gap-4 p-4">
			<div>
				<h3 className="mb-2 text-sm font-semibold">100% de ancho (por defecto)</h3>
				<Notification
					type="info"
					title="Ancho completo"
					description="Esta notificación ocupa todo el ancho disponible."
					closable
				/>
			</div>
			<div>
				<h3 className="mb-2 text-sm font-semibold">600px de ancho</h3>
				<Notification
					type="success"
					title="Ancho fijo"
					description="Esta notificación tiene un ancho de 600px."
					closable
					width="600px"
				/>
			</div>
			<div>
				<h3 className="mb-2 text-sm font-semibold">50% de ancho</h3>
				<Notification
					type="warning"
					title="Ancho relativo"
					description="Esta notificación ocupa el 50% del ancho disponible."
					closable
					width="50%"
				/>
			</div>
		</div>
	),
};

export const InFormContext: Story = {
	name: 'Uso en Formularios',
	render: () => {
		const [showError, setShowError] = useState(false);
		const [showSuccess, setShowSuccess] = useState(false);

		const handleSubmit = () => {
			setShowError(false);
			setShowSuccess(false);
			// Simular validación
			const isValid = Math.random() > 0.5;
			setTimeout(() => {
				if (isValid) {
					setShowSuccess(true);
				} else {
					setShowError(true);
				}
			}, 500);
		};

		return (
			<div className="max-w-2xl p-6">
				<h2 className="mb-4 text-lg font-semibold">Formulario de ejemplo</h2>

				{showError && (
					<Notification
						type="error"
						title="Error de validación"
						description="Por favor, revisa los campos del formulario. Algunos datos son incorrectos."
						closable
						onClose={() => setShowError(false)}
						width="100%"
					/>
				)}

				{showSuccess && (
					<Notification
						type="success"
						title="Formulario enviado"
						description="Los datos se han guardado exitosamente."
						closable
						onClose={() => setShowSuccess(false)}
						width="100%"
					/>
				)}

				<div className="mt-4 space-y-4">
					<div>
						<label className="block text-sm font-medium">Nombre</label>
						<input
							type="text"
							className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
							placeholder="Tu nombre"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium">Email</label>
						<input
							type="email"
							className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
							placeholder="tu@email.com"
						/>
					</div>
					<Button type="primary" label="Enviar" onClick={handleSubmit} />
				</div>
			</div>
		);
	},
};

export const LongDescription: Story = {
	args: {
		type: 'warning',
		title: 'Términos y Condiciones',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
		closable: true,
		width: '100%',
	},
};

export const NonClosable: Story = {
	args: {
		type: 'info',
		title: 'Información Importante',
		description: 'Esta notificación no se puede cerrar y permanecerá visible.',
		closable: false,
		width: '100%',
	},
};

export const InSidebar: Story = {
	name: 'Uso en Sidebar',
	render: () => (
		<div className="flex gap-4 p-4">
			<div className="w-64 rounded border border-gray-200 bg-gray-50 p-4">
				<h3 className="mb-4 font-semibold">Sidebar</h3>
				<Notification
					type="warning"
					description="Tu suscripción expira pronto."
					closable
					width="100%"
				/>
				<div className="mt-4">
					<p className="text-sm text-gray-600">Contenido del sidebar...</p>
				</div>
			</div>
			<div className="flex-1 rounded border border-gray-200 p-4">
				<h3 className="mb-4 font-semibold">Contenido Principal</h3>
				<Notification
					type="success"
					title="Bienvenido"
					description="Has iniciado sesión correctamente."
					closable
					width="600px"
				/>
			</div>
		</div>
	),
};
