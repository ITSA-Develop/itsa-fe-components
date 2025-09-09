import { buildQueryParams } from '@/helpers/urls';

const meta = {
	title: 'Helpers/Urls/buildQueryParams',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **buildQueryParams** construye una cadena de parámetros URL (query string) a partir de un objeto de filtros.

- Ignora valores \`undefined\`, \`null\` o cadenas vacías.
- Codifica correctamente las claves y valores para la URL.

* Ejemplo:

\`\`\`ts
const filters = {
  search: 'books',
  page: 2,
  category: '',
  price: null,
  inStock: true,
};

buildQueryParams(filters);
// Resultado: "search=books&page=2&inStock=true"
\`\`\`
        `,
			},
		},
	},
	argTypes: {
		filters: {
			control: 'object',
			description: 'Objeto con los filtros para construir la query string',
			defaultValue: {
				search: 'books',
				page: 2,
				category: '',
				price: null,
				inStock: true,
			},
		},
	},
};

export default meta;

export const DefaultExample = ({
	filters = { search: 'books', page: 2, category: '', price: null, inStock: true },
}) => {
	const queryString = buildQueryParams(filters);

	return (
		<div>
			<p>Filtros de entrada:</p>
			<pre>{JSON.stringify(filters, null, 2)}</pre>

			<p>Query string resultante:</p>
			<code>{queryString}</code>
		</div>
	);
};
