import React, { useCallback, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TreeNode } from '../../components/TreeNode';
import { IClassItemTreeNode } from '../../interfaces';

type Story = StoryObj<typeof TreeNode>;

const meta: Meta<typeof TreeNode> = {
	title: 'components/TreeNode',
	component: TreeNode,
	parameters: { layout: 'centered' },
};

export default meta;

function updateNodeById(root: IClassItemTreeNode, targetId: string, updater: (node: IClassItemTreeNode) => IClassItemTreeNode): IClassItemTreeNode {
	if (root.id === targetId) {
		return updater(root);
	}
	if (!root.children || root.children.length === 0) {
		return root;
	}
	return {
		...root,
		children: root.children.map(child => updateNodeById(child, targetId, updater)),
	};
}

const TreePlayground: React.FC<{ initialRoot: IClassItemTreeNode }> = ({ initialRoot }) => {
	const [root, setRoot] = useState<IClassItemTreeNode>(initialRoot);

	const handleAdd = useCallback((parentId: string) => {
		setRoot(prev =>
			updateNodeById(prev, parentId, node => {
				const newChild: IClassItemTreeNode = {
					id: `${node.id}-${(node.children?.length || 0) + 1}`,
					description: `Nueva subclase ${(node.children?.length || 0) + 1}`,
					active: true,
					children: [],
					loaded: true,
				};
				return {
					...node,
					children: [...(node.children || []), newChild],
					loaded: true,
				};
			}),
		);
	}, []);

	const handleToggleActive = useCallback((itemId: string) => {
		setRoot(prev =>
			updateNodeById(prev, itemId, node => ({
				...node,
				active: !node.active,
			})),
		);
	}, []);

	const handleLoadSubclasses = useCallback(async (itemId: string) => {
		// Simula carga remota
		await new Promise(resolve => setTimeout(resolve, 600));
		setRoot(prev =>
			updateNodeById(prev, itemId, node => {
				// Solo poblar si no tenía subclases
				const alreadyHas = node.children && node.children.length > 0;
				return {
					...node,
					children: alreadyHas
						? node.children
						: [
								{
									id: `${node.id}-a`,
									description: `${node.description} A`,
									active: true,
									children: [],
									loaded: true,
								},
								{
									id: `${node.id}-b`,
									description: `${node.description} B`,
									active: true,
									children: [],
									loaded: true,
								},
							],
					loaded: true,
				};
			}),
		);
	}, []);

	return (
		<div  className='w-[520px]'>
			<TreeNode item={root} level={0} onAdd={handleAdd} onToggleActive={handleToggleActive} onLoadSubclasses={handleLoadSubclasses} />
		</div>
	);
};

export const Basic: Story = {
	name: 'Básico',
	render: () => {
		const initial: IClassItemTreeNode = {
			id: 'root',
			description: 'Clasificador raíz',
			active: true,
			loaded: true,
			children: [
				{
					id: 'root-1',
					description: 'Nivel 1 - A',
					active: true,
					loaded: true,
					children: [
						{ id: 'root-1-1', description: 'Nivel 2 - A1', active: true, loaded: true, children: [] },
						{ id: 'root-1-2', description: 'Nivel 2 - A2', active: false, loaded: true, children: [] },
					],
				},
				{
					id: 'root-2',
					description: 'Nivel 1 - B',
					active: true,
					loaded: true,
					children: [],
				},
			],
		};
		return <TreePlayground initialRoot={initial} />;
	},
};

export const LazyLoading: Story = {
	name: 'Carga diferida',
	render: () => {
		const initial: IClassItemTreeNode	 = {
			id: 'root-lazy',
			description: 'Raíz (lazy)',
			active: true,
			loaded: false,
			children: [],
		};
		return <TreePlayground initialRoot={initial} />;
	},
};


