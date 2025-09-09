import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Drawer } from '../../components/Drawer/Drawer';

describe('Drawer component', () => {
	it('renders without crashing', () => {
		const { container } = render(<Drawer open={true} />);
		expect(document.querySelector('.ant-drawer')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('renders title and content', () => {
		const { container } = render(
			<Drawer open={true} title="Test Title">
				<div>Drawer content</div>
			</Drawer>,
		);
		expect(screen.getByText('Test Title')).toBeInTheDocument();
		expect(screen.getByText('Drawer content')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('calls onClose when close button is clicked', async () => {
		const onClose = vi.fn();
		render(<Drawer open={true} onClose={onClose} />);

		const closeBtn = document.querySelector('.ant-drawer-close');
		expect(closeBtn).toBeInTheDocument();

		if (closeBtn) {
			await userEvent.click(closeBtn);
		}

		expect(onClose).toHaveBeenCalled();
	});
});
