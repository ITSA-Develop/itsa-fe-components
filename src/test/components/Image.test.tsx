import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Image } from '../../components/Image';

vi.mock('antd', () => ({
	Image: ({ src, alt, onError, onLoad, width, height, preview, style, ...props }: any) => {
		React.useEffect(() => {
			if (onLoad && src) {
				setTimeout(() => onLoad(), 0);
			}
		}, [src, onLoad]);

		return (
			<img
				src={src}
				alt={alt}
				width={width}
				height={height}
				onError={onError}
				onLoad={onLoad}
				style={style}
				{...props}
			/>
		);
	},
}));

describe('Image component', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders image with basic props', async () => {
		const { container } = render(<Image imgPath="test-image.jpg" alt="Test image" width={200} height={150} />);

		await waitFor(() => {
			const image = screen.getByRole('img');
			expect(image).toHaveAttribute('alt', 'Test image');
			expect(image).toHaveAttribute('src', 'test-image.jpg');
			expect(image).toHaveAttribute('width', '200');
			expect(image).toHaveAttribute('height', '150');
			expect(image).toHaveStyle({ display: 'block' });
		});
		expect(container).toMatchSnapshot();
	});

	it('shows error message when no image path provided', () => {
		const { container } = render(<Image alt="Test image" width={200} height={150} />);

		expect(screen.getByText('No image')).toBeInTheDocument();
		expect(screen.queryByRole('img')).not.toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('shows custom error message when imgPath is not provided', () => {
		const { container } = render(<Image alt="Test image" width={200} height={150} errorLabel="Custom error" />);

		expect(screen.getByText('Custom error')).toBeInTheDocument();
		expect(screen.queryByRole('img')).not.toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('shows error message when image fails to load', async () => {
		const { container } = render(
			<Image imgPath="invalid-image.jpg" alt="Test image" width={200} height={150} errorLabel="Failed to load" />,
		);

		await waitFor(() => {
			const image = screen.getByRole('img');
			fireEvent.error(image);
		});

		await waitFor(() => {
			expect(screen.getByText('Failed to load')).toBeInTheDocument();
			expect(screen.queryByRole('img')).not.toBeInTheDocument();
		});
		expect(container).toMatchSnapshot();
	});

	it('handles image load successfully', async () => {
		const { container } = render(<Image imgPath="test-image.jpg" alt="Test image" width={200} height={150} />);
		await waitFor(() => {
			const image = screen.getByRole('img');
			expect(image).toHaveStyle({ display: 'block' });
		});
		expect(container).toMatchSnapshot();
	});

	it('updates image when imgPath changes', async () => {
		const { rerender, container } = render(
			<Image imgPath="first-image.jpg" alt="Test image" width={200} height={150} />,
		);
		await waitFor(() => {
			const image = screen.getByRole('img');
			expect(image).toHaveAttribute('src', 'first-image.jpg');
			expect(image).toHaveStyle({ display: 'block' });
		});
		rerender(<Image imgPath="second-image.jpg" alt="Test image" width={200} height={150} />);
		await waitFor(() => {
			const image = screen.getByRole('img');
			expect(image).toHaveAttribute('src', 'second-image.jpg');
			expect(image).toHaveStyle({ display: 'block' });
		});
		expect(container).toMatchSnapshot();
	});

	it('shows error when imgPath changes from valid to invalid', async () => {
		const { rerender, container } = render(
			<Image imgPath="valid-image.jpg" alt="Test image" width={200} height={150} errorLabel="Image error" />,
		);

		await waitFor(() => {
			const image = screen.getByRole('img');
			expect(image).toHaveAttribute('src', 'valid-image.jpg');
		});

		rerender(<Image imgPath={undefined} alt="Test image" width={200} height={150} errorLabel="Image error" />);

		await waitFor(() => {
			expect(screen.getByText('Image error')).toBeInTheDocument();
			expect(screen.queryByRole('img')).not.toBeInTheDocument();
		});
		expect(container).toMatchSnapshot();
	});

	it('shows error when imgPath changes from valid to empty string', async () => {
		const { rerender, container } = render(
			<Image imgPath="valid-image.jpg" alt="Test image" width={200} height={150} errorLabel="Empty path error" />,
		);

		await waitFor(() => {
			const image = screen.getByRole('img');
			expect(image).toHaveAttribute('src', 'valid-image.jpg');
		});

		rerender(<Image imgPath="" alt="Test image" width={200} height={150} errorLabel="Empty path error" />);

		await waitFor(() => {
			expect(screen.getByText('Empty path error')).toBeInTheDocument();
			expect(screen.queryByRole('img')).not.toBeInTheDocument();
		});
		expect(container).toMatchSnapshot();
	});

	it('handles onError callback correctly', async () => {
		const { container } = render(
			<Image imgPath="will-fail.jpg" alt="Test image" width={200} height={150} errorLabel="Load failed" />,
		);

		await waitFor(() => {
			const image = screen.getByRole('img');
			expect(image).toBeInTheDocument();
		});

		const image = screen.getByRole('img');
		fireEvent.error(image);

		await waitFor(() => {
			expect(screen.getByText('Load failed')).toBeInTheDocument();
			expect(screen.queryByRole('img')).not.toBeInTheDocument();
		});
		expect(container).toMatchSnapshot();
	});
});
