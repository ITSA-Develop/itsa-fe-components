import { isEmpty } from '../../../helpers/booleansChecks';

const meta = {
	title: 'Helpers/BooleanChecks/isEmpty',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **isEmpty** verifica si un valor está vacío.

Considera vacío si:
- Es \`null\` o \`undefined\`
- Es una cadena vacía o con solo espacios en blanco
- Es un arreglo sin elementos
- Es un objeto sin propiedades propias

Retorna \`true\` si el valor está vacío, \`false\` en caso contrario.

* Ejemplos:

isEmpty(null) // true  
isEmpty('') // true  
isEmpty('  ') // true  
isEmpty([]) // true  
isEmpty({}) // true  
isEmpty([1, 2]) // false  
isEmpty({ a: 1 }) // false  
isEmpty('hola') // false
				`,
			},
		},
	},
	argTypes: {},
};

export default meta;

export const EmptyNull = () => {
	return (
		<div>
			<p>Valor null:</p>
			<p>{String(isEmpty(null))}</p>
		</div>
	);
};

export const EmptyStringSpaces = () => {
	return (
		<div>
			<p>Cadena vacía o solo espacios:</p>
			<p>{String(isEmpty('   '))}</p>
		</div>
	);
};

export const EmptyArray = () => {
	return (
		<div>
			<p>Arreglo vacío:</p>
			<p>{String(isEmpty([]))}</p>
		</div>
	);
};

export const EmptyObject = () => {
	return (
		<div>
			<p>Objeto vacío:</p>
			<p>{String(isEmpty({}))}</p>
		</div>
	);
};

export const NotEmptyArray = () => {
	return (
		<div>
			<p>Arreglo con elementos:</p>
			<p>{String(isEmpty([1, 2, 3]))}</p>
		</div>
	);
};

export const NotEmptyObject = () => {
	return (
		<div>
			<p>Objeto con propiedades:</p>
			<p>{String(isEmpty({ a: 1 }))}</p>
		</div>
	);
};

export const NotEmptyString = () => {
	return (
		<div>
			<p>Cadena con texto:</p>
			<p>{String(isEmpty('Hola'))}</p>
		</div>
	);
};
