import { getFormattedAddress } from '../../../helpers/formats';

const meta = {
	title: 'Helpers/Formats/getFormattedAddress',
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
La función **getFormattedAddress** construye una dirección en formato cadena concatenando las partes recibidas:  
- Calle principal y número  
- Parroquia (opcional)  
- Cantón  
- Provincia  

Las partes que sean \`undefined\` o \`null\` se omiten en el resultado.

* Ejemplo:

getFormattedAddress({  
  principalStreet: 'Av. Siempre Viva',  
  streetNumber: '742',  
  parish: 'Centro',  
  canton: 'Cuenca',  
  province: 'Azuay'  
})  

// "Av. Siempre Viva 742, Centro, Cuenca, Azuay"
`,
			},
		},
	},
	argTypes: {},
};

export default meta;

export const WithParish = () => {
	return (
		<div>
			<p>Dirección con parroquia:</p>
			<p>
				{getFormattedAddress({
					principalStreet: 'Av. Siempre Viva',
					streetNumber: '742',
					parish: 'Centro',
					canton: 'Cuenca',
					province: 'Azuay',
				})}
			</p>
		</div>
	);
};

export const WithoutParish = () => {
	return (
		<div>
			<p>Dirección sin parroquia:</p>
			<p>
				{getFormattedAddress({
					principalStreet: 'Av. Los Pinos',
					streetNumber: '123',
					canton: 'Cuenca',
					province: 'Azuay',
				})}
			</p>
		</div>
	);
};

export const MinimalAddress = () => {
	return (
		<div>
			<p>Dirección mínima (solo lo obligatorio):</p>
			<p>
				{getFormattedAddress({
					principalStreet: 'Calle Falsa',
					streetNumber: '0',
					canton: 'Guayaquil',
					province: 'Guayas',
				})}
			</p>
		</div>
	);
};
