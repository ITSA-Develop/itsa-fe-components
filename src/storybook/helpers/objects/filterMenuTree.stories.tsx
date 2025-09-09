import { filterMenuTree } from '../../../helpers/objects';
import { IMenuItem } from '../../../interfaces';

const meta = {
	title: 'Helpers/Objects/filterMenuTree',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **filterMenuTree** filtra recursivamente un arreglo de nodos de menú (\`IMenuItem[]\`) según un término de búsqueda.

- Normaliza los textos (quita acentos, pasa a minúsculas).
- Devuelve solo nodos cuyo título coincida con el término o que tengan hijos que coincidan.

* Ejemplo de uso:

\`\`\`ts
const menuTree = [
  {
		id: 1,
		title: 'Dashboard',
		subList: [
			{
				id: 11,
				title: 'Reports',
				subList: [],
				icon: '',
			},
			{
				id: 12,
				title: 'Analytics',
				subList: [],
				icon: '',
			},
		],
		icon: '',
	},
	{
		id: 2,
		title: 'Users',
		subList: [
			{
				id: 21,
				title: 'List',
				subList: [],
				icon: '',
			},
			{
				id: 22,
				title: 'Settings',
				subList: [],
				icon: '',
			},
		],
		icon: '',
	},
];

const filtered = filterMenuTree(menuTree, 'report');
// Retorna solo el nodo 'Dashboard' con el hijo 'Reports'
\`\`\`
			`,
			},
		},
	},
	argTypes: {},
};

export default meta;

const exampleMenu: IMenuItem[] = [
	{
		id: 1,
		title: 'Dashboard',
		subList: [
			{
				id: 11,
				title: 'Reports',
				subList: [],
				icon: '',
			},
			{
				id: 12,
				title: 'Analytics',
				subList: [],
				icon: '',
			},
		],
		icon: '',
	},
	{
		id: 2,
		title: 'Users',
		subList: [
			{
				id: 21,
				title: 'List',
				subList: [],
				icon: '',
			},
			{
				id: 22,
				title: 'Settings',
				subList: [],
				icon: '',
			},
		],
		icon: '',
	},
];

export const FilterByReports = () => {
	const filtered = filterMenuTree(exampleMenu, 'report');

	return (
		<div>
			<p>Árbol original:</p>
			<pre>{JSON.stringify(exampleMenu, null, 2)}</pre>

			<p>Resultado filtrado (buscando "report"):</p>
			<pre>{JSON.stringify(filtered, null, 2)}</pre>
		</div>
	);
};

export const FilterByUsers = () => {
	const filtered = filterMenuTree(exampleMenu, 'users');

	return (
		<div>
			<p>Resultado filtrado (buscando "users"):</p>
			<pre>{JSON.stringify(filtered, null, 2)}</pre>
		</div>
	);
};

export const FilterByNone = () => {
	const filtered = filterMenuTree(exampleMenu, 'noexiste');

	return (
		<div>
			<p>Resultado filtrado (buscando "noexiste", sin coincidencias):</p>
			<pre>{JSON.stringify(filtered, null, 2)}</pre>
		</div>
	);
};
