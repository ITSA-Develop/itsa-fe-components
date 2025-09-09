import { getMappedOptionFromAPI } from '../../../helpers/objects';

const meta = {
	title: 'Helpers/Objects/getMappedOptionFromAPI',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **getMappedOptionFromAPI** recibe un valor (\`string | number | undefined | null\`) y un array de opciones \`TInputOptions[]\).

- Si el valor es nulo o indefinido, retorna \`EMPTY_DEFAULT_INPUT_LABEL\`.  
- Si el valor existe, busca la etiqueta correspondiente usando \`createValueLabelMap\`.  
- Si la etiqueta existe, retorna el objeto con \`value\` y \`label\`.  
- Si no, retorna \`EMPTY_DEFAULT_INPUT_LABEL\`.

* Ejemplo:

\`\`\`ts
const options = [
  { value: '1', label: 'Uno' },
  { value: '2', label: 'Dos' },
];

getMappedOptionFromAPI('1', options); // { value: '1', label: 'Uno' }
getMappedOptionFromAPI('3', options); // EMPTY_DEFAULT_INPUT_LABEL
getMappedOptionFromAPI(null, options); // EMPTY_DEFAULT_INPUT_LABEL
\`\`\`
      `,
			},
		},
	},
	argTypes: {},
};

export default meta;

const exampleOptions = [
	{ value: '1', label: 'Uno' },
	{ value: '2', label: 'Dos' },
];

export const ValidValue = () => (
	<div>
		<p>Valor válido:</p>
		<pre>{JSON.stringify(getMappedOptionFromAPI('1', exampleOptions), null, 2)}</pre>
	</div>
);

export const InvalidValue = () => (
	<div>
		<p>Valor no encontrado:</p>
		<pre>{JSON.stringify(getMappedOptionFromAPI('3', exampleOptions), null, 2)}</pre>
	</div>
);

export const NullValue = () => (
	<div>
		<p>Valor null:</p>
		<pre>{JSON.stringify(getMappedOptionFromAPI(null, exampleOptions), null, 2)}</pre>
	</div>
);
