import { capitalize } from '@/helpers/strings';

const meta = {
	title: 'Helpers/Strings/capitalize',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **capitalize** transforma una cadena de texto para que la primera letra sea mayúscula y el resto minúsculas.

* Ejemplos:

\`\`\`ts
capitalize('hola');    // 'Hola'
capitalize('mUNDO');   // 'Mundo'
capitalize('typescript'); // 'Typescript'
\`\`\`
        `,
			},
		},
	},
	argTypes: {
		input: {
			control: 'text',
			description: 'Cadena de texto a capitalizar',
			defaultValue: 'ejemplo',
		},
	},
};

export default meta;

export const DefaultExample = ({ input = 'ejemplo' }: { input?: string }) => {
	return (
		<div>
			<p>
				Entrada: <code>{input}</code>
			</p>
			<p>
				Resultado: <strong>{capitalize(input)}</strong>
			</p>
		</div>
	);
};
