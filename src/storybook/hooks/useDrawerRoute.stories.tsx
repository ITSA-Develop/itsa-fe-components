const meta = {
	title: 'Hooks/Hooks/useDrawerRoute',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
El hook **useDrawerRoute** gestiona el estado de apertura y cierre de un Drawer según un valor inicial.

Recibe como parámetro un booleano (\`showForm\`) que indica si el Drawer debe mostrarse inicialmente.

## Parámetros
- \`showForm: boolean\` — Define si el Drawer se abre al inicio.

## Retorna
- \`isDrawerOpen: boolean\` — Estado actual del Drawer.
- \`setDrawerOpen: (open: boolean) => void\` — Función para actualizar el estado manualmente.

## Ejemplo de uso

\`\`\`ts
import { useDrawerRoute } from '@/hooks/useDrawerRoute';

const MyComponent = () => {
  const { isDrawerOpen, setDrawerOpen } = useDrawerRoute(true);

  return (
    <div>
      <p>Drawer está {isDrawerOpen ? 'abierto' : 'cerrado'}</p>
      <button onClick={() => setDrawerOpen(!isDrawerOpen)}>
        Toggle Drawer
      </button>
    </div>
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
