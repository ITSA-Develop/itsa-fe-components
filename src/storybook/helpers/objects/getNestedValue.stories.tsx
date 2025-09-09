import { getNestedValue } from '../../../helpers/objects';

const meta = {
	title: 'Helpers/Objects/getNestedValue',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **getNestedValue** obtiene un valor anidado dentro de un objeto usando una ruta (path) en forma de cadena separada por puntos o un arreglo de strings.

- Si el valor no existe, retorna un valor por defecto opcional.
- Soporta tipos genéricos para mejorar la inferencia de tipos.

* Ejemplos:

\`\`\`ts
const obj = {
  user: {
    profile: {
      name: 'Juan',
    },
  },
};

getNestedValue(obj, 'user.profile.name'); // 'Juan'
getNestedValue(obj, ['user', 'profile', 'age'], 30); // 30 (default porque no existe)
\`\`\`
        `,
			},
		},
	},
	argTypes: {},
};

export default meta;

const exampleObj = {
	user: {
		profile: {
			name: 'Juan',
			age: 28,
		},
		settings: {
			theme: 'dark',
		},
	},
};

export const GetExistingValue = () => {
	const name = getNestedValue(exampleObj, 'user.profile.name');
	return (
		<div>
			<p>Objeto:</p>
			<pre>{JSON.stringify(exampleObj, null, 2)}</pre>

			<p>Valor en 'user.profile.name': {name}</p>
		</div>
	);
};

export const GetNonExistingValueWithDefault = () => {
	const country = getNestedValue(exampleObj, ['user', 'profile', 'country'], 'Unknown');
	return (
		<div>
			<p>Objeto:</p>
			<pre>{JSON.stringify(exampleObj, null, 2)}</pre>

			<p>Valor en 'user.profile.country' (no existe, default 'Unknown'):</p>
			<pre>{country}</pre>
		</div>
	);
};

export const GetNonExistingValueWithoutDefault = () => {
	const city = getNestedValue(exampleObj, 'user.address.city');
	return (
		<div>
			<p>Objeto:</p>
			<pre>{JSON.stringify(exampleObj, null, 2)}</pre>

			<p>Valor en 'user.address.city' (no existe, sin default):</p>
			<pre>{String(city)}</pre>
		</div>
	);
};
