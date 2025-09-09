import { isArray } from '../../../helpers/booleansChecks';

const meta = {
	title: 'Helpers/BooleanChecks/isArray',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **isArray** verifica si el valor recibido es un arreglo.

Retorna \`true\` si el valor es un arreglo, y \`false\` en caso contrario.

* Ejemplo de uso:

const value1 = [1, 2, 3]; // true  
const value2 = 'Hola'; // false  
const value3 = { a: 1 }; // false  
const value4 = []; // true
`,
			},
		},
	},
	argTypes: {},
};

export default meta;

export const IsArrayTrue = () => {
	return (
		<div>
			<p>Valor es un arreglo:</p>
			<p>{String(isArray([1, 2, 3]))}</p>
		</div>
	);
};

export const IsArrayFalseString = () => {
	return (
		<div>
			<p>Valor no es un arreglo (string):</p>
			<p>{String(isArray('Hola'))}</p>
		</div>
	);
};

export const IsArrayFalseObject = () => {
	return (
		<div>
			<p>Valor no es un arreglo (objeto):</p>
			<p>{String(isArray({ a: 1 }))}</p>
		</div>
	);
};

export const IsArrayEmpty = () => {
	return (
		<div>
			<p>Valor es un arreglo vacío:</p>
			<p>{String(isArray([]))}</p>
		</div>
	);
};
