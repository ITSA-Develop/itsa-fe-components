import { clearLocalStorage } from '@/helpers/session';

const meta = {
	title: 'Helpers/Session/clearLocalStorage',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **clearLocalStorage** permite eliminar un ítem específico de localStorage por su clave, o limpiar todo el localStorage si no se pasa ninguna clave.

- Si se proporciona \`key\`, elimina ese ítem específico.
- Si no se proporciona \`key\`, limpia todo el almacenamiento local.

* Ejemplos:

\`\`\`ts
clearLocalStorage('user');
clearLocalStorage();
\`\`\`
        `,
			},
		},
	},
	argTypes: {},
};

export default meta;

export const ClearSpecificKey = () => {
	const key = 'testKey';

	// Para mostrar el efecto, almacenamos algo
	localStorage.setItem(key, 'some value');

	return (
		<div>
			<p>
				Antes de limpiar la clave "{key}": {localStorage.getItem(key)}
			</p>
			<button
				onClick={() => {
					clearLocalStorage(key);
					alert(`Se eliminó la clave "${key}" de localStorage.`);
				}}
			>
				Eliminar clave "{key}"
			</button>
			<p>Después de eliminar, recarga la página para verificar.</p>
		</div>
	);
};

export const ClearAll = () => {
	// Guardamos algunas claves para probar
	localStorage.setItem('key1', 'value1');
	localStorage.setItem('key2', 'value2');

	return (
		<div>
			<p>Antes de limpiar todo localStorage:</p>
			<pre>
				{JSON.stringify(
					{
						key1: localStorage.getItem('key1'),
						key2: localStorage.getItem('key2'),
					},
					null,
					2,
				)}
			</pre>

			<button
				onClick={() => {
					clearLocalStorage();
					alert('Se limpió todo el localStorage.');
				}}
			>
				Limpiar todo localStorage
			</button>

			<p>Después de limpiar, recarga la página para verificar.</p>
		</div>
	);
};
