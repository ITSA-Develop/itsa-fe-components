import { clearURLParams } from '@/helpers/urls';
import { useState } from 'react';

const meta = {
	title: 'Helpers/Urls/clearURLParams',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **clearURLParams** elimina todos los parámetros de consulta (query params) de la URL actual sin recargar la página.

- Utiliza \`window.history.replaceState\` para actualizar la URL.
- Mantiene el path y el hash intactos.

* Ejemplo:

\`\`\`ts
// URL actual: https://example.com/page?search=books&page=2
clearURLParams();
// URL actualizada: https://example.com/page
\`\`\`
        `,
			},
		},
	},
	argTypes: {},
};

export default meta;

export const ClearParamsExample = () => {
	const [currentURL, setCurrentURL] = useState(window.location.href);

	const handleClear = () => {
		clearURLParams();
		setCurrentURL(window.location.href);
		alert('Parámetros de la URL eliminados.');
	};

	return (
		<div>
			<p>URL actual:</p>
			<code>{currentURL}</code>
			<br />
			<button onClick={handleClear}>Limpiar parámetros de URL</button>
			<p>Después de hacer clic, la URL mostrada arriba se actualizará sin parámetros de consulta.</p>
		</div>
	);
};
