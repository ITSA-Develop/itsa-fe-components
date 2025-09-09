const meta = {
	title: 'Hooks/Hooks/useErrors',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
El hook **useErrors** centraliza la captura, parseo y notificación de errores dentro de la aplicación.

Proporciona utilidades para:
- **Notificar** errores al usuario mediante \`useNotification\`.
- **Parsear** diferentes formatos de errores (string, array, Error, ApiError, etc.).
- **Ejecutar funciones con manejo de errores** sin duplicar lógica.

## Parámetros
No recibe parámetros directamente. Puede usarse en cualquier componente o hook.

## Retorna
- \`handleAndNotify(errors?, config?)\` — Procesa un error y muestra la notificación.
- \`tryAndHandle(tryFunction?, finallyFunction?, errorResponse?, level?)\` — Ejecuta una función y maneja errores.
- \`parseErrors(error?)\` — Devuelve un objeto con \`error\` (mensaje) y \`code\` (código de error).
- \`getStatusCodeAndMessage(errors?)\` — Extrae el código HTTP y mensaje desde un \`ApiError\`.

## Ejemplo de uso

\`\`\`ts
import { useErrors } from '@/hooks/useErrors';
import { EStatus } from '@/enums';

const MyComponent = () => {
  const { handleAndNotify, tryAndHandle } = useErrors();

  const handleClick = () => {
    tryAndHandle(
      () => {
        throw new Error('Algo salió mal');
      },
      () => console.log('Limpieza final'),
      false,
      EStatus.error
    );
  };

  return <button onClick={handleClick}>Probar error</button>;
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
