const meta = {
	title: 'Hooks/Hooks/useNotification',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
El hook **useNotification** provee una forma sencilla de mostrar notificaciones usando el componente \`notification\` de Ant Design.

## Qué hace
- Inicializa el API de notificaciones de Ant Design.
- Proporciona una función para abrir notificaciones de distintos tipos (error, success, info, warning).
- Expone un \`contextHolder\` que debe incluirse en el árbol de componentes para que las notificaciones funcionen correctamente.

## Retorna
- \`api\`: Objeto interno de la API de notificaciones (usualmente no se usa directamente).
- \`contextHolder\`: Elemento React que debe renderizarse en la UI para que las notificaciones funcionen.
- \`openNotification(type, message, description)\`: Función para abrir una notificación.

## Parámetros de \`openNotification\`
- \`type: TNotificationType\` — Tipo de notificación (por ejemplo: 'success', 'error', 'info', 'warning').
- \`message: string\` — Título o encabezado de la notificación.
- \`description: string\` — Texto descriptivo adicional.

## Ejemplo de uso

\`\`\`tsx
import { useNotification } from '@/hooks/useNotification';

const MyComponent = () => {
  const { openNotification, contextHolder } = useNotification();

  const notify = () => {
    openNotification('success', 'Éxito', 'La operación fue exitosa.');
  };

  return (
    <>
      {contextHolder}
      <button onClick={notify}>Mostrar Notificación</button>
    </>
  );
};
\`\`\`
`,
			},
		},
	},
	argTypes: {},
};

export default meta;

export const Default = () => {
	return <div></div>;
};
