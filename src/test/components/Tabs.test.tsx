import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Tabs } from '../../components/Tabs/Tabs';

const items = [
	{ key: '1', label: 'Tab 1', children: <div>Content 1</div> },
	{ key: '2', label: 'Tab 2', children: <div>Content 2</div> },
];

describe('Tabs component', () => {
	it('renders tabs and switches content', async () => {
		const { container } = render(<Tabs defaultActiveKey="1" items={items} />);

		expect(screen.getByText('Content 1')).toBeInTheDocument();
		expect(screen.queryByText('Content 2')).not.toBeInTheDocument();

		await userEvent.click(screen.getByText('Tab 2'));
		expect(screen.getByText('Content 2')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});
