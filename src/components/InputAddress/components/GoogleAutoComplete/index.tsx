// //TODO: after removing react-hook-form we need to update this component with local states and passing proper props. (including interfaces and types)

// import { GOOGLE_MAP_ADDRESS_KEYS } from '@/utils/constants';
// import { Loader } from '@googlemaps/js-api-loader';
// import clx from 'classnames';
// import { useEffect, useRef, useState } from 'react';
// import { IInputAddressProps } from '../../InputAddress';
// import './styles.css';

// interface IGoogleAutoCompleteProps extends Omit<IInputAddressProps, 'control'> {
// 	setShowManualEntry: (opt: boolean) => void;
// }

// interface GoogleRef {
// 	[x: string]: any;
// 	current?: {
// 		maps?: any;
// 	};
// }

// export const getLongName = (value: unknown): string | undefined => {
// 	if (typeof value === 'object' && value !== null && 'long_name' in value) {
// 		return (value as { long_name: string }).long_name;
// 	}
// 	return undefined;
// };

// export const GoogleAutoComplete = (props: IGoogleAutoCompleteProps) => {
// 	const {
// 		name,
// 		label,
// 		googleMapsApiKey,
// 		error,
// 		// watch,
// 		// setValue,
// 		onLocationChange,
// 		setShowManualEntry,
// 		// defaultValue,
// 	} = props;

// 	const autoCompleteRef = useRef<any>();
// 	const inputRef = useRef<HTMLInputElement | null>(null);
// 	const googleRef = useRef<GoogleRef>();

// 	// const { address } = watch();
// 	const address = ''; // TODO : remove

// 	const [isGoogleLoading, setIsGoogleLoading] = useState(true);

// 	const options = {
// 		componentRestrictions: { country: 'EC' },
// 	};

// 	// NOTE: If google maps doesn't recognize an address, it will still let the user input and select it but won't return all the required fields, this is a check for that.
// 	const checkAddressComponents = (addressComponents: any) => {
// 		if (
// 			addressComponents &&
// 			(!addressComponents[GOOGLE_MAP_ADDRESS_KEYS.streetNumber]?.long_name ||
// 				!addressComponents[GOOGLE_MAP_ADDRESS_KEYS.route]?.long_name ||
// 				!addressComponents[GOOGLE_MAP_ADDRESS_KEYS.province]?.long_name ||
// 				!addressComponents[GOOGLE_MAP_ADDRESS_KEYS.canton]?.long_name ||
// 				!addressComponents[GOOGLE_MAP_ADDRESS_KEYS.parish]?.long_name)
// 		) {
// 			setShowManualEntry(true);
// 			return true;
// 		}
// 		return false;
// 	};

// 	useEffect(() => {
// 		const loader = new Loader({
// 			apiKey: googleMapsApiKey,
// 			libraries: ['geocoding', 'places'],
// 		});
// 		loader.load().then((google: any) => {
// 			googleRef.current = google;
// 			setIsGoogleLoading(false);
// 		});
// 		// setValue('isManualAddress', false);
// 	}, []);

// 	function hasMaps(obj: any): obj is { maps: any } {
// 		return !!obj && typeof obj.maps !== 'undefined';
// 	}

// 	useEffect(() => {
// 		if (!isGoogleLoading && hasMaps(googleRef?.current)) {
// 			autoCompleteRef.current = new googleRef.current.maps.places.Autocomplete(inputRef.current, options);

// 			autoCompleteRef?.current?.addListener('place_changed', async () => {
// 				const place = await autoCompleteRef?.current?.getPlace();

// 				const placeObject: {
// 					[key: string]:
// 						| {
// 								long_name: string;
// 								short_name: string;
// 						  }
// 						| number
// 						| undefined;
// 				} = {};

// 				const location = place?.geometry?.location;
// 				const lat = location?.lat();
// 				const long = location?.lng();

// 				place?.address_components?.forEach((item: any) => {
// 					const type = item.types[0];
// 					placeObject[type] = {
// 						long_name: item.long_name,
// 						short_name: item.short_name,
// 					};
// 				});
// 				placeObject.lat = lat;
// 				placeObject.long = long;

// 				const hasError = checkAddressComponents(placeObject);
// 				if (hasError) {
// 					onLocationChange(null);
// 					// setValue('address', '');
// 				} else {
// 					onLocationChange(placeObject);
// 					// setValue('address', {
// 					// 	principalStreet: getLongName(placeObject[GOOGLE_MAP_ADDRESS_KEYS.route]),
// 					// 	latitude: placeObject[GOOGLE_MAP_ADDRESS_KEYS.lat],
// 					// 	longitude: placeObject[GOOGLE_MAP_ADDRESS_KEYS.long],
// 					// 	streetNumber: getLongName(placeObject[GOOGLE_MAP_ADDRESS_KEYS.streetNumber]),
// 					// 	postalCode: getLongName(placeObject[GOOGLE_MAP_ADDRESS_KEYS.postalCode]),
// 					// 	isManualAddress: false,
// 					// });

// 					// setValue('addressprovince', getLongName(placeObject[GOOGLE_MAP_ADDRESS_KEYS.province]));
// 					// setValue('addresscanton', getLongName(placeObject[GOOGLE_MAP_ADDRESS_KEYS.canton]));
// 					// setValue('addressparish', getLongName(placeObject[GOOGLE_MAP_ADDRESS_KEYS.parish]));
// 					// setValue('isManualAddress', false);
// 				}
// 			});
// 		}
// 	}, [isGoogleLoading]);

// 	return (
// 		<div>
// 			<div className="flex items-end justify-between">
// 				<div className="flex items-center justify-end mb-1 w-full">
// 					<span className="text-black-100 text-sm mr-1">¿No puede encontrar la dirección?</span>
// 					<div
// 						onClick={() => {
// 							setShowManualEntry(true);
// 							onLocationChange(null);
// 							// setValue('address', '');
// 						}}
// 						className="text-sm cursor-pointer pr-4"
// 					>
// 						<span>Click Aquí</span>
// 					</div>
// 				</div>
// 			</div>
// 			<div className="relative">
// 				<input
// 					type="text"
// 					name={name}
// 					autoComplete="off"
// 					placeholder=" "
// 					ref={inputRef}
// 					onChange={e => {
// 						// setValue('address', e?.target?.value);
// 					}}
// 					className={clx(
// 						'peer h-14 text-black-100 font-normal w-full bg-white-100 px-4 p-2 border border-grey-400 rounded focus:outline-none hover:border-[#252525] focus:ring-0 focus:border-2',
// 						{
// 							'border-red-600': error,
// 						},
// 					)}
// 				/>
// 				<label
// 					htmlFor="address"
// 					className={clx(
// 						'absolute left-4 transition-all duration-200 pointer-events-none bg-white-100 px-1 peer-focus:-top-2 peer-focus:text-sm',
// 						{
// 							'top-4': !address,
// 							'-top-2 text-sm': address,
// 							'text-red-600': error && !address,
// 						},
// 					)}
// 				>
// 					{label}
// 				</label>
// 				{error && !address && <span className="text-sm mt-2 ml-4 italic text-red-600">{error}</span>}
// 			</div>
// 		</div>
// 	);
// };
