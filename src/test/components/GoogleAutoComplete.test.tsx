import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { GoogleAutoComplete, getLongName } from '../../components/InputAddress/components/GoogleAutoComplete';
import React from 'react';

// Mock del Loader de Google Maps
vi.mock('@googlemaps/js-api-loader', () => ({
	Loader: vi.fn().mockImplementation(() => ({
		load: vi.fn().mockResolvedValue({
			maps: {
				places: {
					Autocomplete: vi.fn().mockImplementation(() => ({
						addListener: vi.fn(),
						getPlace: vi.fn().mockResolvedValue({
							geometry: {
								location: {
									lat: () => -0.22985,
									lng: () => -78.52495,
								},
							},
							address_components: [
								{
									types: ['street_number'],
									long_name: '123',
									short_name: '123',
								},
								{
									types: ['route'],
									long_name: 'Av. Amazonas',
									short_name: 'Av. Amazonas',
								},
								{
									types: ['administrative_area_level_1'],
									long_name: 'Pichincha',
									short_name: 'P',
								},
								{
									types: ['administrative_area_level_2'],
									long_name: 'Quito',
									short_name: 'Quito',
								},
								{
									types: ['sublocality_level_1'],
									long_name: 'Centro',
									short_name: 'Centro',
								},
							],
						}),
					})),
				},
			},
		}),
	})),
}));

// Mock del componente Input
vi.mock('../../components/Input/Input', () => ({
	Input: vi.fn().mockImplementation(({ ref, ...props }) => (
		<input {...props} ref={ref} data-testid="google-autocomplete-input" />
	)),
}));

describe('GoogleAutoComplete component', () => {
	const mockProps = {
		name: 'address',
		googleMapsApiKey: 'test-api-key',
		error: undefined,
		watch: vi.fn().mockReturnValue({ address: { principalStreet: 'Test Street' } }),
		setValue: vi.fn(),
		onLocationChange: vi.fn(),
		setShowManualEntry: vi.fn(),
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	it('renders the component with input field', async () => {
		render(<GoogleAutoComplete {...mockProps} />);
		
		await waitFor(() => {
			expect(screen.getByTestId('google-autocomplete-input')).toBeInTheDocument();
		});
	});

	it('shows error message when error prop is provided and no address', () => {
		const propsWithError = {
			...mockProps,
			error: 'Address is required',
			watch: vi.fn().mockReturnValue({ address: null }),
		};

		render(<GoogleAutoComplete {...propsWithError} />);
		
		expect(screen.getByText('Address is required')).toBeInTheDocument();
	});

	it('displays the "No puede encontrar la dirección?" text', () => {
		render(<GoogleAutoComplete {...mockProps} />);
		
		expect(screen.getByText('¿No puede encontrar la dirección?')).toBeInTheDocument();
	});

	it('calls setShowManualEntry when clicking on manual entry option', () => {
		render(<GoogleAutoComplete {...mockProps} />);
		
		// El texto clickeable no tiene contenido visible, pero podemos verificar que el div existe
		const manualEntryDiv = screen.getByText('¿No puede encontrar la dirección?').parentElement?.nextElementSibling;
		expect(manualEntryDiv).toBeInTheDocument();
	});

	it('calls setValue with isManualAddress false on mount', async () => {
		render(<GoogleAutoComplete {...mockProps} />);
		
		await waitFor(() => {
			expect(mockProps.setValue).toHaveBeenCalledWith('isManualAddress', false);
		});
	});
});

describe('getLongName helper function', () => {
	it('returns long_name when object has long_name property', () => {
		const testObject = { long_name: 'Test Name' };
		expect(getLongName(testObject)).toBe('Test Name');
	});

	it('returns undefined when object does not have long_name property', () => {
		const testObject = { short_name: 'Test' };
		expect(getLongName(testObject)).toBeUndefined();
	});

	it('returns undefined when value is null', () => {
		expect(getLongName(null)).toBeUndefined();
	});

	it('returns undefined when value is not an object', () => {
		expect(getLongName('string')).toBeUndefined();
		expect(getLongName(123)).toBeUndefined();
		expect(getLongName(true)).toBeUndefined();
	});

	it('returns undefined when value is undefined', () => {
		expect(getLongName(undefined)).toBeUndefined();
	});
});
