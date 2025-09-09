import { toTitleCase } from '@/helpers/strings';

const meta = {
	title: 'Helpers/Strings/toTitleCase',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **toTitleCase** convierte una cadena para que la primera letra de cada palabra sea mayúscula y el resto minúscula.

* Ejemplos:

\`\`\`ts
toTitleCase('hola mundo');       // 'Hola Mundo'
toTitleCase('typescript esta cool'); // 'Typescript Esta Cool'
toTitleCase('ESTE ES UN TITULO');    // 'Este Es Un Titulo'
\`\`\`
        `,
			},
		},
	},
	argTypes: {
		input: {
			control: 'text',
			description: 'Cadena de texto a convertir a Title Case',
			defaultValue: 'ejemplo de texto',
		},
	},
};

export default meta;

export const DefaultExample = ({ input = 'ejemplo de texto' }: { input?: string }) => {
	return (
		<div>
			<p>
				Entrada: <code>{input}</code>
			</p>
			<p>
				Resultado: <strong>{toTitleCase(input)}</strong>
			</p>
		</div>
	);
};
