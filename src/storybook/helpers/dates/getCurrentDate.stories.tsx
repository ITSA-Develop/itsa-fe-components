import { getCurrentDate } from '../../../helpers/dates';

const meta = {
	title: 'Helpers/Dates/getCurrentDate',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **getCurrentDate** obtiene la fecha y hora actual formateada en formato ISO 8601.

Utiliza la librería \`dayjs\` para obtener y formatear la fecha actual.

* Ejemplo de salida:

"2025-08-09T20:45:00-05:00"
`,
			},
		},
	},
	argTypes: {},
};

export default meta;

export const CurrentDate = () => {
	return (
		<div>
			<p>Fecha y hora actual (formato ISO 8601):</p>
			<p>{getCurrentDate()}</p>
		</div>
	);
};
