// InputAddress.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Space } from 'antd';
import { useForm } from 'react-hook-form';
import { IInputAddressProps, InputAddress } from '../../components/InputAddress/InputAddress';
import { GOOGLE_API_KEY } from '../../constants';
import { IManualAddressObject, ILocationFormData } from '../../interfaces';

const mockLocationOptions = {
	countriesOpts: [
		{ label: 'Ecuador', value: 1 },
		{ label: 'Colombia', value: 2 },
		{ label: 'Perú', value: 3 },
	],
	provincesOpts: [
		{ label: 'Pichincha', value: 1 },
		{ label: 'Guayas', value: 2 },
		{ label: 'Azuay', value: 3 },
	],
	cantonsOpts: [
		{ label: 'Quito', value: 1 },
		{ label: 'Guayaquil', value: 2 },
		{ label: 'Cuenca', value: 3 },
	],
	parishesOpts: [
		{ label: 'Centro Histórico', value: 1 },
		{ label: 'La Mariscal', value: 2 },
		{ label: 'Cumbayá', value: 3 },
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
	
	// Location form state
	const [selectedCountry, setSelectedCountry] = React.useState<number | undefined>();
	const [selectedProvince, setSelectedProvince] = React.useState<number | undefined>();
	const [selectedCanton, setSelectedCanton] = React.useState<number | undefined>();
	const [selectedParish, setSelectedParish] = React.useState<number | undefined>();
	const [otherCountryDescription, setOtherCountryDescription] = React.useState<string>('');

	const { control, watch, setValue } = useForm<{ address: string }>();

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
		setSelectedCountry(value);
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
		locationOptions: props.locationOptions || mockLocationOptions,
		isLoadingCountries: false,
		isLoadingProvinces: false,
		isLoadingCantons: false,
		isLoadingParishes: false,
		onChangeCountry: handleCountryChange,
		onChangeProvince: handleProvinceChange,
		onChangeCanton: handleCantonChange,
		onChangeParish: handleParishChange,
		valueCountryId: selectedCountry,
		valueProvinceId: selectedProvince,
		valueCantonId: selectedCanton,
		valueParishId: selectedParish,
		onChangeOtherCountryDescription: handleOtherCountryDescriptionChange,
		otherCountryDescription,
		showParish: true,
	};

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
				{ label: 'Ecuador', value: 1 },
				{ label: 'México', value: 2 },
			],
			provincesOpts: [
				{ label: 'Pichincha', value: 1 },
				{ label: 'Imbabura', value: 2 },
			],
			cantonsOpts: [
				{ label: 'Quito', value: 1 },
				{ label: 'Ibarra', value: 2 },
			],
			parishesOpts: [
				{ label: 'Centro Histórico', value: 1 },
				{ label: 'La Carolina', value: 2 },
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



