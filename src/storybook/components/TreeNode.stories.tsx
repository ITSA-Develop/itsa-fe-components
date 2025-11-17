import React, { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TreeNode } from '../../components/TreeNode';
import { IItemTreeNode } from '../../interfaces';
import { attachHandlersToTree } from '../../helpers';

type Story = StoryObj<typeof TreeNode>;

const meta: Meta<typeof TreeNode> = {
	title: 'components/TreeNode',
	component: TreeNode,
	parameters: { layout: 'centered' },
};

export default meta;

const TreePlayground: React.FC<{ initialRoot: IItemTreeNode }> = ({ initialRoot }) => {
	const [root, setRoot] = useState<IItemTreeNode>(initialRoot);

	// Adjunta handlers por item mediante una función reutilizable
	const treeWithHandlers = useMemo<IItemTreeNode>(() => attachHandlersToTree(root, setRoot), [root]);

	return (
		<div  className='w-[520px]'>
			<TreeNode items={[treeWithHandlers]} level={0} />
		</div>
	);
};

export const Basic: Story = {
	name: 'Básico',
	render: () => {
		const initial: IItemTreeNode = {
			id: 1,
			description: 'Clasificador raíz',
			active: true,
			children: [
				{
					id: 2,
					description: 'Nivel 1 - A',
					active: true,
					children: [
						{ id: 3, description: 'Nivel 2 - A1', active: true, children: [] },
						{ id: 4, description: 'Nivel 2 - A2', active: false, children: [] },
					],
				},
				{
					id: 5,
					description: 'Nivel 1 - B',
					active: true,
					children: [],
				},
			],
		};
		return <TreePlayground initialRoot={initial} />;
	},
};
