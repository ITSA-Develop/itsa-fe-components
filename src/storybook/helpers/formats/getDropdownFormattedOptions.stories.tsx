import { getDropdownFormattedOptions } from '../../../helpers/formats';

const meta = {
	title: 'Helpers/Formats/getDropdownFormattedOptions',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **getDropdownFormattedOptions** convierte un objeto con pares clave-valor en un arreglo de objetos con las propiedades \`value\` y \`label\`.

Esto es útil para preparar opciones para componentes de dropdown o select.

* Ejemplo:

const optionValues = {  
  '1': 'Opción Uno',  
  '2': 'Opción Dos',  
  '3': 'Opción Tres'  
};

getDropdownFormattedOptions(optionValues)  
// [  
//   { value: '1', label: 'Opción Uno' },  
//   { value: '2', label: 'Opción Dos' },  
//   { value: '3', label: 'Opción Tres' }  
// ]
`,
			},
		},
	},
	argTypes: {},
};

export default meta;

export const ExampleOptions = () => {
	const exampleInput = {
		'1': 'Opción Uno',
		'2': 'Opción Dos',
		'3': 'Opción Tres',
	};

	const formattedOptions = getDropdownFormattedOptions(exampleInput);

	return (
		<div>
			<p>Objeto original:</p>
			<pre>{JSON.stringify(exampleInput, null, 2)}</pre>

			<p>Opciones formateadas para dropdown:</p>
			<pre>{JSON.stringify(formattedOptions, null, 2)}</pre>
		</div>
	);
};
