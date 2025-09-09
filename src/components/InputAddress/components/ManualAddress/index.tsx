// import { Caption } from '@/components/Caption/Caption';
// import { Input } from '@/components/Input/Input';
// import { EInput } from '@/enums';
// import { ILocationFormData, IManualAddressObject } from '@/interfaces';
// import { TInputOptions } from '@/types';
// import { GOOGLE_MAP_ADDRESS_KEYS, REQUIRED } from '@/utils/constants';
// import { Typography, useTheme } from '@mui/material';
// import { useEffect } from 'react';
// import { Control, UseFormWatch } from 'react-hook-form';
// // import { LocationForm } from '../LocationForm';

// export interface IManualAddressProps {
// 	name: string;
// 	control: Control<IManualAddressObject>;
// 	locationOptions: {
// 		provincesOpts: TInputOptions[];
// 		cantonsOpts: TInputOptions[];
// 		parishesOpts: TInputOptions[];
// 	};
// 	watch: UseFormWatch<any>;
// 	setValue: UseFormSetValue<any>;
// 	setShowManualEntry: (opt: boolean) => void;
// 	setAddressObject: (addressObject: IManualAddressObject) => void;
// 	errors?: any;
// 	defaultManualValue?: IManualAddressObject;
// 	defaultLocationValues?: ILocationFormData;
// }

// export const ManualAddress = ({
// 	name,
// 	control,
// 	locationOptions,
// 	watch,
// 	setValue,
// 	setShowManualEntry,
// 	errors,
// 	defaultLocationValues,
// }: IManualAddressProps) => {
// 	const theme = useTheme();
// 	useEffect(() => {
// 		let map: google.maps.Map;
// 		let marker: google.maps.Marker;

// 		const updateLocationValues = (lat: number, lng: number) => {
// 			const geocoder = new google.maps.Geocoder();
// 			geocoder.geocode({ location: { lat, lng } }, (results: any[], status: string) => {
// 				if (status === 'OK' && results && results.length > 0) {
// 					const components = results[0].address_components;

// 					let streetNumber = '';
// 					let route = '';
// 					let postalCode = '';

// 					for (const comp of components) {
// 						if (comp.types.includes(GOOGLE_MAP_ADDRESS_KEYS.streetNumber)) streetNumber = comp.long_name;
// 						if (comp.types.includes(GOOGLE_MAP_ADDRESS_KEYS.route)) route = comp.long_name;
// 						if (comp.types.includes(GOOGLE_MAP_ADDRESS_KEYS.postalCode)) postalCode = comp.long_name;
// 					}

// 					const principalStreet = [route, streetNumber].filter(Boolean).join(' ');

// 					setValue('address', {
// 						principalStreet: principalStreet,
// 						latitude: lat,
// 						longitude: lng,
// 						streetNumber: streetNumber,
// 						postalCode: postalCode,
// 						isManualAddress: true,
// 					});
// 					setValue('principalStreet', principalStreet || '');
// 					setValue('streetNumber', streetNumber || '');
// 					setValue('postalCode', postalCode || '');
// 					setValue('latitude', lat);
// 					setValue('longitude', lng);
// 					setValue('isManualAddress', true);
// 				} else {
// 					console.error('Geocoding falló:', status);
// 				}
// 			});
// 		};

// 		const handleMarkerDragEnd = () => {
// 			const pos = marker.getPosition();
// 			if (pos) {
// 				const lat = pos.lat();
// 				const lng = pos.lng();
// 				updateLocationValues(lat, lng);
// 			}
// 		};

// 		const handleAutocompletePlaceChanged = (autocomplete: google.maps.places.Autocomplete) => {
// 			const place = autocomplete.getPlace();

// 			if (!place.geometry || !place.geometry.location) {
// 				console.error('No se encontró información de ubicación.');
// 				return;
// 			}

// 			const location = place.geometry.location;
// 			const lat = location.lat();
// 			const lng = location.lng();

// 			map.setCenter(location);
// 			map.setZoom(17);
// 			marker.setPosition(location);

// 			updateLocationValues(lat, lng);
// 		};

// 		async function initMap(): Promise<void> {
// 			const position = {
// 				lat: -2.9006, // TODO: implement latitude and longitude depending on the user's agency
// 				lng: -79.0045,
// 			};

// 			const [{ Map }, { Marker }, { Autocomplete }] = await Promise.all([
// 				google.maps.importLibrary('maps'),
// 				google.maps.importLibrary('marker'),
// 				google.maps.importLibrary('places'),
// 			]);

// 			map = new Map(document.getElementById('map') as HTMLElement, {
// 				center: position,
// 				zoom: 15,
// 			});

// 			marker = new Marker({
// 				position,
// 				map,
// 				draggable: true,
// 				title: 'Arrástrame',
// 			});

// 			marker.addListener('dragend', handleMarkerDragEnd);

// 			const input = document.getElementById('autocomplete') as HTMLInputElement;
// 			if (!input) {
// 				console.warn('Input con id="autocomplete" no encontrado.');
// 				return;
// 			}

// 			const autocomplete = new Autocomplete(input, {
// 				fields: ['geometry', 'address_components'],
// 				types: ['geocode'],
// 				componentRestrictions: { country: 'EC' },
// 			});
// 			autocomplete.bindTo('bounds', map);
// 			autocomplete.addListener('place_changed', () => handleAutocompletePlaceChanged(autocomplete));
// 		}

// 		initMap();
// 		setValue('isManualAddress', true);
// 	}, []);

// 	return (
// 		<div>
// 			<div className="flex items-end justify-between">
// 				<div className="flex items-center justify-end mb-1 w-full">
// 					<div
// 						onClick={() => {
// 							setShowManualEntry(false);
// 						}}
// 						className="text-sm cursor-pointer pr-4"
// 					>
// 						<Typography
// 							sx={{
// 								borderBottom: '1px solid transparent',
// 								color: 'primary.main',
// 								transition: 'border-color 0.3s ease',
// 								lineHeight: 1.2,
// 								'&:hover': {
// 									borderBottomColor: 'primary.main',
// 								},
// 							}}
// 						>
// 							ir Atrás
// 						</Typography>
// 					</div>
// 				</div>
// 			</div>
// 			<div className="!space-y-4 relative">
// 				<div className="relative">
// 					<input
// 						id="autocomplete"
// 						type="text"
// 						placeholder="Buscar dirección"
// 						className="absolute z-50 top-4 left-4 w-3/5 p-2 bg-white-100 border border-gray-300 rounded"
// 					/>
// 					<div id="map" className="w-full h-96 rounded-lg shadow-md" />
// 				</div>
// 				<Caption
// 					text="Arrastre y suelte el pin para obtener los datos de la dirección"
// 					className={theme.palette.primary.main}
// 				/>
// 				<div className="flex gap-4">
// 					<Input
// 						name="principalStreet"
// 						label="Calle Principal"
// 						control={control}
// 						rules={REQUIRED}
// 						error={errors?.principalStreet ? errors.principalStreet.message || errors.principalStreet : undefined}
// 						maxLen={80}
// 					/>
// 					<Input name="secondaryStreet" label="Calle Secundaria" control={control} maxLen={80} />
// 					<Input name="addressNumber" label="Número de Dirección" control={control} maxLen={10} />
// 				</div>
// 				<div className="flex gap-4">
// 					<Input
// 						name="latitude"
// 						label="Latitud"
// 						type={EInput.number}
// 						control={control}
// 						rules={REQUIRED}
// 						isDisabled
// 						error={errors?.latitude ? errors.latitude.message || errors.latitude : undefined}
// 						maxLen={11}
// 					/>
// 					<Input
// 						name="longitude"
// 						label="Longitud"
// 						type={EInput.number}
// 						control={control}
// 						rules={REQUIRED}
// 						isDisabled
// 						error={errors?.longitude ? errors.longitude.message || errors.longitude : undefined}
// 						maxLen={11}
// 					/>
// 					<Input name="postalCode" label="Código Postal" type={EInput.number} control={control} />
// 				</div>
// 				{/* <LocationForm
// 					name={name}
// 					control={control}
// 					watch={watch}
// 					setValue={setValue}
// 					defaultValues={defaultLocationValues}
// 					errors={errors}
// 					locationOptions={locationOptions}
// 					showParish
// 				/> */}
// 			</div>
// 		</div>
// 	);
// };
