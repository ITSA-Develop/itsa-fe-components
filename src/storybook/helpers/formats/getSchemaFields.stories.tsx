import { getSchemaFields } from '../../../helpers/formats';
import { IEntitySchema } from '../../../types/schema';

const meta = {
	title: 'Helpers/Formats/getSchemaFields',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **getSchemaFields** recibe un esquema \`IEntitySchema\` y devuelve un arreglo con los nombres (keys) de los campos que no tengan \`excludeFromFields\` como true.

Finalmente, agrega la cadena \`'actions'\` al final del arreglo.

* Ejemplo:

\`\`\`ts
const schema = {
  fields: {
    name: { type: 'text', excludeFromFields: false },
    age: { type: 'number', excludeFromFields: true },
    email: { type: 'text', excludeFromFields: false },
  },
};

getSchemaFields(schema); // ['name', 'email', 'actions']
\`\`\`
				`,
			},
		},
	},
	argTypes: {},
};

export default meta;

const exampleSchema: IEntitySchema = {
	fields: {
		name: { type: 'text', excludeFromFields: false },
		age: { type: 'number', excludeFromFields: true },
		email: { type: 'text', excludeFromFields: false },
		phone: { type: 'text', excludeFromFields: false },
	},
};

export const ExampleFields = () => {
	const fields = getSchemaFields(exampleSchema);

	return (
		<div>
			<p>Esquema original:</p>
			<pre>{JSON.stringify(exampleSchema, null, 2)}</pre>

			<p>Campos resultantes:</p>
			<pre>{JSON.stringify(fields, null, 2)}</pre>
		</div>
	);
};
