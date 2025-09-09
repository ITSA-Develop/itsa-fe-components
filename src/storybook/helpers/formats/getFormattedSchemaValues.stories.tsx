import { getFormattedSchemaValues } from '../../../helpers/formats';
import { IEntitySchema, TFieldDisplayType } from '../../../types/schema';

const meta = {
	title: 'Helpers/Formats/getFormattedSchemaValues',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **getFormattedSchemaValues** recibe:  
- \`elem\`: un objeto con datos sin formatear.  
- \`schema\`: un esquema que define los campos y sus tipos (\`TFieldDisplayType\`).  
- \`populate\`: opcional, datos para campos que requieren opciones (como dropdowns).

Retorna un objeto con los mismos campos pero con los valores ya formateados según el tipo definido, usando internamente \`getFormattedFieldValue\`.

* Ejemplo:

\`\`\`ts
const elem = {
  name: 'Juan',
  active: true,
  role: '2',
  salary: '$1000',
};

const schema = {
  fields: {
    name: { type: 'text' },
    active: { type: 'checkbox' },
    role: { type: 'dropdown' },
    salary: { type: 'currency' },
  },
};

const populate = {
  role: [
    { value: '1', label: 'Admin' },
    { value: '2', label: 'User' },
  ],
};

getFormattedSchemaValues(elem, schema, populate);
// {
//   name: 'Juan',
//   active: 'Sí',
//   role: 'User',
//   salary: '$1000',
// }
\`\`\`
				`,
			},
		},
	},
	argTypes: {},
};

export default meta;

const exampleElem = {
	name: 'Juan',
	active: true,
	role: '2',
	salary: '$1000',
};

const exampleSchema: IEntitySchema = {
	fields: {
		name: { type: 'text' as TFieldDisplayType },
		active: { type: 'checkbox' as TFieldDisplayType },
		role: { type: 'dropdown' as TFieldDisplayType },
		salary: { type: 'currency' as TFieldDisplayType },
	},
};

const examplePopulate = {
	role: [
		{ value: '1', label: 'Admin' },
		{ value: '2', label: 'User' },
	],
};

export const ExampleFormattedValues = () => {
	const formatted = getFormattedSchemaValues(exampleElem, exampleSchema, examplePopulate);

	return (
		<div>
			<p>Datos originales:</p>
			<pre>{JSON.stringify(exampleElem, null, 2)}</pre>

			<p>Datos formateados según esquema:</p>
			<pre>{JSON.stringify(formatted, null, 2)}</pre>
		</div>
	);
};
