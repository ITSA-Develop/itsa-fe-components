import { isNumber } from '../../../helpers/booleansChecks';

const meta = {
	title: 'Helpers/BooleanChecks/isNumber',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **isNumber** verifica si el valor proporcionado es un número válido.

Condiciones:
- Debe ser del tipo \`number\`
- No debe ser \`NaN\`

Retorna \`true\` si ambas condiciones se cumplen, \`false\` en caso contrario.

* Ejemplos:

isNumber(42) // true  
isNumber(3.14) // true  
isNumber(NaN) // false  
isNumber('42') // false  
isNumber(undefined) // false
`,
			},
		},
	},
	argTypes: {},
};

export default meta;

export const ValidInteger = () => {
	return (
		<div>
			<p>Valor numérico entero:</p>
			<p>{String(isNumber(42))}</p>
		</div>
	);
};

export const ValidFloat = () => {
	return (
		<div>
			<p>Valor numérico decimal:</p>
			<p>{String(isNumber(3.14))}</p>
		</div>
	);
};

export const InvalidNaN = () => {
	return (
		<div>
			<p>Valor NaN:</p>
			<p>{String(isNumber(NaN))}</p>
		</div>
	);
};

export const InvalidString = () => {
	return (
		<div>
			<p>Valor string numérico:</p>
			<p>{String(isNumber('42'))}</p>
		</div>
	);
};

export const InvalidUndefined = () => {
	return (
		<div>
			<p>Valor undefined:</p>
			<p>{String(isNumber(undefined))}</p>
		</div>
	);
};
