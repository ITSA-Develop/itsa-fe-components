import { isValidEmailFormat } from '../../../helpers/booleansChecks';

const meta = {
	title: 'Helpers/BooleanChecks/isValidEmailFormat',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **isValidEmailFormat** valida si una cadena de texto tiene un formato de correo electrónico correcto.

Usa la expresión regular definida en \`REGEX_FORMATS.email\` para hacer la validación.

Retorna \`true\` si el formato es válido, \`false\` en caso contrario.

* Ejemplos:

isValidEmailFormat('usuario@dominio.com') // true  
isValidEmailFormat('usuario@dominio') // false  
isValidEmailFormat('usuario.com') // false  
isValidEmailFormat('test@mail.co') // true
`,
			},
		},
	},
	argTypes: {},
};

export default meta;

export const ValidEmail = () => {
	return (
		<div>
			<p>Email válido:</p>
			<p>{String(isValidEmailFormat('usuario@dominio.com'))}</p>
		</div>
	);
};

export const InvalidEmailMissingTLD = () => {
	return (
		<div>
			<p>Email inválido (falta dominio de nivel superior):</p>
			<p>{String(isValidEmailFormat('usuario@dominio'))}</p>
		</div>
	);
};

export const InvalidEmailMissingAt = () => {
	return (
		<div>
			<p>Email inválido (falta @):</p>
			<p>{String(isValidEmailFormat('usuario.com'))}</p>
		</div>
	);
};

export const ValidShortDomain = () => {
	return (
		<div>
			<p>Email válido (dominio corto):</p>
			<p>{String(isValidEmailFormat('test@mail.co'))}</p>
		</div>
	);
};
