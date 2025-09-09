import { getFormatCurrency } from '../../../helpers/currencies';

const meta = {
	title: 'Helpers/Currencies/getFormatCurrency',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **getFormatCurrency** formatea un número como una cadena con formato de moneda en dólares estadounidenses (USD).

Utiliza la API \`Intl.NumberFormat\` con las siguientes opciones:  
- Estilo: \`currency\`  
- Moneda: \`USD\`  
- Dos decimales fijos

* Ejemplos:

getFormatCurrency(1234.5) // "$1,234.50"  
getFormatCurrency(0) // "$0.00"  
getFormatCurrency(1000000) // "$1,000,000.00"  
getFormatCurrency(-25.99) // "-$25.99"
`,
			},
		},
	},
	argTypes: {},
};

export default meta;

export const FormatPositiveNumber = () => {
	return (
		<div>
			<p>Número positivo:</p>
			<p>{getFormatCurrency(1234.5)}</p>
		</div>
	);
};

export const FormatZero = () => {
	return (
		<div>
			<p>Cero:</p>
			<p>{getFormatCurrency(0)}</p>
		</div>
	);
};

export const FormatLargeNumber = () => {
	return (
		<div>
			<p>Número grande:</p>
			<p>{getFormatCurrency(1000000)}</p>
		</div>
	);
};

export const FormatNegativeNumber = () => {
	return (
		<div>
			<p>Número negativo:</p>
			<p>{getFormatCurrency(-25.99)}</p>
		</div>
	);
};
