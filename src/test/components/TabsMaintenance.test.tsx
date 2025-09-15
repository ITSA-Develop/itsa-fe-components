import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TabsMaintenance } from '../../components/TabsMaintenance';
import { ITabsMaintenanceItem } from '../../interfaces';

describe('TabsMaintenance component', () => {
    const items: ITabsMaintenanceItem[] = [
        { key: '1', label: 'Tab 1', children: <div>Contenido 1</div> },
        { key: '2', label: 'Tab 2', children: <div>Contenido 2</div> },
    ];

    it('renders tabs with default active key', () => {
        const { container } = render(
            <TabsMaintenance items={items} defaultActiveKey="1" onChange={() => {}} />,
        );

        expect(screen.getByText('Contenido 1')).toBeInTheDocument();
        expect(screen.queryByText('Contenido 2')).not.toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('calls onChange when switching tabs', async () => {
        const onChange = vi.fn();
        render(<TabsMaintenance items={items} defaultActiveKey="1" onChange={onChange} />);

        await userEvent.click(screen.getByRole('tab', { name: 'Tab 2' }));
        expect(onChange).toHaveBeenCalled();
    });
});


