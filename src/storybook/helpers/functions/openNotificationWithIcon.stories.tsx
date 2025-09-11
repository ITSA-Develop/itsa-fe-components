import React from 'react';
import { Button, Space, notification } from 'antd';
import { TNotificationType } from '../../../types';
import { useNotification } from '../../../hooks';

const meta = {
	title: 'Helpers/Functions/openNotificationWithIcon',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **openNotificationWithIcon** muestra notificaciones con iconos usando Ant Design.

Esta función permite mostrar diferentes tipos de notificaciones:
- **success**: Notificación de éxito (verde)
- **info**: Notificación informativa (azul)
- **warning**: Notificación de advertencia (amarillo)
- **error**: Notificación de error (rojo)

### Parámetros:
- \`type\`: Tipo de notificación ('success' | 'info' | 'warning' | 'error')
- \`message\`: Título de la notificación
- \`description\`: Descripción detallada de la notificación

### Ejemplo de uso:

\`\`\`ts
import { openNotificationWithIcon } from '@/helpers/functions';

// Notificación de éxito
openNotificationWithIcon({
  type: 'success',
  message: 'Operación exitosa',
  description: 'Los datos se han guardado correctamente.'
});

// Notificación de error
openNotificationWithIcon({
  type: 'error',
  message: 'Error en la operación',
  description: 'No se pudo completar la acción solicitada.'
});
\`\`\`

**Nota**: Esta función usa la API global de notificaciones de Ant Design. Para que funcione correctamente, asegúrate de que tu aplicación esté configurada con el sistema de notificaciones de Ant Design.

### Uso directo con Ant Design:

También puedes usar directamente la API de notificaciones de Ant Design:

\`\`\`ts
import { notification } from 'antd';

const [api, contextHolder] = notification.useNotification();

// Mostrar notificación
api.success({
  message: 'Éxito',
  description: 'Operación completada correctamente.'
});

// Renderizar el contextHolder
return (
  <>
    {contextHolder}
    {/* Tu componente aquí */}
  </>
);
\`\`\`
`,
			},
		},
	},
	argTypes: {
		type: {
			control: 'select',
			options: ['success', 'info', 'warning', 'error'],
			description: 'Tipo de notificación',
			defaultValue: 'success',
		},
		message: {
			control: 'text',
			description: 'Título de la notificación',
			defaultValue: 'Título de ejemplo',
		},
		description: {
			control: 'text',
			description: 'Descripción de la notificación',
			defaultValue: 'Esta es una descripción de ejemplo para la notificación.',
		},
	},
};

export default meta;

export const SuccessNotification = () => {
	const [api, contextHolder] = notification.useNotification();

	const handleClick = () => {
		api.success({
			message: 'Operación exitosa',
			description: 'Los datos se han guardado correctamente en la base de datos.',
		});
	};

	return (
		<>
			{contextHolder}
			<div style={{ padding: '20px' }}>
				<h3>Notificación de Éxito</h3>
				<p>Haz clic en el botón para mostrar una notificación de éxito:</p>
				<Button type="primary" onClick={handleClick}>
					Mostrar Notificación de Éxito
				</Button>
			</div>
		</>
	);
};

export const AllNotificationTypes = () => {
	const { openNotificationWithIcon } = useNotification();

	const showNotification = (type: TNotificationType) => {
		const configs = {
			success: {
				message: 'Operación exitosa',
				description: 'Los datos se han procesado correctamente.',
			},
			info: {
				message: 'Información del sistema',
				description: 'El sistema está funcionando normalmente.',
			},
			warning: {
				message: 'Advertencia del sistema',
				description: 'Hay algunos elementos que requieren atención.',
			},
			error: {
				message: 'Error del sistema',
				description: 'Se ha producido un error inesperado.',
			},
		};

		console.log('TOMAS ===> variables =>',configs[type]);

		openNotificationWithIcon({
			type,
			message: configs[type].message,
			description: configs[type].description,
		});
	};

	return (
		<>
			<div style={{ padding: '20px' }}>
				<h3>Todos los Tipos de Notificación</h3>
				<p>Haz clic en cualquiera de los botones para mostrar diferentes tipos de notificaciones:</p>
				<Space wrap>
					<Button type="primary" onClick={() => showNotification('success')}>
						Éxito
					</Button>
					<Button onClick={() => showNotification('info')}>
						Información
					</Button>
					<Button type="default" onClick={() => showNotification('warning')}>
						Advertencia
					</Button>
					<Button type="primary" danger onClick={() => showNotification('error')}>
						Error
					</Button>
				</Space>
			</div>
		</>
	);
};