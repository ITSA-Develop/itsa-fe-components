import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Collapse as AntCollapse } from 'antd';
import { Collapse } from '../../components/Collapse/Collapse';

const { Panel } = AntCollapse;

describe('Collapse wrapper component', () => {
	it('renders with panels and toggles content visibility', () => {
		const { container } = render(
			<Collapse>
				<Panel header="Panel 1" key="1">
					Content 1
				</Panel>
				<Panel header="Panel 2" key="2">
					Content 2
				</Panel>
			</Collapse>,
		);

		expect(screen.getByText('Panel 1')).toBeInTheDocument();
		expect(screen.getByText('Panel 2')).toBeInTheDocument();

		expect(screen.queryByText('Content 1')).toBeNull();

		fireEvent.click(screen.getByText('Panel 1'));
		expect(screen.getByText('Content 1')).toBeVisible();

		expect(container).toMatchSnapshot();
	});
});
