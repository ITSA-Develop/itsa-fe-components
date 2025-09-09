import { fireEvent, render, screen } from '@testing-library/react';
import { Dropdown } from '../../components/Dropdown/Dropdown';

describe('Dropdown component', () => {
	const menuItems = [
		{
			key: '1',
			label: 'First Item',
		},
		{
			key: '2',
			label: 'Second Item',
		},
	];

	it('renders without crashing', () => {
		const { container } = render(
			<Dropdown menu={{ items: menuItems }}>
				<button>Open Menu</button>
			</Dropdown>,
		);
		expect(screen.getByText('Open Menu')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('shows menu items when clicked', () => {
		const { container } = render(
			<Dropdown menu={{ items: menuItems }} trigger={['click']}>
				<button>Open Menu</button>
			</Dropdown>,
		);

		const button = screen.getByText('Open Menu');
		fireEvent.click(button);

		expect(screen.getByText('First Item')).toBeInTheDocument();
		expect(screen.getByText('Second Item')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});
