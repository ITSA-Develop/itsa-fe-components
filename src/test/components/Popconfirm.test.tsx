import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Popconfirm } from '../../components/Popconfirm/Popconfirm';

describe('Popconfirm component', () => {
	it('renders the Popconfirm and shows confirmation text on click', async () => {
		const confirmText = 'Are you sure?';
		const onConfirm = vi.fn();

		const { container } = render(
			<Popconfirm title={confirmText} onConfirm={onConfirm}>
				<button>Delete</button>
			</Popconfirm>,
		);

		const button = screen.getByText('Delete');
		fireEvent.click(button);

		await waitFor(() => {
			const confirmation = screen.getByText(confirmText);
			expect(confirmation).toBeVisible();
		});

		const confirmBtn = screen.getByText('OK');
		fireEvent.click(confirmBtn);

		expect(onConfirm).toHaveBeenCalled();
		expect(container).toMatchSnapshot();
	});
});
