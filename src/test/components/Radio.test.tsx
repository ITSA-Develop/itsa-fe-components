import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio } from '../../components/Radio/Radio';

describe('Radio component', () => {
	it('renders label when provided', () => {
		const { container } = render(<Radio label="Choose option" options={[{ label: 'Option 1', value: 1 }]} />);
		expect(screen.getByText('Choose option')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('renders radio options and allows selection', async () => {
		const user = userEvent.setup();
		const { container } = render(
			<Radio
				options={[
					{ label: 'Option 1', value: 1 },
					{ label: 'Option 2', value: 2 },
				]}
				defaultValue={1}
			/>,
		);

		const option2 = screen.getByLabelText('Option 2');
		expect(option2).toBeInTheDocument();
		await user.click(option2);
		expect(option2).toBeChecked();
		expect(container).toMatchSnapshot();
	});
});
