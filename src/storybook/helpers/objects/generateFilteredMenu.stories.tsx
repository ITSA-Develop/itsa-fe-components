import { generateFilteredMenu } from '../../../helpers/objects';
import { IPermissionSubmodule } from '../../../interfaces';

const filterMenuTree = (nodes: any[], searchTerm: any) => {
	const normalize = (text: string) =>
		text
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase();

	const normalizedSearch = normalize(searchTerm);

	return nodes
		.map((node: any) => {
			const newNode = { ...node };

			if (newNode.subList && Array.isArray(newNode.subList)) {
				newNode.subList = filterMenuTree(newNode.subList, searchTerm);
			}

			const matchesTitle = newNode.title ? normalize(newNode.title).includes(normalizedSearch) : 0;

			const hasMatchingChildren = newNode.subList && newNode.subList.length > 0;

			if (matchesTitle || hasMatchingChildren) {
				return newNode;
			}

			return null;
		})
		.filter((node: null) => node !== null);
};

const meta = {
	title: 'Helpers/Objects/generateFilteredMenu',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **generateFilteredMenu** recibe:

- Un array de permisos \`subModules\` (\`IPermissionSubmodule[]\` o undefined).  
- Un término de búsqueda \`searchTerm\`.

Genera un menú formateado a partir de los permisos y filtra el menú por el término de búsqueda si no está vacío.

* Ejemplo básico de uso:

\`\`\`ts
const menu = generateFilteredMenu(subModules, 'report');
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
		id: 1,
		name: 'dashboard',
		icon: 'dashboard',
		path: '/dashboard',
		groups: [
			{
				id: 11,
				name: 'reports',
				icon: 'reports',
				path: '/dashboard/reports',
				programs: [
					{
						id: 111,
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
					},
				],
				actions: { update: 1, delete: 0, create: 0, read: 1, all_actions: 0 },
			},
		],
		programs: [
			{
				id: 21,
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
	},
];

export const NoSearchTerm = () => {
	const menu = generateFilteredMenu(exampleSubModules, '');

	return (
		<div>
			<p>Menú sin filtro (searchTerm vacío):</p>
			<pre>{JSON.stringify(menu, null, 2)}</pre>
		</div>
	);
};

export const FilterByReport = () => {
	const menu = generateFilteredMenu(exampleSubModules, 'report');

	return (
		<div>
			<p>Menú filtrado por "report":</p>
			<pre>{JSON.stringify(menu, null, 2)}</pre>
		</div>
	);
};

export const FilterByUsers = () => {
	const menu = generateFilteredMenu(exampleSubModules, 'users');

	return (
		<div>
			<p>Menú filtrado por "users":</p>
			<pre>{JSON.stringify(menu, null, 2)}</pre>
		</div>
	);
};
