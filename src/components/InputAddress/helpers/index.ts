// @ts-nocheck
export const getPostalCodeFromLatLng = (lat: number, lng: number): void => {
	const geocoder = new google.maps.Geocoder();
	const latlng: google.maps.LatLngLiteral = { lat, lng };

	geocoder.geocode(
		{ location: latlng },
		(results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) => {
			if (status === 'OK' && results && results.length > 0) {
				const postalCodeComponent = results[0].address_components.find(comp => comp.types.includes('postal_code'));

				if (postalCodeComponent) {
					console.log('Código postal:', postalCodeComponent.long_name);
				} else {
					console.log('No se encontró código postal para esta ubicación.');
				}
			} else {
				console.error('Geocoder falló por:', status);
			}
		},
	);
};
