import { LOCATION_DEFAULT } from '@/constants';
import { EMapZoom } from '@/enums';
import { IMapLocation } from '@/interfaces';
import { AdvancedMarker, APIProvider, Map as MapComponent, MapMouseEvent } from '@vis.gl/react-google-maps';
import { EnvironmentOutlined } from '@ant-design/icons';
import { CSSProperties, useEffect, useState } from 'react';
import { useGeolocation } from '@/hooks';
import { GOOGLE_API_KEY, GOOGLE_MAP_ADDRESS_KEYS } from '@/utils/constants';
import { Button } from '../Button';

export interface IMapProps {
	location?: IMapLocation;
	zoom?: EMapZoom | number;
	useUserLocation?: boolean;
	googleMapsApiKey?: string;
	style?: CSSProperties;
	onLocationChange?: (
		placeObject: {
			[key: string]:
				| {
						long_name: string;
						short_name: string;
				  }
				| number
				| undefined;
		} | null,
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

export const MI_MAP_ID = 'MI_MAP_ID';

export const Map = ({
	location = LOCATION_DEFAULT,
	zoom = EMapZoom.zoom14,
	useUserLocation = false,
	googleMapsApiKey = GOOGLE_API_KEY,
	style,
	onLocationChange,
}: IMapProps) => {
	const [geoState, requestLocation] = useGeolocation();
	const [center, setCenter] = useState<IMapLocation>(location);
	const [clickedPosition, setClickedPosition] = useState<IMapLocation | null>(null);

	useEffect(() => {
		setCenter(location);
	}, [location]);

	useEffect(() => {
		if (useUserLocation) {
			requestLocation();
		}
	}, [useUserLocation, requestLocation]);

	useEffect(() => {
		if (geoState.coords) {
			setCenter({ lat: geoState.coords.latitude, lng: geoState.coords.longitude });
		}
	}, [geoState.coords]);

	const getLongName = (value: unknown): string | undefined => {
		if (typeof value === 'object' && value !== null && 'long_name' in value) {
			return (value as { long_name: string }).long_name;
		}
		return undefined;
	};

	const reverseGeocode = async (lat: number, lng: number) => {
		const g = (window as any)?.google;
		if (!g?.maps?.Geocoder) {
			console.warn('Google Geocoder no disponible');
			return;
		}
		const geocoder = new g.maps.Geocoder();
		try {
			const response = await geocoder.geocode({ location: { lat, lng } });
			const result = response?.results?.[0];
			if (!result) {
				console.warn('Sin resultados de geocodificación inversa', { lat, lng });
				onLocationChange?.(null);
				return;
			}
			const placeObject: {
				[key: string]:
					| {
							long_name: string;
							short_name: string;
					  }
					| number
					| undefined;
			} = {};
			result.address_components?.forEach((item: any) => {
				const type = item.types?.[0];
				if (type) {
					placeObject[type] = {
						long_name: item.long_name,
						short_name: item.short_name,
					};
				}
			});
			placeObject.lat = lat;
			placeObject.long = lng;

			const addressData = {
				principalStreet:
					getLongName(placeObject[GOOGLE_MAP_ADDRESS_KEYS.route]) ||
					getLongName(placeObject[GOOGLE_MAP_ADDRESS_KEYS.intersection]) ||
					'',
				latitude: lat,
				longitude: lng,
				streetNumber: getLongName(placeObject[GOOGLE_MAP_ADDRESS_KEYS.streetNumber]) || '',
				postalCode: getLongName(placeObject[GOOGLE_MAP_ADDRESS_KEYS.postalCode]) || '',
				isManualAddress: false,
			};

			console.log('Map click -> reverseGeocode:', { placeObject, addressData });
			onLocationChange?.(placeObject, addressData);
		} catch (e) {
			console.error('Error en geocodificación inversa', e);
			onLocationChange?.(null);
		}
	};

	const onClick = (event: MapMouseEvent) => {
		// @vis.gl react-google-maps envuelve el evento; la latLng viene en detail.latLng
		const latLngAny = (event as any)?.detail?.latLng;
		if (!latLngAny) return;
		const lat = typeof latLngAny.lat === 'function' ? latLngAny.lat() : latLngAny.lat;
		const lng = typeof latLngAny.lng === 'function' ? latLngAny.lng() : latLngAny.lng;
		if (typeof lat === 'number' && typeof lng === 'number') {
			const pos = { lat, lng } as IMapLocation;
			setClickedPosition(pos);
			// Opcional: recentrar el mapa en el marcador nuevo
			setCenter(pos);
			console.log('Map click -> coords:', pos);
			// Obtener información del punto clickeado
			reverseGeocode(lat, lng);
		}
	};

	const openInGoogleMaps = () => {
		if (!clickedPosition) return;
		const { lat, lng } = clickedPosition;
		const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
		window.open(url, '_blank', 'noopener');
	};

	return (
		<div className="relative flex-1 min-h-[350px]">
			<APIProvider apiKey={googleMapsApiKey}>
				<MapComponent
					style={style ?? { width: '100vw', height: '100vh' }}
					defaultCenter={center}
					defaultZoom={zoom}
					gestureHandling="greedy"
					disableDefaultUI
					onClick={onClick}
					mapId={MI_MAP_ID}
				>
					{useUserLocation && geoState.coords && (
						<AdvancedMarker
							position={{ lat: geoState.coords.latitude, lng: geoState.coords.longitude }}
							title="Mi ubicación"
						/>
					)}
					{clickedPosition && <AdvancedMarker position={clickedPosition} title="Marcador" />}
				</MapComponent>
			</APIProvider>
			{clickedPosition && (
				<div className="absolute right-3 bottom-16 z-10">
					<Button
						type="secondary"
						onClick={openInGoogleMaps}
						size="middle"
						label={<EnvironmentOutlined />}
					/>
				</div>
			)}
		</div>
	);
};
