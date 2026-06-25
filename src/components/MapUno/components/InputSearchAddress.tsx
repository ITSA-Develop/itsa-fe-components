import { useEffect, useRef } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { GOOGLE_MAP_ADDRESS_KEYS } from '@/utils/constants';

type PlaceObjectAddressValue = {
	long_name: string;
	short_name: string;
};

type PlaceObjectValue = PlaceObjectAddressValue | number | undefined;

type PlaceAutocompleteAddressComponent = {
	types?: string[];
	longText?: string;
	shortText?: string;
};

type PlaceAutocompleteLocation = {
	lat: number | (() => number);
	lng: number | (() => number);
};

type PlaceAutocompletePlace = {
	addressComponents?: PlaceAutocompleteAddressComponent[];
	fetchFields: (request: { fields: string[] }) => Promise<void>;
	formattedAddress?: string | null;
	location?: PlaceAutocompleteLocation;
};

type PlaceAutocompletePrediction = {
	toPlace?: () => PlaceAutocompletePlace | undefined;
};

type PlaceAutocompleteSelectEvent = Event & {
	placePrediction?: PlaceAutocompletePrediction;
	detail?: {
		placePrediction?: PlaceAutocompletePrediction;
	};
};

type PlaceAutocompleteElementInstance = HTMLElement & {
	placeholder: string;
	value: string;
};

type PlacesLibraryWithAutocompleteElement = {
	PlaceAutocompleteElement?: new () => PlaceAutocompleteElementInstance;
};

type GoogleMapsGlobal = {
	maps?: {
		places?: PlacesLibraryWithAutocompleteElement;
	};
};

export interface IInputSearchAddressProps {
	floatingInputPlaceholder: string;
	floatingInputValue?: string;
	onFloatingInputChange?: (value: string) => void;
	googleMapsApiKey?: string;
	onLocationChange?: (
		placeObject: {
			[key: string]: PlaceObjectValue;
		},
		addressData?: {
			principalStreet: string;
			latitude: number;
			longitude: number;
			streetNumber: string;
			postalCode: string;
			isManualAddress: boolean;
		},
	) => void;
}

export const InputSearchAddress = ({
	floatingInputPlaceholder,
	floatingInputValue,
	onFloatingInputChange,
	onLocationChange,
}: IInputSearchAddressProps) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const autoCompleteRef = useRef<PlaceAutocompleteElementInstance | null>(null);
	const callbacksRef = useRef({
		onFloatingInputChange,
		onLocationChange,
	});
	const placesLibrary = useMapsLibrary('places');

	useEffect(() => {
		callbacksRef.current = {
			onFloatingInputChange,
			onLocationChange,
		};
	}, [onFloatingInputChange, onLocationChange]);

	useEffect(() => {
		const g = (window as Window & { google?: GoogleMapsGlobal }).google;
		const placesLibraryWithAutocomplete = placesLibrary as PlacesLibraryWithAutocompleteElement | null;
		const PlaceAutocompleteElement =
			placesLibraryWithAutocomplete?.PlaceAutocompleteElement ?? g?.maps?.places?.PlaceAutocompleteElement;
		const container = containerRef.current;
		if (PlaceAutocompleteElement === undefined || container === null) return;

		const placeAutocomplete = new PlaceAutocompleteElement();
		placeAutocomplete.placeholder = 'Buscar ubicación';
		placeAutocomplete.value = '';
		placeAutocomplete.style.backgroundColor = '#ffffff';
		placeAutocomplete.style.border = '1px solid #d9d9d9';
		placeAutocomplete.style.borderRadius = '8px';
		placeAutocomplete.style.color = 'rgba(0, 0, 0, 0.88)';
		placeAutocomplete.style.colorScheme = 'light';
		placeAutocomplete.style.display = 'block';
		placeAutocomplete.style.fontFamily = 'inherit';
		placeAutocomplete.style.fontSize = '14px';
		placeAutocomplete.style.lineHeight = '32px';
		placeAutocomplete.style.width = '100%';
		autoCompleteRef.current = placeAutocomplete;
		container.replaceChildren(placeAutocomplete);

		const handleInput = () => {
			callbacksRef.current.onFloatingInputChange?.(placeAutocomplete.value ?? '');
		};

		const handlePlaceSelect = async (event: Event) => {
			const selectEvent = event as PlaceAutocompleteSelectEvent;
			const placePrediction = selectEvent.placePrediction ?? selectEvent.detail?.placePrediction;
			const place = placePrediction?.toPlace?.();
			if (place === undefined) return;

			await place.fetchFields({
				fields: ['formattedAddress', 'location', 'addressComponents'],
			});

			const placeObject: {
				[key: string]: PlaceObjectValue;
			} = {};

			const location = place.location;
			const lat = typeof location?.lat === 'function' ? location.lat() : location?.lat;
			const lng = typeof location?.lng === 'function' ? location.lng() : location?.lng;

			place.addressComponents?.forEach(item => {
				const type = item.types?.[0];
				if (type !== undefined && type !== '') {
					placeObject[type] = {
						long_name: item.longText ?? '',
						short_name: item.shortText ?? '',
					};
				}
			});
			if (typeof lat === 'number') placeObject.lat = lat;
			if (typeof lng === 'number') placeObject.long = lng;

			const getLongName = (value: unknown): string | undefined => {
				if (typeof value === 'object' && value !== null && 'long_name' in value) {
					return (value as { long_name: string }).long_name;
				}
				return undefined;
			};

			const routeName = getLongName(placeObject[GOOGLE_MAP_ADDRESS_KEYS.route]);
			const intersectionName = getLongName(placeObject[GOOGLE_MAP_ADDRESS_KEYS.intersection]);

			const addressData = {
				principalStreet: routeName !== undefined && routeName !== '' ? routeName : (intersectionName ?? ''),
				latitude: typeof lat === 'number' ? lat : 0,
				longitude: typeof lng === 'number' ? lng : 0,
				streetNumber: getLongName(placeObject[GOOGLE_MAP_ADDRESS_KEYS.streetNumber]) ?? '',
				postalCode: getLongName(placeObject[GOOGLE_MAP_ADDRESS_KEYS.postalCode]) ?? '',
				isManualAddress: false,
			};

			if (typeof place.formattedAddress === 'string' && place.formattedAddress !== '') {
				callbacksRef.current.onFloatingInputChange?.(place.formattedAddress);
			}
			callbacksRef.current.onLocationChange?.(placeObject, addressData);
		};

		placeAutocomplete.addEventListener('input', handleInput);
		placeAutocomplete.addEventListener('gmp-select', handlePlaceSelect);

		return () => {
			placeAutocomplete.removeEventListener('input', handleInput);
			placeAutocomplete.removeEventListener('gmp-select', handlePlaceSelect);
			if (autoCompleteRef.current === placeAutocomplete) {
				autoCompleteRef.current = null;
			}
			placeAutocomplete.remove();
		};
	}, [placesLibrary]);

	useEffect(() => {
		if (autoCompleteRef.current === null || floatingInputValue === undefined) return;
		if (autoCompleteRef.current.value !== floatingInputValue) {
			autoCompleteRef.current.value = floatingInputValue;
		}
	}, [floatingInputValue]);

	useEffect(() => {
		if (autoCompleteRef.current === null) return;
		autoCompleteRef.current.placeholder = floatingInputPlaceholder ?? 'Buscar ubicación';
	}, [floatingInputPlaceholder]);

	return (
		<div
			className="absolute left-3 right-3 top-3 z-10"
			style={{ position: 'absolute', left: 12, right: 12, top: 12, zIndex: 50 }}
			ref={containerRef}
		/>
	);
};
