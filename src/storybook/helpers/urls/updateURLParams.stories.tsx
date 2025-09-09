import { updateURLParams } from '@/helpers/urls';
import { useState } from 'react';

const meta = {
	title: 'Helpers/Urls/updateURLParams',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **updateURLParams** actualiza la URL del navegador con nuevos parámetros de consulta basados en un objeto de filtros.

- Usa \`buildQueryParams\` para construir la query string.
- Actualiza la URL sin recargar la página usando \`window.history.replaceState\`.
- Mantiene la ruta actual y añade o reemplaza los parámetros de búsqueda.

* Ejemplo de uso:

\`\`\`ts
updateURLParams({ page: 2, search: 'books' });
// Cambia la URL a "/rutaActual?page=2&search=books" sin recargar la página
\`\`\`
        `,
			},
		},
	},
	argTypes: {
		filters: {
			control: 'object',
			description: 'Filtros para actualizar la URL',
			defaultValue: { page: 1, search: 'example' },
		},
	},
};

export default meta;

export const UpdateURLExample = ({ filters = { page: 1, search: 'example' } }) => {
	const [currentFilters] = useState(filters);

	const handleUpdate = () => {
		updateURLParams(currentFilters);
		alert(`URL actualizada a: ${window.location.href}`);
	};

	return (
		<div>
			<p>Filtros actuales:</p>
			<pre>{JSON.stringify(currentFilters, null, 2)}</pre>

			<button onClick={handleUpdate}>Actualizar URL con filtros</button>

			<p>
				Después de hacer clic, revisa la barra de direcciones para ver los parámetros de consulta actualizados sin
				recargar.
			</p>
		</div>
	);
};
