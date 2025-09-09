import { getFormattedFieldValue } from '../../../helpers/formats';

const formattersDescription = `
El objeto **formatters** define funciones para formatear valores según el tipo de campo (\`TFieldDisplayType\`).

- \`text\`: devuelve el valor tal cual.  
- \`dropdown\`: busca la etiqueta correspondiente al valor en \`populateValue\`.  
- \`radio\`: devuelve la propiedad \`label\` del valor si existe.  
- \`currency\`: devuelve el valor tal cual (se podría mejorar).  
- \`checkbox\`: devuelve 'Sí' si el valor es truthy, 'No' si no.

La función **getFormattedFieldValue** recibe:  
- \`key\`: tipo del campo.  
- \`value\`: valor a formatear.  
- \`populateValue\`: datos auxiliares para formatear (usados en dropdown).

Retorna la cadena formateada correspondiente o el valor convertido a string si no hay formateador.
`;

const meta = {
	title: 'Helpers/Formats/getFormattedFieldValue',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: formattersDescription,
			},
		},
	},
	argTypes: {},
};

export default meta;

const exampleDropdownOptions = [
	{ value: '1', label: 'Opción 1' },
	{ value: '2', label: 'Opción 2' },
	{ value: '3', label: 'Opción 3' },
];

export const FormatText = () => (
	<div>
		<p>Formato texto:</p>
		<p>{getFormattedFieldValue('text', 'Hola Mundo', null)}</p>
	</div>
);

export const FormatDropdown = () => (
	<div>
		<p>Formato dropdown:</p>
		<p>{getFormattedFieldValue('dropdown', '2', exampleDropdownOptions)}</p>
	</div>
);

export const FormatRadio = () => (
	<div>
		<p>Formato radio:</p>
		<p>{getFormattedFieldValue('radio', { label: 'Opción Seleccionada' }, null)}</p>
	</div>
);

export const FormatCurrency = () => (
	<div>
		<p>Formato currency:</p>
		<p>{getFormattedFieldValue('currency', '$123.45', null)}</p>
	</div>
);

export const FormatCheckboxTrue = () => (
	<div>
		<p>Formato checkbox (true):</p>
		<p>{getFormattedFieldValue('checkbox', true, null)}</p>
	</div>
);

export const FormatCheckboxFalse = () => (
	<div>
		<p>Formato checkbox (false):</p>
		<p>{getFormattedFieldValue('checkbox', false, null)}</p>
	</div>
);

export const FormatUnknownKey = () => (
	<div>
		<p>Formato con tipo desconocido (debe convertir a string):</p>
		<p>{getFormattedFieldValue('unknown' as any, 12345, null)}</p>
	</div>
);
