import { Dispatch, SetStateAction } from 'react';
import { IItemTreeNode } from '@/interfaces';

function updateNodeById(root: IItemTreeNode, targetId: number, updater: (node: IItemTreeNode) => IItemTreeNode): IItemTreeNode {
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

export function attachHandlersToTree(
	root: IItemTreeNode,
	setRoot: Dispatch<SetStateAction<IItemTreeNode>>,
): IItemTreeNode {
	const attach = (node: IItemTreeNode): IItemTreeNode => {
		const withChildren = (node.children || []).map(attach);
		return {
			...node,
			children: withChildren,
			onAdd: (parent: IItemTreeNode) => {
				setRoot(prev =>
					updateNodeById(prev, parent.id, current => {
						const newChildBase: IItemTreeNode = {
							id: Date.now(),
							description: `Nueva subclase ${(current.children?.length || 0) + 1}`,
							active: true,
							children: [],
						};
						// Attach handlers to the new child so it can keep adding recursively
						const newChild = attach(newChildBase);
						return {
							...current,
							children: [...(current.children || []), newChild],
						};
					}),
				);
			},
			onToggleActive: (itemId: number) => {
				setRoot(prev =>
					updateNodeById(prev, itemId, current => ({
						...current,
						active: !current.active,
					})),
				);
			},
		};
	};
	return attach(root);
}


