// InputAddress.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Space } from 'antd';
import { useForm } from 'react-hook-form';
import { IInputAddressProps, InputAddress } from '../../components/InputAddress/InputAddress';
import { GOOGLE_API_KEY } from '../../utils/constants';
import { IManualAddressObject, ILocationFormData } from '../../interfaces';

const mockLocationOptions = {
	countriesOpts: [
		{ label: 'Ecuador', value: 1, valueCountryCode: 'EC' },
		{ label: 'Colombia', value: 2, valueCountryCode: 'CO' },
		{ label: 'Perú', value: 3, valueCountryCode: 'PE' },
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
		{ label: 'San Sebastián del Coca', value: 31, cantonID: 1 },
		{ label: 'San Vicente', value: 32, cantonID: 1 },
		{ label: 'Santa Rosa', value: 33, cantonID: 1 },
		{ label: 'Santa Rosa de Flandes', value: 34, cantonID: 1 },
		{ label: 'Santa Rosa de Lima', value: 35, cantonID: 1 },
		{ label: 'Santa Rosa de Punín', value: 36, cantonID: 1 },
		{ label: 'Santa Rosa de Quives', value: 37, cantonID: 1 },
		{ label: 'Santa Rosa de Sabanilla', value: 38, cantonID: 1 },
		{ label: 'Santa Rosa de San Pablo', value: 39, cantonID: 1 },
		{ label: 'Santa Rosa de Tena', value: 40, cantonID: 1 },
		{ label: 'Santa Rosa de Viterbo', value: 41, cantonID: 1 },
		{ label: 'Santa Rosa de Yacuanquer', value: 42, cantonID: 1 },
		{ label: 'Santa Rosa de Yaguachi', value: 43, cantonID: 1 },
		{ label: 'Santa Rosa de Yaguachi Viejo', value: 44, cantonID: 1 },
		{ label: 'Santa Rosa de Yaguachi Nuevo', value: 45, cantonID: 1 },
		{ label: 'Santa Rosa de Yaguachi Central', value: 46, cantonID: 1 },
		{ label: 'Santa Rosa de Yaguachi Norte', value: 47, cantonID: 1 },
		{ label: 'Santa Rosa de Yaguachi Sur', value: 48, cantonID: 1 },
		{ label: 'Santa Rosa de Yaguachi Este', value: 49, cantonID: 1 },
		{ label: 'Santa Rosa de Yaguachi Oeste', value: 50, cantonID: 1 },
	],
};

const mockGoogleMapsApiKey = GOOGLE_API_KEY;

interface InputAddressWrapperProps {
	name?: string;
	label?: string;
	googleMapsApiKey?: string;
	locationOptions?: any;
	errors?: any;
	showManualByDefault?: boolean;
}

const InputAddressWrapper: React.FC<InputAddressWrapperProps> = (props) => {
	const [addressData, setAddressData] = React.useState<any>(null);
	const [addressObject, setAddressObject] = React.useState<any>(null);
	const [showManualEntry, setShowManualEntry] = React.useState(props.showManualByDefault || false);
	
	// Location form state - Ecuador por defecto
	const [selectedCountry, setSelectedCountry] = React.useState<number | undefined>(1); // Ecuador por defecto
	const [selectedCountryCode, setSelectedCountryCode] = React.useState<string | undefined>('EC'); // EC por defecto
	const [selectedProvince, setSelectedProvince] = React.useState<number | undefined>();
	const [selectedCanton, setSelectedCanton] = React.useState<number | undefined>();
	const [selectedParish, setSelectedParish] = React.useState<number | undefined>();
	const [otherCountryDescription, setOtherCountryDescription] = React.useState<string>('');

	// Asegurar que el código de país se establezca correctamente al inicializar
	React.useEffect(() => {
		if (selectedCountry === 1 && !selectedCountryCode) {
			setSelectedCountryCode('EC');
		}
	}, [selectedCountry, selectedCountryCode]);

	const { control, watch, setValue } = useForm<{ address: string }>();

	// Funciones para filtrar opciones dinámicamente
	const getFilteredProvinces = () => {
		if (!selectedCountry) return [];
		return (props.locationOptions || mockLocationOptions).provincesOpts.filter(
			province => province.countryID === selectedCountry
		);
	};

	const getFilteredCantons = () => {
		if (!selectedProvince) return [];
		return (props.locationOptions || mockLocationOptions).cantonsOpts.filter(
			canton => canton.provinceID === selectedProvince
		);
	};

	const getFilteredParishes = () => {
		if (!selectedCanton) return [];
		return (props.locationOptions || mockLocationOptions).parishesOpts.filter(
			parish => parish.cantonID === selectedCanton
		);
	};

	const handleLocationChange = (value: any) => {
		setAddressData(value);
		console.log('Location changed:', value);
	};

	const handleSetAddressObject = (addressObj: any) => {
		setAddressObject(addressObj);
		console.log('Address object set:', addressObj);
	};

	// Location form handlers
	const handleCountryChange = (value: number) => {
		console.log('Country changed:', value);
		setSelectedCountry(value);
		setSelectedCountryCode(props.locationOptions?.countriesOpts.find(country => country.value === value)?.valueCountryCode);
		setSelectedProvince(undefined);
		setSelectedCanton(undefined);
		setSelectedParish(undefined);
	};

	const handleProvinceChange = (value: number) => {
		setSelectedProvince(value);
		setSelectedCanton(undefined);
		setSelectedParish(undefined);
	};

	const handleCantonChange = (value: number) => {
		setSelectedCanton(value);
		setSelectedParish(undefined);
	};

	const handleParishChange = (value: number) => {
		setSelectedParish(value);
	};

	const handleOtherCountryDescriptionChange = (value: string) => {
		setOtherCountryDescription(value);
	};

	// Create the props objects for the new interface
	const locationFormProps = {
		locationOptions: {
			countriesOpts: (props.locationOptions || mockLocationOptions).countriesOpts,
			provincesOpts: getFilteredProvinces(),
			cantonsOpts: getFilteredCantons(),
			parishesOpts: getFilteredParishes(),
		},
		isLoadingCountries: false,
		isLoadingProvinces: false,
		isLoadingCantons: false,
		isLoadingParishes: false,
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
		showParish: true,
	};

	// Debug: verificar valores
	console.log('Debug LocationForm Props:', {
		selectedCountry,
		selectedCountryCode,
		filteredProvinces: getFilteredProvinces().length,
		filteredCantons: getFilteredCantons().length,
		filteredParishes: getFilteredParishes().length
	});

	const googleAutoCompleteProps = {
		name: props.name || 'address',
		label: props.label || 'Dirección',
		googleMapsApiKey: props.googleMapsApiKey || mockGoogleMapsApiKey,
		defaultValue: '',
		onLocationChange: handleLocationChange,
		setAddressObject: handleSetAddressObject,
		errors: props.errors,
		showManualByDefault: props.showManualByDefault,
		defaultManualValue: undefined,
		defaultLocationValues: undefined,
		isRequired: null,
		setShowManualEntry,
		watch: () => ({ address: watch('address') }),
		setValue: (field: string, value: any) => setValue(field as 'address', value),
	};

	return (
		<div style={{ width: 400 }}>
			<InputAddress
				locationFormProps={locationFormProps}
				googleAutoCompleteProps={googleAutoCompleteProps}
			/>
			{addressData && (
				<div style={{ marginTop: 16, padding: 12, backgroundColor: '#f5f5f5', borderRadius: 4 }}>
					<h4>Datos de ubicación:</h4>
					<pre style={{ fontSize: 12 }}>{JSON.stringify(addressData, null, 2)}</pre>
				</div>
			)}
			{addressObject && (
				<div style={{ marginTop: 16, padding: 12, backgroundColor: '#e6f7ff', borderRadius: 4 }}>
					<h4>Objeto de dirección:</h4>
					<pre style={{ fontSize: 12 }}>{JSON.stringify(addressObject, null, 2)}</pre>
				</div>
			)}
		</div>
	);
};

// Meta configuration
const meta: Meta<InputAddressWrapperProps> = {
	title: 'components/Form/InputAddress',
	component: InputAddressWrapper,
	parameters: { 
		layout: 'centered',
		docs: {
			description: {
				component: 'Componente de entrada de dirección con autocompletado de Google Maps para Ecuador.',
			},
		},
	},
	argTypes: {
		googleMapsApiKey: { control: 'text' },
		errors: { control: 'object' },
	},
};

export default meta;

type Story = StoryObj<InputAddressWrapperProps>;

// Stories
export const Default: Story = {
	name: 'Default',
	args: {
		name: 'address',
		label: 'Dirección',
		googleMapsApiKey: mockGoogleMapsApiKey,
		locationOptions: mockLocationOptions,
	},
};

export const WithError: Story = {
	name: 'Con Error',
	args: {
		name: 'address',
		label: 'Dirección',
		googleMapsApiKey: mockGoogleMapsApiKey,
		locationOptions: mockLocationOptions,
		errors: { address: 'Este campo es requerido' },
	},
};

export const ManualByDefault: Story = {
	name: 'Manual por Defecto',
	args: {
		name: 'address',
		label: 'Dirección',
		googleMapsApiKey: mockGoogleMapsApiKey,
		locationOptions: mockLocationOptions,
		showManualByDefault: true,
	},
};

export const WithCustomLocationOptions: Story = {
	name: 'Con Opciones de Ubicación Personalizadas',
	args: {
		name: 'address',
		label: 'Dirección Personalizada',
		googleMapsApiKey: mockGoogleMapsApiKey,
		locationOptions: {
			countriesOpts: [
				{ label: 'Ecuador', value: 1, valueCountryCode: 'EC' },
				{ label: 'México', value: 2, valueCountryCode: 'MX' },
			],
			provincesOpts: [
				{ label: 'Pichincha', value: 1, countryID: 1 },
				{ label: 'Imbabura', value: 2, countryID: 1 },
				{ label: 'Guayas', value: 3, countryID: 1 },
			],
			cantonsOpts: [
				{ label: 'Quito', value: 1, provinceID: 1 },
				{ label: 'Cayambe', value: 2, provinceID: 1 },
				{ label: 'Ibarra', value: 3, provinceID: 2 },
				{ label: 'Guayaquil', value: 4, provinceID: 3 },
			],
			parishesOpts: [
				{ label: 'Centro Histórico', value: 1, cantonID: 1 },
				{ label: 'La Mariscal', value: 2, cantonID: 1 },
				{ label: 'Cumbayá', value: 3, cantonID: 1 },
				{ label: 'La Carolina', value: 4, cantonID: 3 },
			],
		},
	},
};

export const WithValidationError: Story = {
	name: 'Con Error de Validación',
	args: {
		name: 'address',
		label: 'Dirección con Validación',
		googleMapsApiKey: mockGoogleMapsApiKey,
		locationOptions: mockLocationOptions,
		errors: { 
			address: 'La dirección es requerida y debe tener al menos 10 caracteres' 
		},
	},
};



