import { Input } from '@/components/Input/Input';
import { useEffect, useRef } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { GOOGLE_MAP_ADDRESS_KEYS } from '@/utils/constants';

export interface IInputSearchAddressProps {
	floatingInputPlaceholder: string;
	floatingInputValue?: string;
	onFloatingInputChange?: (value: string) => void;
	googleMapsApiKey?: string;
	onLocationChange?: (
		placeObject: {
			[key: string]:
				| {
						long_name: string;
						short_name: string;
				  }
				| number
				| undefined;
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
	const inputRef = useRef<any>(null);
	const googleRef = useRef<any>(null);
	const autoCompleteRef = useRef<any>(null);
	const placesLibrary = useMapsLibrary('places');

	// Wait for the Maps API and Places library to be available via APIProvider
	useEffect(() => {
		const g = (window as any)?.google;
		if (!g?.maps || !g?.maps?.places || !placesLibrary) return;
		googleRef.current = g;

		const inputElement = inputRef.current?.input || inputRef.current;
		if (!inputElement) return;
		autoCompleteRef.current = new g.maps.places.Autocomplete(inputElement, {
			// componentRestrictions: { country: 'EC' },
		});
		const listener = autoCompleteRef.current.addListener('place_changed', async () => {
			const place = await autoCompleteRef.current.getPlace?.();
			if (!place) return;

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
			const lat = typeof location?.lat === 'function' ? location?.lat() : undefined;
			const lng = typeof location?.lng === 'function' ? location?.lng() : undefined;

			place?.address_components?.forEach((item: any) => {
				const type = item.types?.[0];
				if (type) {
					placeObject[type] = {
						long_name: item.long_name,
						short_name: item.short_name,
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

			const addressData = {
				principalStreet:
					getLongName(placeObject[GOOGLE_MAP_ADDRESS_KEYS.route]) ||
					getLongName(placeObject[GOOGLE_MAP_ADDRESS_KEYS.intersection]) ||
					'',
				latitude: typeof lat === 'number' ? lat : 0,
				longitude: typeof lng === 'number' ? lng : 0,
				streetNumber: getLongName(placeObject[GOOGLE_MAP_ADDRESS_KEYS.streetNumber]) || '',
				postalCode: getLongName(placeObject[GOOGLE_MAP_ADDRESS_KEYS.postalCode]) || '',
				isManualAddress: false,
			};

			if (place?.formatted_address) {
				onFloatingInputChange?.(place.formatted_address);
			}
			onLocationChange?.(placeObject, addressData);
		});

		return () => {
			if (listener?.remove) listener.remove();
		};
	}, [placesLibrary, onLocationChange, onFloatingInputChange]);

	return (
		<div
			className="absolute left-3 right-3 top-3 z-10"
			style={{ position: 'absolute', left: 12, right: 12, top: 12, zIndex: 50 }}
		>
			<Input
				type="text"
				placeholder={floatingInputPlaceholder ?? 'Buscar ubicación'}
				value={floatingInputValue !== undefined ? floatingInputValue : undefined}
				onChange={e => onFloatingInputChange?.((e.target as HTMLInputElement).value)}
				ref={(node: any) => {
					(inputRef as any).current = node;
				}}
			/>
		</div>
	);
};
