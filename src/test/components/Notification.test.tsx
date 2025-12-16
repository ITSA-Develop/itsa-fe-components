import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Notification, INotificationProps } from '../../components/Notification';

describe('Notification component', () => {
	const defaultProps: INotificationProps = {
		type: 'info',
		description: 'Test notification description',
	};

	it('renders notification with description', () => {
		const { container } = render(<Notification {...defaultProps} />);

		expect(screen.getByText('Test notification description')).toBeTruthy();
		expect(container).toMatchSnapshot();
	});

	it('renders notification with title and description', () => {
		const { container } = render(
			<Notification {...defaultProps} title="Test Title" description="Test Description" />
		);

		expect(screen.getByText('Test Title')).toBeTruthy();
		expect(screen.getByText('Test Description')).toBeTruthy();
		expect(container).toMatchSnapshot();
	});

	it('renders info type notification', () => {
		const { container } = render(<Notification {...defaultProps} type="info" />);

		expect(container.querySelector('.itsa-notification--info')).toBeTruthy();
		expect(container).toMatchSnapshot();
	});

	it('renders warning type notification', () => {
		const { container } = render(<Notification {...defaultProps} type="warning" />);

		expect(container.querySelector('.itsa-notification--warning')).toBeTruthy();
		expect(container).toMatchSnapshot();
	});

	it('renders error type notification', () => {
		const { container } = render(<Notification {...defaultProps} type="error" />);

		expect(container.querySelector('.itsa-notification--error')).toBeTruthy();
		expect(container).toMatchSnapshot();
	});

	it('renders success type notification', () => {
		const { container } = render(<Notification {...defaultProps} type="success" />);

		expect(container.querySelector('.itsa-notification--success')).toBeTruthy();
		expect(container).toMatchSnapshot();
	});

	it('renders with custom width as string', () => {
		const { container } = render(<Notification {...defaultProps} width="500px" />);

		const notification = container.querySelector('.itsa-notification') as HTMLElement;
		expect(notification?.style.width).toBe('500px');
		expect(container).toMatchSnapshot();
	});

	it('renders with custom width as number', () => {
		const { container } = render(<Notification {...defaultProps} width={300} />);

		const notification = container.querySelector('.itsa-notification') as HTMLElement;
		expect(notification?.style.width).toBe('300px');
		expect(container).toMatchSnapshot();
	});

	it('renders with default width (100%)', () => {
		const { container } = render(<Notification {...defaultProps} />);

		const notification = container.querySelector('.itsa-notification') as HTMLElement;
		expect(notification?.style.width).toBe('100%');
		expect(container).toMatchSnapshot();
	});

	it('shows close button when closable is true', () => {
		render(<Notification {...defaultProps} closable={true} />);

		const closeButton = screen.getByRole('button', { name: /close/i });
		expect(closeButton).toBeTruthy();
	});

	it('does not show close button when closable is false', () => {
		render(<Notification {...defaultProps} closable={false} />);

		const closeButton = screen.queryByRole('button', { name: /close/i });
		expect(closeButton).toBeNull();
	});

	it('calls onClose when close button is clicked', () => {
		const onClose = vi.fn();
		render(<Notification {...defaultProps} closable={true} onClose={onClose} />);

		const closeButton = screen.getByRole('button', { name: /close/i });
		fireEvent.click(closeButton);

		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('hides notification after closing', () => {
		const { container } = render(<Notification {...defaultProps} closable={true} />);

		expect(screen.getByText('Test notification description')).toBeTruthy();

		const closeButton = screen.getByRole('button', { name: /close/i });
		fireEvent.click(closeButton);

		expect(screen.queryByText('Test notification description')).toBeNull();
		expect(container.querySelector('.itsa-notification')).toBeNull();
	});

	it('shows icon by default', () => {
		const { container } = render(<Notification {...defaultProps} type="info" />);

		const icon = container.querySelector('.anticon');
		expect(icon).toBeTruthy();
	});

	it('hides icon when showIcon is false', () => {
		const { container } = render(<Notification {...defaultProps} showIcon={false} />);

		const icon = container.querySelector('.anticon-info-circle');
		expect(icon).toBeNull();
	});

	it('applies custom className', () => {
		const { container } = render(<Notification {...defaultProps} className="custom-class" />);

		expect(container.querySelector('.custom-class')).toBeTruthy();
	});

	it('applies testId', () => {
		render(<Notification {...defaultProps} testId="custom-notification" />);

		expect(screen.getByTestId('custom-notification')).toBeTruthy();
	});

	it('renders without title', () => {
		const { container } = render(<Notification description="Only description here" />);

		expect(screen.getByText('Only description here')).toBeTruthy();
		expect(container).toMatchSnapshot();
	});

	it('renders with long description', () => {
		const longDescription =
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
		const { container } = render(<Notification {...defaultProps} description={longDescription} />);

		expect(screen.getByText(longDescription)).toBeTruthy();
		expect(container).toMatchSnapshot();
	});

	it('has correct notification class', () => {
		const { container } = render(<Notification {...defaultProps} type="warning" />);

		const notification = container.querySelector('.itsa-notification');
		expect(notification?.classList.contains('itsa-notification')).toBe(true);
		expect(notification?.classList.contains('itsa-notification--warning')).toBe(true);
	});

	it('renders with width as percentage', () => {
		const { container } = render(<Notification {...defaultProps} width="50%" />);

		const notification = container.querySelector('.itsa-notification') as HTMLElement;
		expect(notification?.style.width).toBe('50%');
	});

	it('maintains visibility when onClose is not provided and close button is clicked', () => {
		render(<Notification {...defaultProps} closable={true} />);

		const closeButton = screen.getByRole('button', { name: /close/i });
		fireEvent.click(closeButton);

		expect(screen.queryByText('Test notification description')).toBeNull();
	});
});
