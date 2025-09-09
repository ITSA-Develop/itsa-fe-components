import { getSchemaColumns } from '../../../helpers/formats';
import { IEntitySchema } from '../../../types/schema';

const meta = {
	title: 'Helpers/Formats/getSchemaColumns',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **getSchemaColumns** recibe un esquema \`IEntitySchema\` y devuelve un arreglo de strings con las etiquetas (\`label\`) de los campos que no tengan \`excludeFromColumns\` en true.

Finalmente, agrega la cadena \`'actions'\` al final del arreglo para representar la columna de acciones.

* Ejemplo:

\`\`\`ts
const schema = {
  fields: {
    name: { label: 'Nombre', excludeFromColumns: false },
    age: { label: 'Edad', excludeFromColumns: true },
    email: { label: 'Correo', excludeFromColumns: false },
  },
};

getSchemaColumns(schema); // ['Nombre', 'Correo', 'actions']
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
		name: { type: 'text', label: 'Nombre', excludeFromColumns: false },
		age: { type: 'number', label: 'Edad', excludeFromColumns: true },
		email: { type: 'text', label: 'Correo', excludeFromColumns: false },
		phone: { type: 'text', label: undefined, excludeFromColumns: false },
	},
};

export const ExampleColumns = () => {
	const columns = getSchemaColumns(exampleSchema);

	return (
		<div>
			<p>Esquema original:</p>
			<pre>{JSON.stringify(exampleSchema, null, 2)}</pre>

			<p>Columnas resultantes:</p>
			<pre>{JSON.stringify(columns, null, 2)}</pre>
		</div>
	);
};
