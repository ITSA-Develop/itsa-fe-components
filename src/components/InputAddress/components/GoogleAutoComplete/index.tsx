 // TODO: after removing react-hook-form we need to update this component with local states and passing proper props. (including interfaces and types)

 import { GOOGLE_MAP_ADDRESS_KEYS } from '@/utils/constants';
 import { Loader } from '@googlemaps/js-api-loader';
 //import clx from 'classnames';
 import { useEffect, useRef, useState } from 'react';
 import { IInputAddressProps } from '../../InputAddress';
//import { Input } from '@/components/Input/Input';
import { Input } from '@/components/Input/Input';
import { RefCallBack } from 'react-hook-form';
//import { omit } from 'zod/v4/core/util.d.cts';

 //import { Input } from '@/components/Input/Input';
//import { Input as AntInput } from 'antd';
 //import './styles.css';

/*interface IGoogleAutoCompleteProps extends Omit<IInputAddressProps, 'control'> {
	setShowManualEntry: (opt: boolean) => void;
	watch: () => { address: any };
	setValue: (field: string, value: any) => void;
}*/

 interface GoogleRef {
 	[x: string]: any;
 	current?: {
 		maps?: any;
 	};
 }

 export const getLongName = (value: unknown): string | undefined => {
 	if (typeof value === 'object' && value !== null && 'long_name' in value) {
 		return (value as { long_name: string }).long_name;
 	}
 	return undefined;
 };

export const GoogleAutoComplete = (props: IInputAddressProps["googleAutoCompleteProps"]) => {
	const {
		name,
		//label,
		googleMapsApiKey,
		error,
		watch,
		setValue,
		onLocationChange,
		setShowManualEntry,
		//defaultValue,
	} = props;

	const autoCompleteRef = useRef<any>();
	const inputRef = useRef<any>(null);
	const googleRef = useRef<GoogleRef>();

 	 const { address } = watch();
 	// const address = ''; // TODO : remove

 	const [isGoogleLoading, setIsGoogleLoading] = useState(true);

 	const options = {
 		componentRestrictions: { country: 'EC' },
 	};

 	 //NOTE: If google maps doesn't recognize an address, it will still let the user input and select it but won't return all the required fields, this is a check for that.
 	const checkAddressComponents = (addressComponents: any) => {
		console.log('addressComponents', addressComponents);
 		if (
 			addressComponents &&
 			(	!addressComponents[GOOGLE_MAP_ADDRESS_KEYS.province]?.long_name ||
 				!addressComponents[GOOGLE_MAP_ADDRESS_KEYS.canton]?.long_name)
 		) {
			console.log('checkAddressComponents', true);
 			setShowManualEntry(true);
 			return true;
 		}
 		return false;
 	};

 	useEffect(() => {
 		const loader = new Loader({
 			apiKey: googleMapsApiKey,
 			libraries: ['geocoding', 'places'],
 		});
 		loader.load().then((google: any) => {
 			googleRef.current = google;
 			setIsGoogleLoading(false);
 		});
 		 setValue('isManualAddress', false);
 	}, []);

 	function hasMaps(obj: any): obj is { maps: any } {
 		return !!obj && typeof obj.maps !== 'undefined';
 	}

	useEffect(() => {
		if (!isGoogleLoading && hasMaps(googleRef?.current)) {
			// Acceder al elemento HTML real del input de Ant Design
			const inputElement = inputRef.current?.input || inputRef.current;
			autoCompleteRef.current = new googleRef.current.maps.places.Autocomplete(inputElement, options);

 			autoCompleteRef?.current?.addListener('place_changed', async () => {
 				const place = await autoCompleteRef?.current?.getPlace();

 				const placeObject: {
 					[key: string]:
 						| {
 								long_name: string;
 								short_name: string;
 						  }
 						| number
 						| undefined;
 				} = {};

 				const location = place?.geometry?.location;
 				const lat = location?.lat();
 				const long = location?.lng();

 				place?.address_components?.forEach((item: any) => {
 					const type = item.types[0];
 					placeObject[type] = {
 						long_name: item.long_name,
 						short_name: item.short_name,
 					};
 				});
 				placeObject.lat = lat;
 				placeObject.long = long;

				const hasError = checkAddressComponents(placeObject);
				if (hasError) {
					onLocationChange(null);
					setValue('address', '');
 				} else {
 					onLocationChange(placeObject);
 					 setValue('address', {
 					 	principalStreet: getLongName(placeObject[GOOGLE_MAP_ADDRESS_KEYS.route])? 
						getLongName(placeObject[GOOGLE_MAP_ADDRESS_KEYS.route]) : 
						getLongName(placeObject[GOOGLE_MAP_ADDRESS_KEYS.intersection]),
 					 	latitude: placeObject[GOOGLE_MAP_ADDRESS_KEYS.lat],
 					 	longitude: placeObject[GOOGLE_MAP_ADDRESS_KEYS.long],
 					 	streetNumber: getLongName(placeObject[GOOGLE_MAP_ADDRESS_KEYS.streetNumber]),
 					 	postalCode: getLongName(placeObject[GOOGLE_MAP_ADDRESS_KEYS.postalCode]),
 					 	isManualAddress: false,
 					 });
 					 setValue('addressprovince', getLongName(placeObject[GOOGLE_MAP_ADDRESS_KEYS.province]));
 					 setValue('addresscanton', getLongName(placeObject[GOOGLE_MAP_ADDRESS_KEYS.canton]));
 					 setValue('addressparish', getLongName(placeObject[GOOGLE_MAP_ADDRESS_KEYS.parish]));
 					 setValue('isManualAddress', false);
 				}
 			});
 		}
 	}, [isGoogleLoading]);


 	return (
 		<div>
 			<div className="flex items-end justify-between">
 				<div className="flex items-center justify-end mb-1 w-full">
 					<span className="text-black-100 text-sm mr-1">¿No puede encontrar la dirección?</span>
 					<div
 						onClick={() => {
 							setShowManualEntry(true);
 							onLocationChange(null);
 							 setValue('address', '');
 						}}
 						className="text-sm cursor-pointer pr-4"
 					>
 						
 					</div>
 				</div>
 			</div>
 			<div className="relative">
				<Input
					type="text"
					name={name}
					placeholder=" "
					value={address?.principalStreet}
					ref={inputRef as unknown as RefCallBack}
					onChange={e => {
						setValue('address', e?.target?.value);
					}}

				/>
 				{error && !address && <span className="text-sm mt-2 ml-4 italic text-red-600">{error}</span>}
 			</div>
 		</div>
 	);
 
};