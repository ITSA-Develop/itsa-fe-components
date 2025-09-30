import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Title } from '../../components/Title';

describe('Title component', () => {
	it('renders level 1 heading with text', () => {
		const { container } = render(<Title title="Título nivel 1" level={1} />);
		expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
		expect(screen.getByText('Título nivel 1')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('applies custom className on level 3', () => {
		const { container } = render(
			<Title title="Clase personalizada" level={3} className="custom-class" />,
		);
		const heading = screen.getByRole('heading', { level: 3 });
		expect(heading).toHaveClass('custom-class');
		expect(container).toMatchSnapshot();
	});

	it('renders level 4 with secondary type style', () => {
		const { container } = render(
			<Title title="Secundario" level={4} type="secondary" />,
		);
		const heading = screen.getByRole('heading', { level: 4 });
		expect(heading).toHaveClass('ant-typography', 'ant-typography-secondary');
		expect(container).toMatchSnapshot();
	});

	it('renders level 5 heading', () => {
		const { container } = render(<Title title="Título nivel 5" level={5} />);
		expect(screen.getByRole('heading', { level: 5 })).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});


