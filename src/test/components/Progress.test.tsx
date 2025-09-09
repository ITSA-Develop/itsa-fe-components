import { render, screen } from '@testing-library/react';
import { Progress } from '../../components/Progress/Progress';

describe('Progress component', () => {
	it('renders with default props', () => {
		const { container } = render(<Progress percent={50} />);
		const progress = screen.getByRole('progressbar');
		expect(progress).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('renders with custom stroke color', () => {
		const { container } = render(<Progress percent={75} strokeColor="red" />);
		const progress = screen.getByRole('progressbar');
		expect(progress).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});
