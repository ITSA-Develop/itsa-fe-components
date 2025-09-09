import { mapPermissionsToMenuFormat } from '../../../helpers/objects';
import { IPermissionSubmodule } from '../../../interfaces';

const meta = {
	title: 'Helpers/Objects/mapPermissionsToMenuFormat',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **mapPermissionsToMenuFormat** transforma un arreglo de permisos (submódulos) en un formato adecuado para un menú.

- Convierte iconos usando \`ICON_MAP\`.
- Aplica título capitalizado a nombres.
- Construye lista anidada \`subList\` para grupos y programas.

* Ejemplo de entrada y salida:

\`\`\`ts
const subModules = [
  {
		name: 'dashboard',
		icon: 'dashboard',
		path: '/dashboard',
		groups: [
			{
				name: 'reports',
				icon: 'reports',
				path: '/dashboard/reports',
				programs: [
					{
						name: 'sales',
						icon: 'reports',
						path: '/dashboard/reports/sales',
						actions: {
							update: 1,
							delete: 0,
							create: 0,
							read: 1,
							all_actions: 0,
						},
						id: 0,
					},
				],
				actions: {
					update: 1,
					delete: 0,
					create: 0,
					read: 1,
					all_actions: 0,
				},
				id: 0,
			},
		],
		programs: [
			{
				id: 1,
				name: 'users',
				icon: 'users',
				path: '/dashboard/users',
				actions: {
					update: 0,
					delete: 0,
					create: 0,
					read: 1,
					all_actions: 0,
				},
			},
		],
		id: 0,
	},
];

const menu = mapPermissionsToMenuFormat(subModules);
\`\`\`
        `,
			},
		},
	},
	argTypes: {},
};

export default meta;

const exampleSubModules: IPermissionSubmodule[] = [
	{
		name: 'dashboard',
		icon: 'dashboard',
		path: '/dashboard',
		groups: [
			{
				name: 'reports',
				icon: 'reports',
				path: '/dashboard/reports',
				programs: [
					{
						name: 'sales',
						icon: 'reports',
						path: '/dashboard/reports/sales',
						actions: {
							update: 1,
							delete: 0,
							create: 0,
							read: 1,
							all_actions: 0,
						},
						id: 0,
					},
				],
				actions: {
					update: 1,
					delete: 0,
					create: 0,
					read: 1,
					all_actions: 0,
				},
				id: 0,
			},
		],
		programs: [
			{
				id: 1,
				name: 'users',
				icon: 'users',
				path: '/dashboard/users',
				actions: {
					update: 0,
					delete: 0,
					create: 0,
					read: 1,
					all_actions: 0,
				},
			},
		],
		id: 0,
	},
];

export const ExampleMenuFormat = () => {
	const menu = mapPermissionsToMenuFormat(exampleSubModules);

	return (
		<div>
			<p>Datos de permisos originales:</p>
			<pre>{JSON.stringify(exampleSubModules, null, 2)}</pre>

			<p>Menú mapeado:</p>
			<pre>{JSON.stringify(menu, null, 2)}</pre>
		</div>
	);
};
