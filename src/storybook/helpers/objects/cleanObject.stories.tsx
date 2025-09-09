import { cleanObject } from '../../../helpers/objects';

const meta = {
	title: 'Helpers/Objects/cleanObject',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **cleanObject** elimina recursivamente propiedades con valores vacíos (null, undefined, strings vacíos, arrays u objetos vacíos) de un objeto o arreglo.

- Si el argumento no es objeto o es null, lo retorna tal cual.  
- Para objetos o arrays, elimina las propiedades que son vacías, aplicando limpieza recursiva a propiedades anidadas.

* Ejemplo:

\`\`\`ts
const dirty = {
  name: 'Juan',
  age: null,
  contact: {
    email: '',
    phone: '123456',
  },
  tags: ['', 'developer', null],
};

cleanObject(dirty);

// Resultado:
// {
//   name: 'Juan',
//   contact: {
//     phone: '123456',
//   },
//   tags: ['developer']
// }
\`\`\`
				`,
			},
		},
	},
	argTypes: {},
};

export default meta;

export const ExampleCleanObject = () => {
	const dirtyObject = {
		name: 'Juan',
		age: null,
		contact: {
			email: '',
			phone: '123456',
			address: {
				street: '',
				number: null,
			},
		},
		tags: ['', 'developer', null],
	};

	const cleaned = cleanObject(dirtyObject);

	return (
		<div>
			<p>Objeto original:</p>
			<pre>{JSON.stringify(dirtyObject, null, 2)}</pre>

			<p>Objeto limpiado:</p>
			<pre>{JSON.stringify(cleaned, null, 2)}</pre>
		</div>
	);
};
