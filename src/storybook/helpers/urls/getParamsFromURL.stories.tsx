import { getParamsFromURL } from '@/helpers/urls';
import { useEffect, useState } from 'react';

const meta = {
	title: 'Helpers/Urls/getParamsFromURL',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **getParamsFromURL** obtiene todos los parámetros de consulta (query params) de la URL actual del navegador y los devuelve como un objeto clave-valor.

* Ejemplo:

\`\`\`ts
// Si la URL es: https://example.com?page=2&search=books
getParamsFromURL(); 
// Resultado: { page: '2', search: 'books' }
\`\`\`
        `,
			},
		},
	},
	argTypes: {},
};

export default meta;

export const DefaultExample = () => {
	const [params, setParams] = useState<Record<string, string>>({});

	useEffect(() => {
		setParams(getParamsFromURL());
	}, []);

	return (
		<div>
			<p>Parámetros obtenidos de la URL actual:</p>
			<pre>{JSON.stringify(params, null, 2)}</pre>
			<p>Prueba cambiando los parámetros en la barra de direcciones y recargando esta página para ver el efecto.</p>
		</div>
	);
};
