import React, { useCallback, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TreeNode } from '../../components/TreeNode';

interface ClassItem {
	id: string;
	name: string;
	active: boolean;
	subclasses?: ClassItem[];
	loaded?: boolean;
}

type Story = StoryObj<typeof TreeNode>;

const meta: Meta<typeof TreeNode> = {
	title: 'components/TreeNode',
	component: TreeNode,
	parameters: { layout: 'centered' },
};

export default meta;

function updateNodeById(root: ClassItem, targetId: string, updater: (node: ClassItem) => ClassItem): ClassItem {
	if (root.id === targetId) {
		return updater(root);
	}
	if (!root.subclasses || root.subclasses.length === 0) {
		return root;
	}
	return {
		...root,
		subclasses: root.subclasses.map(child => updateNodeById(child, targetId, updater)),
	};
}

const TreePlayground: React.FC<{ initialRoot: ClassItem }> = ({ initialRoot }) => {
	const [root, setRoot] = useState<ClassItem>(initialRoot);

	const handleAdd = useCallback((parentId: string) => {
		setRoot(prev =>
			updateNodeById(prev, parentId, node => {
				const newChild: ClassItem = {
					id: `${node.id}-${(node.subclasses?.length || 0) + 1}`,
					name: `Nueva subclase ${(node.subclasses?.length || 0) + 1}`,
					active: true,
					subclasses: [],
					loaded: true,
				};
				return {
					...node,
					subclasses: [...(node.subclasses || []), newChild],
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
				const alreadyHas = node.subclasses && node.subclasses.length > 0;
				return {
					...node,
					subclasses: alreadyHas
						? node.subclasses
						: [
								{ id: `${node.id}-a`, name: `${node.name} A`, active: true, subclasses: [], loaded: true },
								{ id: `${node.id}-b`, name: `${node.name} B`, active: true, subclasses: [], loaded: true },
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
		const initial: ClassItem = {
			id: 'root',
			name: 'Clasificador raíz',
			active: true,
			loaded: true,
			subclasses: [
				{
					id: 'root-1',
					name: 'Nivel 1 - A',
					active: true,
					loaded: true,
					subclasses: [
						{ id: 'root-1-1', name: 'Nivel 2 - A1', active: true, loaded: true, subclasses: [] },
						{ id: 'root-1-2', name: 'Nivel 2 - A2', active: false, loaded: true, subclasses: [] },
					],
				},
				{
					id: 'root-2',
					name: 'Nivel 1 - B',
					active: true,
					loaded: true,
					subclasses: [],
				},
			],
		};
		return <TreePlayground initialRoot={initial} />;
	},
};

export const LazyLoading: Story = {
	name: 'Carga diferida',
	render: () => {
		const initial: ClassItem = {
			id: 'root-lazy',
			name: 'Raíz (lazy)',
			active: true,
			loaded: false,
			subclasses: [],
		};
		return <TreePlayground initialRoot={initial} />;
	},
};


