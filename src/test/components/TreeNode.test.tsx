import { fireEvent, render, screen } from '@testing-library/react';
import { ReactElement } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { TreeNode } from '../../components/TreeNode';
import { ControlActionsProvider } from '../../HOC/ControlActions';
import type { IItemTreeNode } from '../../interfaces';

const renderTree = (ui: ReactElement) =>
	render(<ControlActionsProvider fnApiValidatePermissionAction={async () => true}>{ui}</ControlActionsProvider>);

const child: IItemTreeNode = {
	id: 2,
	name: 'HIBRIDO',
	active: true,
	children: [],
};

const inactiveParent: IItemTreeNode = {
	id: 1,
	name: 'SUV',
	active: false,
	children: [child],
};

const activeParent: IItemTreeNode = {
	id: 1,
	name: 'NUEVOS',
	active: true,
	children: [child],
};

describe('TreeNode', () => {
	it('does not expand an inactive node even when it has children', () => {
		renderTree(
			<TreeNode
				items={[inactiveParent]}
				onEdit={vi.fn()}
				onAddChild={vi.fn()}
				defaultExpandedIds={[inactiveParent.id]}
			/>,
		);

		expect(screen.getByText('SUV')).toBeInTheDocument();
		expect(screen.queryByText('HIBRIDO')).not.toBeInTheDocument();
		expect(screen.queryByRole('button', { name: 'right' })).not.toBeInTheDocument();
	});

	it('expands an active node when the chevron is clicked', () => {
		renderTree(<TreeNode items={[activeParent]} onEdit={vi.fn()} onAddChild={vi.fn()} />);

		expect(screen.queryByText('HIBRIDO')).not.toBeInTheDocument();
		fireEvent.click(screen.getByRole('button', { name: 'right' }));
		expect(screen.getByText('HIBRIDO')).toBeInTheDocument();
	});
});
