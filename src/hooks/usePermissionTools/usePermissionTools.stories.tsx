const meta = {
	title: 'Hooks/Hooks/usePermissionTools',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
El hook **usePermissionTools** facilita la gestión y verificación de permisos de usuario basados en rutas y acciones.

Recibe como parámetro un objeto de permisos y devuelve funciones para consultar si un usuario puede acceder a una ruta o realizar una acción específica.

## Parámetros
- \`permissions: IPermission | null\` — Objeto que contiene la estructura de permisos del usuario.

## Retorna
- \`can(path: string, action: keyof IPermissionActions): boolean\` — Indica si el usuario tiene permiso para la acción especificada en la ruta dada.
- \`canAccessRoute(path: string): boolean\` — Indica si el usuario puede acceder a la ruta dada, considerando acciones y permisos jerárquicos.

## Funcionalidades importantes
- Normaliza las rutas eliminando barras finales y convirtiendo a minúsculas.
- Detecta acciones implícitas en rutas que terminan en \`/crear\`, \`/editar\` o \`/detalles\`.
- Permite acceso directo si la ruta contiene \`gestion-personas\` o es la raíz (\`/\`).
- Soporta jerarquías de permisos verificando rutas padre con permisos totales o para la acción requerida.

## Ejemplo de uso

\`\`\`tsx
import { usePermissionTools } from '@/hooks/usePermissionTools';

const permissions = {
  agencies: [
    {
      modules: [
        {
          submodules: [
            {
              programs: [
                {
                  path: '/dashboard',
                  actions: { all_actions: 1, read: 1, create: 0, update: 0 }
                }
              ],
              groups: [],
            },
          ],
        },
      ],
    },
  ],
};

const MyComponent = () => {
  const { can, canAccessRoute } = usePermissionTools(permissions);

  return (
    <div>
      <p>¿Puede leer /dashboard? {can('/dashboard', 'read') ? 'Sí' : 'No'}</p>
      <p>¿Puede acceder a /dashboard/editar? {canAccessRoute('/dashboard/editar') ? 'Sí' : 'No'}</p>
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

export const Default = () => <div></div>;
