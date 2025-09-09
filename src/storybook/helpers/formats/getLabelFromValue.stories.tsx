import { getLabelFromValue } from '../../../helpers/formats';

const meta = {
	title: 'Helpers/Formats/getLabelFromValue',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **getLabelFromValue** recibe un valor (number o string) y un arreglo de opciones (\`TInputOptions[]\`), y retorna la etiqueta (\`label\`) asociada al valor.

Si no encuentra coincidencia, retorna cadena vacía.

* Ejemplo:

\`\`\`ts
const options = [
	{ value: 1, label: 'Opción Uno' },
	{ value: 2, label: 'Opción Dos' },
	{ value: 3, label: 'Opción Tres' },
];

getLabelFromValue(2, options); // 'Opción Dos'
getLabelFromValue('3', options); // 'Opción Tres' (siempre que el valor coincida)
getLabelFromValue(5, options); // ''
\`\`\`
				`,
			},
		},
	},
	argTypes: {},
};

export default meta;

const exampleOptions = [
	{ value: 1, label: 'Opción Uno' },
	{ value: 2, label: 'Opción Dos' },
	{ value: 3, label: 'Opción Tres' },
];

export const FoundLabel = () => (
	<div>
		<p>Valor encontrado:</p>
		<p>{getLabelFromValue(2, exampleOptions)}</p>
	</div>
);

export const NotFoundLabel = () => (
	<div>
		<p>Valor no encontrado:</p>
		<p>{getLabelFromValue(5, exampleOptions)}</p>
	</div>
);

export const StringValue = () => (
	<div>
		<p>Valor como string:</p>
		<p>{getLabelFromValue('1', exampleOptions)}</p>
	</div>
);
