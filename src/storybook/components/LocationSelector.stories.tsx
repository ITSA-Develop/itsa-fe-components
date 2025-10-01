import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LocationSelector, ILocationSelectorProps } from '../../components/LocationSelector';

// Mock data para las opciones de ubicación
const mockLocationOptions = {
	countriesOpts: [
		{ label: 'Ecuador', value: 1, valueCountryCode: 'EC' },
		{ label: 'Colombia', value: 2, valueCountryCode: 'CO' },
		{ label: 'Perú', value: 3, valueCountryCode: 'PE' },
		{ label: 'México', value: 4, valueCountryCode: 'MX' },
		{ label: 'Argentina', value: 5, valueCountryCode: 'AR' },
	],
	provincesOpts: [
		{ label: 'Pichincha', value: 1, countryID: 1 },
		{ label: 'Guayas', value: 2, countryID: 1 },
		{ label: 'Azuay', value: 3, countryID: 1 },
		{ label: 'Manabí', value: 4, countryID: 1 },
		{ label: 'El Oro', value: 5, countryID: 1 },
		{ label: 'Los Ríos', value: 6, countryID: 1 },
		{ label: 'Esmeraldas', value: 7, countryID: 1 },
		{ label: 'Santo Domingo de los Tsáchilas', value: 8, countryID: 1 },
		{ label: 'Santa Elena', value: 9, countryID: 1 },
		{ label: 'Tungurahua', value: 10, countryID: 1 },
		{ label: 'Chimborazo', value: 11, countryID: 1 },
		{ label: 'Cotopaxi', value: 12, countryID: 1 },
		{ label: 'Bolívar', value: 13, countryID: 1 },
		{ label: 'Cañar', value: 14, countryID: 1 },
		{ label: 'Loja', value: 15, countryID: 1 },
		{ label: 'Morona Santiago', value: 16, countryID: 1 },
		{ label: 'Napo', value: 17, countryID: 1 },
		{ label: 'Orellana', value: 18, countryID: 1 },
		{ label: 'Pastaza', value: 19, countryID: 1 },
		{ label: 'Sucumbíos', value: 20, countryID: 1 },
		{ label: 'Zamora Chinchipe', value: 21, countryID: 1 },
		{ label: 'Galápagos', value: 22, countryID: 1 },
		{ label: 'Imbabura', value: 23, countryID: 1 },
		{ label: 'Carchi', value: 24, countryID: 1 },
	],
	cantonsOpts: [
		// Pichincha
		{ label: 'Quito', value: 1, provinceID: 1 },
		{ label: 'Cayambe', value: 2, provinceID: 1 },
		{ label: 'Mejía', value: 3, provinceID: 1 },
		{ label: 'Pedro Moncayo', value: 4, provinceID: 1 },
		{ label: 'Rumiñahui', value: 5, provinceID: 1 },
		{ label: 'San Miguel de los Bancos', value: 6, provinceID: 1 },
		{ label: 'Pedro Vicente Maldonado', value: 7, provinceID: 1 },
		{ label: 'Puerto Quito', value: 8, provinceID: 1 },
		// Guayas
		{ label: 'Guayaquil', value: 9, provinceID: 2 },
		{ label: 'Alfredo Baquerizo Moreno', value: 10, provinceID: 2 },
		{ label: 'Balao', value: 11, provinceID: 2 },
		{ label: 'Balzar', value: 12, provinceID: 2 },
		{ label: 'Colimes', value: 13, provinceID: 2 },
		{ label: 'Daule', value: 14, provinceID: 2 },
		{ label: 'Durán', value: 15, provinceID: 2 },
		{ label: 'El Empalme', value: 16, provinceID: 2 },
		{ label: 'El Triunfo', value: 17, provinceID: 2 },
		{ label: 'Milagro', value: 18, provinceID: 2 },
		{ label: 'Naranjal', value: 19, provinceID: 2 },
		{ label: 'Naranjito', value: 20, provinceID: 2 },
		{ label: 'Nobol', value: 21, provinceID: 2 },
		{ label: 'Palestina', value: 22, provinceID: 2 },
		{ label: 'Pedro Carbo', value: 23, provinceID: 2 },
		{ label: 'Samborondón', value: 24, provinceID: 2 },
		{ label: 'Santa Lucía', value: 25, provinceID: 2 },
		{ label: 'Salitre', value: 26, provinceID: 2 },
		{ label: 'San Jacinto de Yaguachi', value: 27, provinceID: 2 },
		{ label: 'Playas', value: 28, provinceID: 2 },
		{ label: 'Simón Bolívar', value: 29, provinceID: 2 },
		{ label: 'Coronel Marcelino Maridueña', value: 30, provinceID: 2 },
		{ label: 'Lomas de Sargentillo', value: 31, provinceID: 2 },
		{ label: 'Nueva Loja', value: 32, provinceID: 2 },
		{ label: 'General Antonio Elizalde', value: 33, provinceID: 2 },
		{ label: 'Isidro Ayora', value: 34, provinceID: 2 },
		// Azuay
		{ label: 'Cuenca', value: 35, provinceID: 3 },
		{ label: 'Girón', value: 36, provinceID: 3 },
		{ label: 'Gualaceo', value: 37, provinceID: 3 },
		{ label: 'Nabón', value: 38, provinceID: 3 },
		{ label: 'Paute', value: 39, provinceID: 3 },
		{ label: 'Pucará', value: 40, provinceID: 3 },
		{ label: 'San Fernando', value: 41, provinceID: 3 },
		{ label: 'Santa Isabel', value: 42, provinceID: 3 },
		{ label: 'Sigsig', value: 43, provinceID: 3 },
		{ label: 'Oña', value: 44, provinceID: 3 },
		{ label: 'Chordeleg', value: 45, provinceID: 3 },
		{ label: 'El Pan', value: 46, provinceID: 3 },
		{ label: 'Sevilla de Oro', value: 47, provinceID: 3 },
		{ label: 'Guachapala', value: 48, provinceID: 3 },
		{ label: 'Camilo Ponce Enríquez', value: 49, provinceID: 3 },
	],
	parishesOpts: [
		// Quito
		{ label: 'Centro Histórico', value: 1, cantonID: 1 },
		{ label: 'La Mariscal', value: 2, cantonID: 1 },
		{ label: 'Cumbayá', value: 3, cantonID: 1 },
		{ label: 'Tumbaco', value: 4, cantonID: 1 },
		{ label: 'Conocoto', value: 5, cantonID: 1 },
		{ label: 'San Antonio de Pichincha', value: 6, cantonID: 1 },
		{ label: 'Calacalí', value: 7, cantonID: 1 },
		{ label: 'Pomasqui', value: 8, cantonID: 1 },
		{ label: 'San José de Minas', value: 9, cantonID: 1 },
		{ label: 'Tababela', value: 10, cantonID: 1 },
		{ label: 'Puembo', value: 11, cantonID: 1 },
		{ label: 'Yaruquí', value: 12, cantonID: 1 },
		{ label: 'El Quinche', value: 13, cantonID: 1 },
		{ label: 'Checa', value: 14, cantonID: 1 },
		{ label: 'Chavezpamba', value: 15, cantonID: 1 },
		{ label: 'Gualea', value: 16, cantonID: 1 },
		{ label: 'Nanegal', value: 17, cantonID: 1 },
		{ label: 'Nanegalito', value: 18, cantonID: 1 },
		{ label: 'Nono', value: 19, cantonID: 1 },
		{ label: 'Pacto', value: 20, cantonID: 1 },
		{ label: 'Perucho', value: 21, cantonID: 1 },
		{ label: 'San José de Minas', value: 22, cantonID: 1 },
		{ label: 'San Miguel de los Bancos', value: 23, cantonID: 1 },
		{ label: 'Pedro Vicente Maldonado', value: 24, cantonID: 1 },
		{ label: 'Puerto Quito', value: 25, cantonID: 1 },
		{ label: 'Rumiñahui', value: 26, cantonID: 1 },
		{ label: 'Sangolquí', value: 27, cantonID: 1 },
		{ label: 'San Pedro de Taboada', value: 28, cantonID: 1 },
		{ label: 'San Rafael', value: 29, cantonID: 1 },
		{ label: 'San Roque', value: 30, cantonID: 1 },
		// Guayaquil
		{ label: 'Centro', value: 31, cantonID: 9 },
		{ label: 'Norte', value: 32, cantonID: 9 },
		{ label: 'Sur', value: 33, cantonID: 9 },
		{ label: 'Este', value: 34, cantonID: 9 },
		{ label: 'Oeste', value: 35, cantonID: 9 },
		{ label: 'Kennedy', value: 36, cantonID: 9 },
		{ label: 'Martha de Roldós', value: 37, cantonID: 9 },
		{ label: 'Tarqui', value: 38, cantonID: 9 },
		{ label: 'Febres Cordero', value: 39, cantonID: 9 },
		{ label: 'Chongón', value: 40, cantonID: 9 },
		{ label: 'Pascuales', value: 41, cantonID: 9 },
		{ label: 'Puná', value: 42, cantonID: 9 },
	],
};

// Wrapper component para manejar el estado
interface LocationSelectorWrapperProps extends Partial<ILocationSelectorProps> {
	showParish?: boolean;
}

const LocationSelectorWrapper: React.FC<LocationSelectorWrapperProps> = (props) => {
	const [selectedCountry, setSelectedCountry] = React.useState<number | undefined>(props.valueCountryId);
	const [selectedCountryCode, setSelectedCountryCode] = React.useState<string | undefined>(props.valueCountryCode);
	const [selectedProvince, setSelectedProvince] = React.useState<number | undefined>(props.valueProvinceId);
	const [selectedCanton, setSelectedCanton] = React.useState<number | undefined>(props.valueCantonId);
	const [selectedParish, setSelectedParish] = React.useState<number | undefined>(props.valueParishId);
	const [otherCountryDescription, setOtherCountryDescription] = React.useState<string>(props.otherCountryDescription || '');

	// Funciones para filtrar opciones dinámicamente
	const getFilteredProvinces = () => {
		if (!selectedCountry) return [];
		return mockLocationOptions.provincesOpts.filter(
			province => province.countryID === selectedCountry
		);
	};

	const getFilteredCantons = () => {
		if (!selectedProvince) return [];
		return mockLocationOptions.cantonsOpts.filter(
			canton => canton.provinceID === selectedProvince
		);
	};

	const getFilteredParishes = () => {
		if (!selectedCanton) return [];
		return mockLocationOptions.parishesOpts.filter(
			parish => parish.cantonID === selectedCanton
		);
	};

	const handleCountryChange = (value: number) => {
		console.log('Country changed:', value);
		setSelectedCountry(value);
		setSelectedCountryCode(mockLocationOptions.countriesOpts.find(country => country.value === value)?.valueCountryCode);
		setSelectedProvince(undefined);
		setSelectedCanton(undefined);
		setSelectedParish(undefined);
	};

	const handleProvinceChange = (value: number) => {
		console.log('Province changed:', value);
		setSelectedProvince(value);
		setSelectedCanton(undefined);
		setSelectedParish(undefined);
	};

	const handleCantonChange = (value: number) => {
		console.log('Canton changed:', value);
		setSelectedCanton(value);
		setSelectedParish(undefined);
	};

	const handleParishChange = (value: number) => {
		console.log('Parish changed:', value);
		setSelectedParish(value);
	};

	const handleOtherCountryDescriptionChange = (value: string) => {
		console.log('Other country description changed:', value);
		setOtherCountryDescription(value);
	};

	const locationSelectorProps: ILocationSelectorProps = {
		locationOptions: {
			countriesOpts: mockLocationOptions.countriesOpts,
			provincesOpts: getFilteredProvinces(),
			cantonsOpts: getFilteredCantons(),
			parishesOpts: getFilteredParishes(),
		},
		isLoadingCountries: props.isLoadingCountries || false,
		isLoadingProvinces: props.isLoadingProvinces || false,
		isLoadingCantons: props.isLoadingCantons || false,
		isLoadingParishes: props.isLoadingParishes || false,
		onChangeCountry: handleCountryChange,
		onChangeProvince: handleProvinceChange,
		onChangeCanton: handleCantonChange,
		onChangeParish: handleParishChange,
		valueCountryId: selectedCountry,
		valueCountryCode: selectedCountryCode,
		valueProvinceId: selectedProvince,
		valueCantonId: selectedCanton,
		valueParishId: selectedParish,
		onChangeOtherCountryDescription: handleOtherCountryDescriptionChange,
		otherCountryDescription,
		showParish: props.showParish !== undefined ? props.showParish : true,
	};

	return (
		<div style={{ width: '100%', maxWidth: 800 }}>
			<LocationSelector {...locationSelectorProps} />
			<div style={{ marginTop: 16, padding: 12, backgroundColor: '#f5f5f5', borderRadius: 4 }}>
				<h4>Valores seleccionados:</h4>
				<pre style={{ fontSize: 12 }}>
					{JSON.stringify({
						country: selectedCountry,
						countryCode: selectedCountryCode,
						province: selectedProvince,
						canton: selectedCanton,
						parish: selectedParish,
						otherCountryDescription,
					}, null, 2)}
				</pre>
			</div>
		</div>
	);
};

const meta: Meta<LocationSelectorWrapperProps> = {
	title: 'Components/LocationSelector',
	component: LocationSelectorWrapper,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: 'Componente selector de ubicación jerárquico que permite seleccionar país, provincia, cantón y parroquia. Especialmente diseñado para Ecuador con soporte para otros países.',
			},
		},
	},
	argTypes: {
		showParish: {
			control: 'boolean',
			description: 'Muestra el campo de parroquia',
		},
		isLoadingCountries: {
			control: 'boolean',
			description: 'Estado de carga para países',
		},
		isLoadingProvinces: {
			control: 'boolean',
			description: 'Estado de carga para provincias',
		},
		isLoadingCantons: {
			control: 'boolean',
			description: 'Estado de carga para cantones',
		},
		isLoadingParishes: {
			control: 'boolean',
			description: 'Estado de carga para parroquias',
		},
	},
	args: {
		showParish: true,
		isLoadingCountries: false,
		isLoadingProvinces: false,
		isLoadingCantons: false,
		isLoadingParishes: false,
	},
};

export default meta;
type Story = StoryObj<LocationSelectorWrapperProps>;

export const Default: Story = {
	name: 'Por Defecto',
	parameters: {
		docs: {
			description: {
				story: 'Selector de ubicación con todos los campos habilitados (país, provincia, cantón y parroquia).',
			},
		},
	},
};

export const WithoutParish: Story = {
	name: 'Sin Parroquia',
	args: {
		showParish: false,
	},
	parameters: {
		docs: {
			description: {
				story: 'Selector de ubicación sin el campo de parroquia, mostrando solo país, provincia y cantón.',
			},
		},
	},
};

export const WithLoadingStates: Story = {
	name: 'Con Estados de Carga',
	args: {
		isLoadingCountries: true,
		isLoadingProvinces: true,
		isLoadingCantons: true,
		isLoadingParishes: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Selector de ubicación con todos los campos en estado de carga para demostrar los indicadores de loading.',
			},
		},
	},
};

export const PreSelectedEcuador: Story = {
	name: 'Pre-seleccionado Ecuador',
	args: {
		valueCountryId: 1,
		valueCountryCode: 'EC',
		valueProvinceId: 1,
		valueCantonId: 1,
		valueParishId: 1,
	},
	parameters: {
		docs: {
			description: {
				story: 'Selector de ubicación con valores pre-seleccionados para Ecuador (Pichincha - Quito - Centro Histórico).',
			},
		},
	},
};

export const PreSelectedGuayas: Story = {
	name: 'Pre-seleccionado Guayas',
	args: {
		valueCountryId: 1,
		valueCountryCode: 'EC',
		valueProvinceId: 2,
		valueCantonId: 9,
		valueParishId: 31,
	},
	parameters: {
		docs: {
			description: {
				story: 'Selector de ubicación con valores pre-seleccionados para Guayas (Guayas - Guayaquil - Centro).',
			},
		},
	},
};

export const NonEcuadorCountry: Story = {
	name: 'País No Ecuador',
	args: {
		valueCountryId: 2,
		valueCountryCode: 'CO',
	},
	parameters: {
		docs: {
			description: {
				story: 'Selector de ubicación con un país diferente a Ecuador seleccionado, mostrando solo el campo de país.',
			},
		},
	},
};
