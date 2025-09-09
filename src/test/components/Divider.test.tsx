import { render, screen } from '@testing-library/react';
import { Divider } from '../../components/Divider/Divider';

describe('Divider component', () => {
	it('renders without crashing', () => {
		const { container } = render(<Divider />);
		expect(document.querySelector('.ant-divider')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('renders vertical divider when type="vertical"', () => {
		const { container } = render(<Divider type="vertical" />);
		const divider = document.querySelector('.ant-divider');
		expect(divider).toHaveClass('ant-divider-vertical');
		expect(container).toMatchSnapshot();
	});

	it('renders dashed divider when dashed=true', () => {
		const { container } = render(<Divider dashed />);
		const divider = document.querySelector('.ant-divider');
		expect(divider).toHaveClass('ant-divider-dashed');
		expect(container).toMatchSnapshot();
	});

	it('renders with text when children provided', () => {
		const { container } = render(<Divider>Test Text</Divider>);
		expect(screen.getByText('Test Text')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});
