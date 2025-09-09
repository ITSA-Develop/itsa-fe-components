import { fillRoute } from '@/helpers/urls';

const meta = {
	title: 'Helpers/Urls/fillRoute',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **fillRoute** genera una URL dinámica a partir de una plantilla de ruta (\`routeName\`) y un conjunto de parámetros (\`params\`).

- Reemplaza parámetros nombrados en la ruta con valores dados.
- Si un parámetro es \`null\` o \`undefined\`, lo elimina de la ruta.
- Si hay parámetros de búsqueda (\`search\`), los añade como query string codificada.
- Opcionalmente, puede abrir la URL generada en una nueva pestaña (si \`isOpenInNewTab\` es \`true\`).

* Ejemplos:

\`\`\`ts
fillRoute('/users/:userId/details/:detailId', { userId: 42, detailId: 99 });
// Resultado: '/users/42/details/99'

fillRoute('/search/:category', {
  category: 'books',
  search: { filter: 'new', sortBy: 'price' },
});
// Resultado: '/search/books?filter=new&sortBy=price'

fillRoute('/posts/:postId?', { postId: null });
// Resultado: '/posts'
\`\`\`
        `,
			},
		},
	},
	argTypes: {
		routeName: {
			control: 'text',
			description: 'Plantilla de ruta con parámetros, e.g. "/users/:userId"',
			defaultValue: '/users/:userId/details/:detailId',
		},
		params: {
			control: 'object',
			description: 'Objeto con valores para reemplazar los parámetros de la ruta',
			defaultValue: { userId: 42, detailId: 99 },
		},
		isOpenInNewTab: {
			control: 'boolean',
			description: 'Si es true, abre la URL generada en una nueva pestaña',
			defaultValue: false,
		},
	},
};

export default meta;

export const DefaultExample = ({
	routeName = '/users/:userId/details/:detailId',
	params = { userId: 42, detailId: 99 },
	isOpenInNewTab = false,
}: {
	routeName?: string;
	params?: Record<string, any>;
	isOpenInNewTab?: boolean;
}) => {
	const output = fillRoute(routeName, params, isOpenInNewTab);

	return (
		<div>
			<p>
				<strong>Ruta plantilla:</strong> <code>{routeName}</code>
			</p>
			<p>
				<strong>Parámetros:</strong> <pre>{JSON.stringify(params, null, 2)}</pre>
			</p>
			<p>
				<strong>Abrir en nueva pestaña:</strong> {isOpenInNewTab ? 'Sí' : 'No'}
			</p>
			<p>
				<strong>Ruta resultante:</strong> <code>{output || '(Abierto en nueva pestaña)'}</code>
			</p>
		</div>
	);
};
