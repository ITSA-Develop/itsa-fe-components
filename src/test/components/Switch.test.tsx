import { fireEvent, render, screen } from '@testing-library/react';
import { Switch } from '../../components/Switch/Switch';

describe('Switch component', () => {
	it('renders correctly and toggles', () => {
		const onChange = vi.fn();
		const { container } = render(<Switch onChange={onChange} />);

		const switchElement = screen.getByRole('switch');
		expect(switchElement).toBeInTheDocument();

		fireEvent.click(switchElement);
		expect(onChange).toHaveBeenCalled();
		expect(container).toMatchSnapshot();
	});
});
