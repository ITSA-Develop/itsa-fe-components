import { getMappedOptionFromLocal } from '../../../helpers/objects';

const meta = {
	title: 'Helpers/Objects/getMappedOptionFromLocal',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **getMappedOptionFromLocal** recibe un valor (string | null | undefined) y un objeto \`options\` que mapea claves a etiquetas.

Retorna un objeto \`TInputOptions\` con:
- \`value\`: el valor recibido o cadena vacía si es nulo/indefinido.
- \`label\`: la etiqueta correspondiente al valor en \`options\`, o el valor mismo si no se encuentra, o cadena vacía si valor es nulo/indefinido.

* Ejemplo:

\`\`\`ts
const options = {
  apple: 'Manzana',
  banana: 'Banano',
  orange: 'Naranja',
};

getMappedOptionFromLocal('banana', options); // { value: 'banana', label: 'Banano' }
getMappedOptionFromLocal('pear', options);   // { value: 'pear', label: 'pear' }
getMappedOptionFromLocal(null, options);     // { value: '', label: '' }
\`\`\`
        `,
			},
		},
	},
	argTypes: {},
};

export default meta;

const exampleOptions = {
	apple: 'Manzana',
	banana: 'Banano',
	orange: 'Naranja',
};

export const ValidValue = () => (
	<div>
		<p>Valor válido presente en opciones:</p>
		<pre>{JSON.stringify(getMappedOptionFromLocal('banana', exampleOptions), null, 2)}</pre>
	</div>
);

export const UnknownValue = () => (
	<div>
		<p>Valor no presente en opciones (se usa el valor como etiqueta):</p>
		<pre>{JSON.stringify(getMappedOptionFromLocal('pear', exampleOptions), null, 2)}</pre>
	</div>
);

export const NullValue = () => (
	<div>
		<p>Valor null:</p>
		<pre>{JSON.stringify(getMappedOptionFromLocal(null, exampleOptions), null, 2)}</pre>
	</div>
);

export const UndefinedValue = () => (
	<div>
		<p>Valor undefined:</p>
		<pre>{JSON.stringify(getMappedOptionFromLocal(undefined, exampleOptions), null, 2)}</pre>
	</div>
);
