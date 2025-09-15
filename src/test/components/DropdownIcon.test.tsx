import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { DropdownIcon } from '../../components/DropdownIcon';

describe('DropdownIcon component', () => {
    const options = { items: [
        { key: 'view', label: 'Ver' },
        { key: 'edit', label: 'Editar' },
    ]};

    it('calls onChange with selected key', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<DropdownIcon options={options} icon={<span>icon</span>} onChange={onChange} />);

        const button = screen.getByRole('button');
        await user.click(button);

        // Opened menu rendered in portal, click item by text
        const item = await screen.findByText('Editar');
        await user.click(item);
        expect(onChange).toHaveBeenCalledWith('edit');
    });
});


