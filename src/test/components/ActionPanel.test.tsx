import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { ActionPanel } from '../../components/ActionPanel/ActionPanel';

describe('ActionPanel', () => {
	const items = [
		{ key: '1', label: 'Editar' },
		{ key: '2', label: 'Eliminar' },
	];

	it('renders button with icon', () => {
		const { container } = render(<ActionPanel items={items} />);
		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('shows menu items when button is clicked', async () => {
		const { container } = render(<ActionPanel items={items} />);
		const user = userEvent.setup();

		items.forEach(item => {
			expect(screen.queryByText(item.label)).not.toBeInTheDocument();
		});

		const button = screen.getByRole('button');
		await user.click(button);

		items.forEach(item => {
			expect(screen.getByText(item.label)).toBeInTheDocument();
		});

		expect(container).toMatchSnapshot();
	});
});
