import { isObject } from '../../../helpers/booleansChecks';

const meta = {
	title: 'Helpers/BooleanChecks/isObject',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **isObject** verifica si el valor proporcionado es un objeto válido (excluyendo \`null\`).

Condiciones:
- El tipo debe ser \`object\`
- No debe ser \`null\`

Retorna \`true\` si ambas condiciones se cumplen, \`false\` en caso contrario.

* Ejemplos:

isObject({ a: 1 }) // true  
isObject(null) // false  
isObject('texto') // false  
isObject(42) // false
`,
			},
		},
	},
	argTypes: {},
};

export default meta;

export const ValidObject = () => {
	return (
		<div>
			<p>Objeto con propiedades:</p>
			<p>{String(isObject({ a: 1 }))}</p>
		</div>
	);
};

export const InvalidNull = () => {
	return (
		<div>
			<p>Valor null:</p>
			<p>{String(isObject(null))}</p>
		</div>
	);
};

export const InvalidString = () => {
	return (
		<div>
			<p>Valor string:</p>
			<p>{String(isObject('texto'))}</p>
		</div>
	);
};

export const InvalidNumber = () => {
	return (
		<div>
			<p>Valor numérico:</p>
			<p>{String(isObject(42))}</p>
		</div>
	);
};
