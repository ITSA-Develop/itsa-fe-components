import { render, screen } from '@testing-library/react';
import { LocationDisplay } from '../../components/LocationDisplay/LocationDisplay';

const mockOptions = [
	{ label: 'Option 1', value: 1 },
	{ label: 'Option 2', value: 2 },
	{ label: 'Option 3', value: 3 },
];

vi.mock('@/helpers', () => ({
	getMappedOptionFromAPI: (value: number | undefined, options: any[]) =>
		options.find(opt => opt.value === value) || { label: '' },
}));

describe('LocationDisplay', () => {
	it('shows concatenated label when isEcuador is true', () => {
		const { container } = render(
			<LocationDisplay
				isEcuador={true}
				label="Ubicación"
				canton={1}
				province={2}
				country={3}
				cantonOptions={mockOptions}
				provinceOptions={mockOptions}
				countryOptions={mockOptions}
			/>,
		);

		expect(screen.getByText('Ubicación')).toBeInTheDocument();
		expect(screen.getByText('Option 1, Option 2, Option 3')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('shows only country when isEcuador is false', () => {
		const { container } = render(
			<LocationDisplay isEcuador={false} label="País" country={2} countryOptions={mockOptions} />,
		);

		expect(screen.getByText('País')).toBeInTheDocument();
		expect(screen.getByText('Option 2')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('shows only country when isEcuador is false', () => {
		const { container } = render(
			<LocationDisplay
				isEcuador={true}
				label="Ubicación"
				canton={99}
				province={99}
				country={99}
				cantonOptions={mockOptions}
				provinceOptions={mockOptions}
				countryOptions={mockOptions}
			/>,
		);

		expect(screen.getByText('Ubicación')).toBeInTheDocument();

		const valueElement = screen.getByText((content, element) => {
			return element?.tagName.toLowerCase() === 'span' && content.includes(', ,');
		});
		expect(valueElement).toHaveTextContent(', ,');
		expect(container).toMatchSnapshot();
	});
});
