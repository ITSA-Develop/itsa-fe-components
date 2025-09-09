import { isPlainObject } from '../../../helpers/booleansChecks';

const meta = {
	title: 'Helpers/BooleanChecks/isPlainObject',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **isPlainObject** determina si un valor es un **objeto plano** (creado mediante un literal de objeto o \`new Object()\`).

Utiliza \`Object.prototype.toString.call(value)\` para comprobar que sea exactamente \`[object Object]\`.

Retorna:
- \`true\` → si el valor es un objeto plano.
- \`false\` → si es \`null\`, un array, una fecha, o cualquier otro tipo de objeto.

* Ejemplos:

isPlainObject({ a: 1 }) // true  
isPlainObject(Object.create(null)) // true  
isPlainObject([1, 2, 3]) // false  
isPlainObject(new Date()) // false  
isPlainObject(null) // false
`,
			},
		},
	},
	argTypes: {},
};

export default meta;

export const ValidPlainObject = () => {
	return (
		<div>
			<p>Objeto plano con propiedades:</p>
			<p>{String(isPlainObject({ a: 1 }))}</p>
		</div>
	);
};

export const ValidPlainObjectNoPrototype = () => {
	return (
		<div>
			<p>Objeto plano sin prototipo:</p>
			<p>{String(isPlainObject(Object.create(null)))}</p>
		</div>
	);
};

export const InvalidArray = () => {
	return (
		<div>
			<p>Array (no es objeto plano):</p>
			<p>{String(isPlainObject([1, 2, 3]))}</p>
		</div>
	);
};

export const InvalidDate = () => {
	return (
		<div>
			<p>Fecha (no es objeto plano):</p>
			<p>{String(isPlainObject(new Date()))}</p>
		</div>
	);
};

export const InvalidNull = () => {
	return (
		<div>
			<p>Null (no es objeto plano):</p>
			<p>{String(isPlainObject(null))}</p>
		</div>
	);
};
