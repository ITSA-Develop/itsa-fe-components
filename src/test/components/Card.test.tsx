import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Card } from '../../components/Card/Card';

describe('Card component', () => {
	it('renders children content', () => {
		const { container } = render(<Card>Test content</Card>);
		expect(screen.getByText('Test content')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('accepts and applies title prop', () => {
		const { container } = render(<Card title="Card title">Content</Card>);
		expect(screen.getByText('Card title')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('accepts extra prop', () => {
		const { container } = render(
			<Card title="Title" extra={<button>Extra</button>}>
				Content
			</Card>,
		);
		expect(screen.getByText('Extra')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('renders without crashing with no props', () => {
		const { container } = render(<Card />);
		expect(container).toMatchSnapshot();
	});
});
