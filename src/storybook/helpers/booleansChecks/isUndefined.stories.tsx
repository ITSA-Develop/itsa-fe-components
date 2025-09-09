import { isUndefined } from '../../../helpers/booleansChecks';

const meta = {
	title: 'Helpers/BooleanChecks/isUndefined',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `Undefined Check Example:

	\`\`\`
	export const isUndefined = (value: unknown): value is undefined => {
		return value === undefined;
	};
	\`\`\`

	Esta función verifica si el valor proporcionado es estrictamente igual a undefined. Es útil para comprobar si una variable no ha sido asignada o si se le ha dado el valor undefined.`,
			},
		},
	},
	argTypes: {},
};

export default meta;

export const UndefinedValue = () => {
	return (
		<div>
			<p>Check if undefined is undefined (should return true):</p>
			<p>{JSON.stringify(isUndefined(undefined))}</p>
		</div>
	);
};

export const NullValue = () => {
	return (
		<div>
			<p>Check if null is undefined (should return false):</p>
			<p>{JSON.stringify(isUndefined(null))}</p>
		</div>
	);
};

export const NumberValue = () => {
	return (
		<div>
			<p>Check if 42 is undefined (should return false):</p>
			<p>{JSON.stringify(isUndefined(42))}</p>
		</div>
	);
};

export const StringValue = () => {
	return (
		<div>
			<p>Check if 'hello' is undefined (should return false):</p>
			<p>{JSON.stringify(isUndefined('hello'))}</p>
		</div>
	);
};

export const ObjectValue = () => {
	return (
		<div>
			<p>Check if an object is undefined (should return false):</p>
			<p>{JSON.stringify(isUndefined({}))}</p>
		</div>
	);
};

export const ArrayValue = () => {
	return (
		<div>
			<p>Check if an array is undefined (should return false):</p>
			<p>{JSON.stringify(isUndefined([]))}</p>
		</div>
	);
};

export const BooleanValue = () => {
	return (
		<div>
			<p>Check if true is undefined (should return false):</p>
			<p>{JSON.stringify(isUndefined(true))}</p>
		</div>
	);
};

export const UndefinedInVariable = () => {
	let someVar: undefined;
	return (
		<div>
			<p>Check if variable with undefined value is undefined (should return true):</p>
			<p>{JSON.stringify(isUndefined(someVar))}</p>
		</div>
	);
};
