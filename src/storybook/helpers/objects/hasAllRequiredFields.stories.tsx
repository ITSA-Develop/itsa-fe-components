import { hasAllRequiredFields } from '../../../helpers/objects';

const meta = {
	title: 'Helpers/Objects/hasAllRequiredFields',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **hasAllRequiredFields** verifica si un objeto contiene todos los campos requeridos con valores válidos.

- Retorna **false** si alguno de los campos está **null**, **undefined**, es una cadena vacía o un arreglo vacío.
- Retorna **true** si todos los campos requeridos tienen valores no vacíos.

* Ejemplo:

\`\`\`ts
const values = {
  name: 'Juan',
  email: 'juan@example.com',
  tags: ['admin'],
};

const requiredFields = ['name', 'email'];

hasAllRequiredFields(values, requiredFields); // true
\`\`\`
        `,
			},
		},
	},
	argTypes: {},
};

export default meta;

export const AllFieldsPresent = () => {
	const values = {
		name: 'Juan',
		email: 'juan@example.com',
		tags: ['admin'],
	};
	const requiredFields = ['name', 'email'];

	return (
		<div>
			<p>Valores:</p>
			<pre>{JSON.stringify(values, null, 2)}</pre>

			<p>Campos requeridos:</p>
			<pre>{JSON.stringify(requiredFields, null, 2)}</pre>

			<p>Resultado: {hasAllRequiredFields(values, requiredFields) ? '✅ True' : '❌ False'}</p>
		</div>
	);
};

export const MissingFieldNull = () => {
	const values = {
		name: 'Juan',
		email: null,
		tags: ['admin'],
	};
	const requiredFields = ['name', 'email'];

	return (
		<div>
			<p>Valores (email es null):</p>
			<pre>{JSON.stringify(values, null, 2)}</pre>

			<p>Resultado: {hasAllRequiredFields(values, requiredFields) ? '✅ True' : '❌ False'}</p>
		</div>
	);
};

export const EmptyStringField = () => {
	const values = {
		name: 'Juan',
		email: '   ',
		tags: ['admin'],
	};
	const requiredFields = ['name', 'email'];

	return (
		<div>
			<p>Valores (email es cadena vacía con espacios):</p>
			<pre>{JSON.stringify(values, null, 2)}</pre>

			<p>Resultado: {hasAllRequiredFields(values, requiredFields) ? '✅ True' : '❌ False'}</p>
		</div>
	);
};

export const EmptyArrayField = () => {
	const values = {
		name: 'Juan',
		email: 'juan@example.com',
		tags: [],
	};
	const requiredFields = ['name', 'tags'];

	return (
		<div>
			<p>Valores (tags es arreglo vacío):</p>
			<pre>{JSON.stringify(values, null, 2)}</pre>

			<p>Resultado: {hasAllRequiredFields(values, requiredFields) ? '✅ True' : '❌ False'}</p>
		</div>
	);
};
