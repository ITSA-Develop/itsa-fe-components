import { isRouteActive } from '@/helpers/strings';

const meta = {
	title: 'Helpers/Strings/isRouteActive',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **isRouteActive** verifica si una ruta actual está activa respecto a una ruta base.

- Normaliza las rutas para ignorar barras finales (/).
- Retorna true si la ruta actual es exactamente la ruta base o una subruta de ésta.

* Ejemplos:

\`\`\`ts
isRouteActive('/users/42', '/users'); // true
isRouteActive('/users', '/users');    // true
isRouteActive('/users', '/users/42'); // false
\`\`\`
        `,
			},
		},
	},
	argTypes: {},
};

export default meta;

export const ExactMatch = () => {
	const currentPath = '/dashboard';
	const baseRoute = '/dashboard';
	const result = isRouteActive(currentPath, baseRoute);

	return (
		<div>
			<p>
				Ruta actual: <code>{currentPath}</code>
			</p>
			<p>
				Ruta base: <code>{baseRoute}</code>
			</p>
			<p>¿Está activa?: {result ? '✅ Sí' : '❌ No'}</p>
		</div>
	);
};

export const SubRouteMatch = () => {
	const currentPath = '/users/42/profile';
	const baseRoute = '/users/42';
	const result = isRouteActive(currentPath, baseRoute);

	return (
		<div>
			<p>
				Ruta actual: <code>{currentPath}</code>
			</p>
			<p>
				Ruta base: <code>{baseRoute}</code>
			</p>
			<p>¿Está activa?: {result ? '✅ Sí' : '❌ No'}</p>
		</div>
	);
};

export const NoMatch = () => {
	const currentPath = '/users/42';
	const baseRoute = '/settings';
	const result = isRouteActive(currentPath, baseRoute);

	return (
		<div>
			<p>
				Ruta actual: <code>{currentPath}</code>
			</p>
			<p>
				Ruta base: <code>{baseRoute}</code>
			</p>
			<p>¿Está activa?: {result ? '✅ Sí' : '❌ No'}</p>
		</div>
	);
};

export const TrailingSlashes = () => {
	const currentPath = '/users/42/';
	const baseRoute = '/users/42';
	const result = isRouteActive(currentPath, baseRoute);

	return (
		<div>
			<p>
				Ruta actual con barra al final: <code>{currentPath}</code>
			</p>
			<p>
				Ruta base sin barra final: <code>{baseRoute}</code>
			</p>
			<p>¿Está activa?: {result ? '✅ Sí' : '❌ No'}</p>
		</div>
	);
};
