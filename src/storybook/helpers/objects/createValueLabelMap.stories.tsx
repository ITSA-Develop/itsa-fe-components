import { createValueLabelMap } from '../../../helpers/objects';

const meta = {
	title: 'Helpers/Objects/createValueLabelMap',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **createValueLabelMap** recibe un arreglo de opciones (\`TInputOptions[]\`) y crea un objeto que mapea cada \`value\` a su correspondiente \`label\`.

* Ejemplo:

\`\`\`ts
const options = [
  { value: '1', label: 'Primero' },
  { value: '2', label: 'Segundo' },
  { value: '3', label: 'Tercero' },
];

createValueLabelMap(options);

// Resultado:
// {
//   '1': 'Primero',
//   '2': 'Segundo',
//   '3': 'Tercero',
// }
\`\`\`
        `,
			},
		},
	},
	argTypes: {},
};

export default meta;

const exampleOptions = [
	{ value: '1', label: 'Primero' },
	{ value: '2', label: 'Segundo' },
	{ value: '3', label: 'Tercero' },
];

export const ExampleMap = () => {
	const map = createValueLabelMap(exampleOptions);

	return (
		<div>
			<p>Opciones originales:</p>
			<pre>{JSON.stringify(exampleOptions, null, 2)}</pre>

			<p>Mapa value - label generado:</p>
			<pre>{JSON.stringify(map, null, 2)}</pre>
		</div>
	);
};
