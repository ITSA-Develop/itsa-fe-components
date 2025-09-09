import { getQueryParam } from '@/helpers/urls';

const meta = {
	title: 'Helpers/Urls/getQueryParam',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **getQueryParam** obtiene el valor de un parámetro de consulta (query param) dado su nombre desde una URL.

- Por defecto toma la URL actual del navegador.
- Si la URL es inválida o el parámetro no existe, retorna \`null\`.

* Ejemplos:

\`\`\`ts
getQueryParam('id', 'https://example.com?page=2&id=42'); // '42'
getQueryParam('missing', 'https://example.com?page=2'); // null
\`\`\`
        `,
			},
		},
	},
	argTypes: {
		param: { control: 'text', description: 'Nombre del parámetro a obtener', defaultValue: 'id' },
		url: {
			control: 'text',
			description: 'URL donde buscar el parámetro',
			defaultValue: 'https://example.com?page=2&id=42',
		},
	},
};

export default meta;

export const DefaultExample = ({
	param = 'id',
	url = 'https://example.com?page=2&id=42',
}: {
	param?: string;
	url?: string;
}) => {
	const value = getQueryParam(param, url);

	return (
		<div>
			<p>
				URL: <code>{url}</code>
			</p>
			<p>
				Parámetro: <code>{param}</code>
			</p>
			<p>
				Valor obtenido: <strong>{value ?? 'null'}</strong>
			</p>
		</div>
	);
};
