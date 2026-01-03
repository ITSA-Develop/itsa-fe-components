import { LOCATION_DEFAULT } from '@/constants';
import { EMapZoom } from '@/enums';
import { IMapLocation, IMapPoint, IPlaceObject } from '@/interfaces';
import {
	AdvancedMarker,
	APIProvider,
	Map as MapComponent,
	MapMouseEvent,
	useMap,
	InfoWindow,
	useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import { EnvironmentOutlined } from '@ant-design/icons';
import { CSSProperties, useEffect, useState } from 'react';
import { useGeolocation } from '@/hooks';
import { GOOGLE_API_KEY, GOOGLE_MAP_ADDRESS_KEYS, GOOGLE_MAP_ID } from '@/utils/constants';
import { Button } from '../Button';
import { InputSearchAddress } from './components/InputSearchAddress';

export interface IMapProps {
	location?: IMapLocation;
	zoom?: EMapZoom;
	useUserLocation?: boolean;
	defaultMarker?: IMapLocation;
	googleMapsApiKey?: string;
	mapId?: string;
	className?: string;
	containerStyle?: CSSProperties;
	style?: CSSProperties;
	onLocationChange?: (mapPoint: IMapPoint | null) => void;
	loading?: boolean;
}

export const Map = ({
	location = LOCATION_DEFAULT,
	zoom = EMapZoom.zoom14,
	useUserLocation = false,
	defaultMarker,
	googleMapsApiKey = GOOGLE_API_KEY,
	mapId = GOOGLE_MAP_ID,
	className,
	containerStyle,
	style,
	onLocationChange,
}: IMapProps) => {
	const [geoState, requestLocation] = useGeolocation();
	const [center, setCenter] = useState<IMapLocation>(location);
	const [clickedPosition, setClickedPosition] = useState<IMapLocation | null>(null);
	const [markerInfo, setMarkerInfo] = useState<{ address: string; coords: IMapLocation } | null>(null);

	const MapCamera = ({ target }: { target?: IMapLocation }) => {
		const mapInstance = useMap();
		useEffect(() => {
			if (mapInstance && target) {
				(mapInstance as any).panTo(target);
				(mapInstance as any).setZoom(EMapZoom.zoom17);
			}
		}, [mapInstance, target]);
		return null;
	};

	const UserLocationMarker = ({
		position,
		markerInfo,
	}: {
		position: IMapLocation;
		markerInfo: { address: string; coords: IMapLocation } | null;
	}) => {
		const [markerRef, marker] = useAdvancedMarkerRef();
		const [infoWindowShown, setInfoWindowShown] = useState(true);

		useEffect(() => {
			// Mostrar el popup cuando cambia el marcador
			if (markerInfo && markerInfo.coords.lat === position.lat && markerInfo.coords.lng === position.lng) {
				setInfoWindowShown(true);
			}
		}, [markerInfo, position]);

		const handleClose = () => {
			setInfoWindowShown(false);
		};

		return (
			<>
				<AdvancedMarker ref={markerRef} position={position} title="Ubicación actual" />
				{infoWindowShown &&
					markerInfo &&
					markerInfo.coords.lat === position.lat &&
					markerInfo.coords.lng === position.lng && (
						<InfoWindow anchor={marker} onClose={handleClose}>
							<div style={{ padding: '4px' }}>
								<h3 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold' }}>Ubicación actual</h3>
								<p style={{ margin: '0 0 4px 0', fontSize: '12px' }}>{markerInfo.address}</p>
								<p style={{ margin: '0', fontSize: '11px', color: '#666' }}>
									{markerInfo.coords.lat.toFixed(6)}, {markerInfo.coords.lng.toFixed(6)}
								</p>
							</div>
						</InfoWindow>
					)}
			</>
		);
	};

	const ClickedMarker = ({
		position,
	}: {
		position: IMapLocation;
		markerInfo: { address: string; coords: IMapLocation } | null;
		showInfoWindow?: boolean;
	}) => {
		const [markerRef] = useAdvancedMarkerRef();

		return <AdvancedMarker ref={markerRef} position={position} title="Marcador" />;
	};

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
			const coords = { lat: geoState.coords.latitude, lng: geoState.coords.longitude };
			setCenter(coords);
			// Actualizar información del marcador cuando cambia la ubicación del usuario
			reverseGeocode(coords.lat, coords.lng);
		}
	}, [geoState.coords]);

	// Efecto para manejar el marcador por defecto
	useEffect(() => {
		if (defaultMarker && !clickedPosition) {
			setCenter(defaultMarker);
			// Obtener información de la dirección del marcador por defecto
			reverseGeocode(defaultMarker.lat, defaultMarker.lng);
		}
	}, [defaultMarker]);

	const getLongName = (value: unknown): string | undefined => {
		if (typeof value === 'object' && value !== null && 'long_name' in value) {
			return (value as { long_name: string }).long_name;
		}
		return undefined;
	};

	const emitLocationChange = (placeObject?: unknown, addressData?: any) => {
		const lat = typeof (placeObject as any)?.lat === 'number' ? (placeObject as any).lat : addressData?.latitude;
		const lng = typeof (placeObject as any)?.long === 'number' ? (placeObject as any).long : addressData?.longitude;

		if (typeof lat === 'number' && typeof lng === 'number') {
			const pos = { lat, lng } as IMapLocation;
			setClickedPosition(pos);
			setCenter(pos);

			// Actualizar información del marcador si tenemos addressData
			if (addressData) {
				const addressParts = [addressData.principalStreet, addressData.streetNumber].filter(Boolean);
				const addressSummary =
					addressParts.length > 0 ? addressParts.join(', ') : `${lat.toFixed(6)}, ${lng.toFixed(6)}`;

				setMarkerInfo({
					address: addressSummary,
					coords: { lat, lng },
				});
			}
		}

		const mapPoint: IMapPoint = {
			placeObject: placeObject as IPlaceObject,
			addressData,
		};
		onLocationChange?.(mapPoint);
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

			// Construir resumen de dirección para el popup
			const addressParts = [
				addressData.principalStreet,
				addressData.streetNumber,
				getLongName(placeObject[GOOGLE_MAP_ADDRESS_KEYS.canton]),
				getLongName(placeObject[GOOGLE_MAP_ADDRESS_KEYS.province]),
			].filter(Boolean);
			const addressSummary =
				addressParts.length > 0
					? addressParts.join(', ')
					: result.formatted_address || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;

			// Actualizar información del marcador para mostrar en el popup
			setMarkerInfo({
				address: addressSummary,
				coords: { lat, lng },
			});

			// console.log('Map click -> reverseGeocode:', { placeObject, addressData });
			const mapPoint: IMapPoint = {
				placeObject: placeObject as unknown as IPlaceObject,
				addressData,
			};
			emitLocationChange(mapPoint.placeObject, mapPoint.addressData);
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
			// console.log('Map click -> coords:', pos);
			// Obtener información del punto clickeado
			reverseGeocode(lat, lng);
		}
	};

	const openInGoogleMaps = () => {
		const position = clickedPosition || defaultMarker;
		if (!position) return;
		const { lat, lng } = position;
		const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
		window.open(url, '_blank', 'noopener');
	};

	// Si no hay API key, mostramos un estado de ayuda
	if (!googleMapsApiKey) {
		return (
			<div className={`relative flex-1 min-h-[350px] ${className ?? ''}`} style={containerStyle}>
				<div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">
					Google Maps API key no configurada
				</div>
			</div>
		);
	}

	const handleLocationChangeBySearch = (placeObject?: any, addressData?: any) => {
		const lat = typeof placeObject?.lat === 'number' ? placeObject.lat : addressData?.latitude;
		const lng = typeof placeObject?.long === 'number' ? placeObject.long : addressData?.longitude;

		if (typeof lat === 'number' && typeof lng === 'number') {
			// Si ya tenemos addressData desde el Autocomplete, reenviamos;
			// en casocleanObject contrario, geocodificación inversa para obtener placeObject/addressData
			if (addressData) {
				emitLocationChange(placeObject, addressData);
			} else {
				reverseGeocode(lat, lng);
			}
		} else {
			// Si no hay coordenadas claras, reenvía lo que venga o null
			emitLocationChange(placeObject, addressData);
		}
	};
	//AIzaSyAcS-M2oOvXHEtjeSi41jzuZal6JZn66sw
	//82446f60eba4a 92316dbec8c
	return (
		<div className={`relative flex-1 bg-red-300 h-full w-full ${className ?? ''}`} style={containerStyle}>
			<APIProvider apiKey={googleMapsApiKey} libraries={['places']}>
				<MapComponent
					style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, ...(style || {}) }}
					defaultCenter={center}
					defaultZoom={zoom}
					gestureHandling="greedy"
					disableDefaultUI
					onClick={onClick}
					mapId={mapId}
				>
					{useUserLocation && geoState.coords && (
						<UserLocationMarker
							position={{ lat: geoState.coords.latitude, lng: geoState.coords.longitude }}
							markerInfo={markerInfo}
						/>
					)}
					{clickedPosition && (
						<ClickedMarker position={clickedPosition} markerInfo={markerInfo} showInfoWindow={false} />
					)}
					{defaultMarker && !clickedPosition && (
						<ClickedMarker position={defaultMarker} markerInfo={markerInfo} showInfoWindow={false} />
					)}
					<MapCamera target={center} />
				</MapComponent>
				<InputSearchAddress
					floatingInputPlaceholder={'Buscar ubicación'}
					googleMapsApiKey={googleMapsApiKey}
					onLocationChange={handleLocationChangeBySearch}
				/>
			</APIProvider>
			{(clickedPosition || defaultMarker) && (
				<div className="absolute right-3 bottom-16 z-10">
					<Button type="secondary" onClick={openInGoogleMaps} size="middle" label={<EnvironmentOutlined />} />
				</div>
			)}
		</div>
	);
};
