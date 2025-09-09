import { findLastChild } from '../../../helpers/objects';

const meta = {
	title: 'Helpers/Objects/findLastChild',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **findLastChild** busca recursivamente el último hijo dentro de un árbol dado un nodo raíz.

- El árbol está representado como un objeto donde cada clave es un nodo y su valor es otro objeto con hijos.
- La función sigue el último hijo (clave) hasta que no hay más hijos y retorna ese nodo.

* Ejemplo de estructura de árbol:

\`\`\`ts
const tree = {
  root: {
    child1: {
      grandchild1: {},
    },
    child2: {},
  },
};
\`\`\`

* Ejemplo de uso:

\`\`\`ts
findLastChild(tree, 'root'); // retorna el nodo vacío {}
\`\`\`
        `,
			},
		},
	},
	argTypes: {},
};

export default meta;

const exampleTree = {
	root: {
		child1: {
			grandchild1: {},
		},
		child2: {},
	},
	orphan: {},
};

export const LastChildFromRoot = () => {
	const result = findLastChild(exampleTree, 'root');

	return (
		<div>
			<p>Árbol:</p>
			<pre>{JSON.stringify(exampleTree, null, 2)}</pre>

			<p>Resultado de findLastChild(tree, 'root'):</p>
			<pre>{JSON.stringify(result, null, 2)}</pre>
		</div>
	);
};

export const LastChildFromChild1 = () => {
	const result = findLastChild(exampleTree, 'child1');

	return (
		<div>
			<p>Árbol:</p>
			<pre>{JSON.stringify(exampleTree, null, 2)}</pre>

			<p>Resultado de findLastChild(tree, 'child1'):</p>
			<pre>{JSON.stringify(result, null, 2)}</pre>
		</div>
	);
};

export const NodeDoesNotExist = () => {
	const result = findLastChild(exampleTree, 'nonexistent');

	return (
		<div>
			<p>Árbol:</p>
			<pre>{JSON.stringify(exampleTree, null, 2)}</pre>

			<p>Resultado de findLastChild(tree, 'nonexistent') (nodo no existe):</p>
			<pre>{JSON.stringify(result, null, 2)}</pre>
		</div>
	);
};
