import { useCallback, useEffect, useRef, useState } from 'react';

export interface GeolocationState {
	coords: GeolocationCoordinates | null;
	error: { message: string } | GeolocationPositionError | null;
	loading: boolean;
	permission: PermissionState | null;
}

export interface UseGeolocationOptions {
	enableHighAccuracy?: boolean;
	timeout?: number;
	maximumAge?: number;
}

export const useGeolocation = (options: UseGeolocationOptions = {}): [GeolocationState, () => void] => {
	const [coords, setCoords] = useState<GeolocationCoordinates | null>(null);
	const [error, setError] = useState<{ message: string } | GeolocationPositionError | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [permission, setPermission] = useState<PermissionState | null>(null);
	const optionsRef = useRef<UseGeolocationOptions>(options);

	useEffect(() => {
		optionsRef.current = options;
	}, [options]);

	const checkPermission = useCallback(async () => {
		if (typeof navigator === 'undefined') {
			setPermission(null);
			return;
		}
		try {
			const navAny = navigator as any;
			if (!navAny.permissions?.query) {
				setPermission(null);
				return;
			}
			const status: PermissionStatus = await navAny.permissions.query({ name: 'geolocation' });
			setPermission(status.state);
			status.onchange = () => setPermission(status.state);
		} catch (_) {
			setPermission(null);
		}
	}, []);

	const requestLocation = useCallback(() => {
		if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
			setError({ message: 'Geolocation API no soportada' });
			return;
		}
		setLoading(true);
		navigator.geolocation.getCurrentPosition(
			(position) => {
				setCoords(position.coords);
				setError(null);
				setLoading(false);
			},
			(err) => {
				setError(err);
				setLoading(false);
			},
			{
				enableHighAccuracy: optionsRef.current.enableHighAccuracy ?? true,
				timeout: optionsRef.current.timeout ?? 10000,
				maximumAge: optionsRef.current.maximumAge ?? 0,
			},
		);
	}, []);

	useEffect(() => {
		checkPermission();
	}, [checkPermission]);

	return [
		{ coords, error, loading, permission },
		requestLocation,
	];
};


