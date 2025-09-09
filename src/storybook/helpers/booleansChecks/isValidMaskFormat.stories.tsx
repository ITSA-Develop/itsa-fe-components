import { isValidMaskFormat } from '../../../helpers/booleansChecks';

const meta = {
	title: 'Helpers/BooleanChecks/isValidMaskFormat',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **isValidMaskFormat** verifica si una cadena cumple con un formato de máscara sin caracteres de subrayado ("\_").

Retorna:
- \`true\` → cuando la cadena **no contiene** el carácter "\_", indicando que la máscara está completa.
- \`false\` → cuando contiene "\_", indicando que la máscara está incompleta.

* Ejemplos:

isValidMaskFormat('123-45-6789') // true  
isValidMaskFormat('123-45-67__') // false  
isValidMaskFormat('abc_def') // false  
isValidMaskFormat('abcdef') // true
`,
			},
		},
	},
	argTypes: {},
};

export default meta;

export const CompleteMaskNumbers = () => {
	return (
		<div>
			<p>Formato de máscara completo (números):</p>
			<p>{String(isValidMaskFormat('123-45-6789'))}</p>
		</div>
	);
};

export const IncompleteMaskNumbers = () => {
	return (
		<div>
			<p>Formato de máscara incompleto (números con "_"):</p>
			<p>{String(isValidMaskFormat('123-45-67__'))}</p>
		</div>
	);
};

export const IncompleteMaskLetters = () => {
	return (
		<div>
			<p>Formato de máscara incompleto (letras con "_"):</p>
			<p>{String(isValidMaskFormat('abc_def'))}</p>
		</div>
	);
};

export const CompleteMaskLetters = () => {
	return (
		<div>
			<p>Formato de máscara completo (solo letras):</p>
			<p>{String(isValidMaskFormat('abcdef'))}</p>
		</div>
	);
};
