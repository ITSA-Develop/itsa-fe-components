import { cleanPath } from '@/helpers/urls';

const meta = {
	title: 'Helpers/Urls/cleanPath',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **cleanPath** elimina del final de una ruta las palabras '/crear', '/editar' o '/detalles', si están presentes.

* Ejemplos:

\`\`\`ts
cleanPath('/usuarios/crear');    // '/usuarios'
cleanPath('/productos/editar');  // '/productos'
cleanPath('/pedidos/detalles');  // '/pedidos'
cleanPath('/dashboard');          // '/dashboard' (sin cambios)
\`\`\`
        `,
			},
		},
	},
	argTypes: {
		path: {
			control: 'text',
			description: 'Ruta a limpiar',
			defaultValue: '/usuarios/crear',
		},
	},
};

export default meta;

export const DefaultExample = ({ path = '/usuarios/crear' }: { path?: string }) => {
	const cleaned = cleanPath(path);

	return (
		<div>
			<p>
				Ruta original: <code>{path}</code>
			</p>
			<p>
				Ruta limpia: <strong>{cleaned}</strong>
			</p>
		</div>
	);
};
