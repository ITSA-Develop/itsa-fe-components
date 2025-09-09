import { render, screen } from '@testing-library/react';
import { Tooltip } from '../../components/Tooltip/Tooltip';

describe('Tooltip component', () => {
	it('renders tooltip content when open is true', () => {
		const { container } = render(
			<Tooltip title="Texto del tooltip" open>
				<button>Hover me</button>
			</Tooltip>,
		);

		expect(screen.getByText('Texto del tooltip')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});
