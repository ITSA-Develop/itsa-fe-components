import { isString } from '../../../helpers/booleansChecks';

const meta = {
	title: 'Helpers/BooleanChecks/isString',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **isString** verifica si el valor proporcionado es de tipo \`string\`.

Retorna \`true\` si el tipo es \`string\`, \`false\` en caso contrario.

* Ejemplos:

isString('Hola') // true  
isString('') // true  
isString(42) // false  
isString(['a', 'b']) // false  
isString(undefined) // false
`,
			},
		},
	},
	argTypes: {},
};

export default meta;

export const ValidString = () => {
	return (
		<div>
			<p>Cadena de texto:</p>
			<p>{String(isString('Hola mundo'))}</p>
		</div>
	);
};

export const EmptyString = () => {
	return (
		<div>
			<p>Cadena vacía:</p>
			<p>{String(isString(''))}</p>
		</div>
	);
};

export const InvalidNumber = () => {
	return (
		<div>
			<p>Valor numérico:</p>
			<p>{String(isString(42))}</p>
		</div>
	);
};

export const InvalidArray = () => {
	return (
		<div>
			<p>Valor arreglo:</p>
			<p>{String(isString(['a', 'b']))}</p>
		</div>
	);
};

export const InvalidUndefined = () => {
	return (
		<div>
			<p>Valor undefined:</p>
			<p>{String(isString(undefined))}</p>
		</div>
	);
};
