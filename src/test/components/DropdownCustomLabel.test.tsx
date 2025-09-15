import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { DropdownCustomLabel } from '../../components/DropdownCustomLabel';

describe('DropdownCustomLabel component', () => {
    const options = { items: [
        { key: 'a', label: 'Opción A' },
        { key: 'b', label: 'Opción B' },
    ]};

    it('shows empty label when no items', () => {
        const { container } = render(
            <DropdownCustomLabel emptyLabel="Sin opciones" onChange={vi.fn()} options={{ items: [] }} />,
        );
        expect(container).toHaveTextContent('Sin opciones');
    });

    it('updates label when selecting an item', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<DropdownCustomLabel emptyLabel="Sin opciones" options={options} onChange={onChange} />);

        // Right button has aria-label set
        const trigger = await screen.findByLabelText('Abrir opciones');
        await user.click(trigger);

        const item = await screen.findByText('Opción B');
        await user.click(item);

        expect(onChange).toHaveBeenCalledWith('b');
        // Left button text changes
        expect(await screen.findByText('Opción B')).toBeInTheDocument();
    });
});


