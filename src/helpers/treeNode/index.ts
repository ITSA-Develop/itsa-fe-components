import { IItemTreeNode } from '@/interfaces';
import { Dispatch, SetStateAction } from 'react';

export const updateItemTreeNodeById = (
	node: IItemTreeNode,
	targetId: number,
	updater: (n: IItemTreeNode) => IItemTreeNode,
): IItemTreeNode => {
	if (node.id === targetId) return updater(node);
	if (!node.children || node.children.length === 0) return node;
	return { ...node, children: node.children.map(child => updateItemTreeNodeById(child, targetId, updater)) };
};

export const handleAddChildTreeNode = (
	parent: IItemTreeNode,
	newChild: IItemTreeNode,
	setRoot: Dispatch<SetStateAction<IItemTreeNode>>,
) => {
	setRoot(prev =>
		updateItemTreeNodeById(prev, parent.id, current => {
			const childWithLevel: IItemTreeNode = {
				...newChild,
				level: (current.level ?? 0) + 1,
				children: newChild.children || [],
			};
			return { ...current, children: [...(current.children || []), childWithLevel] };
		}),
	);
};

/**
 * Add a single child node under a parent id within a forest (array) of tree nodes.
 * Returns a new tree array without mutating the original.
 */
export const addChildByParentId = (
	roots: IItemTreeNode[],
	parentId: number,
	newChild: IItemTreeNode,
	setRoot?: (root: IItemTreeNode[]) => void,
): IItemTreeNode[] => {
	const addToNode = (node: IItemTreeNode): IItemTreeNode =>
		updateItemTreeNodeById(node, parentId, current => {
			const childWithLevel: IItemTreeNode = {
				...newChild,
				level: (current.level ?? 0) + 1,
				children: newChild.children || [],
			};
			return { ...current, children: [...(current.children || []), childWithLevel] };
		});

	const result = roots.map(addToNode);
	setRoot?.(result);
	return result;
};

/**
 * Add multiple children under a parent id within a forest (array) of tree nodes.
 * Returns a new tree array without mutating the original.
 */
export const addChildrenByParentId = (
	roots: IItemTreeNode[],
	parentId: number,
	newChildren: IItemTreeNode[],
	setRoot?: (root: IItemTreeNode[]) => void,
): IItemTreeNode[] => {
	const addToNode = (node: IItemTreeNode): IItemTreeNode =>
		updateItemTreeNodeById(node, parentId, current => {
			const mappedChildren = (newChildren || []).map(child => ({
				...child,
				level: (current.level ?? 0) + 1,
				children: child.children || [],
			}));
			return { ...current, children: mappedChildren };
		});
	const result = roots.map(addToNode);
	setRoot?.(result);
	return result;	
};

/**
 * Update a direct child under a given parent id within a forest (array) of tree nodes.
 * Matches the child to replace by its id (taken from updatedChild.id).
 * Returns a new tree array without mutating the original.
 */
export const updateChildUnderParent = (
	roots: IItemTreeNode[],
	parentId: number,
	updatedChild: IItemTreeNode,
	setRoot?: (root: IItemTreeNode[]) => void,
): IItemTreeNode[] => {
	const updateInNode = (node: IItemTreeNode): IItemTreeNode =>
		updateItemTreeNodeById(node, parentId, current => {
			const nextChildren = (current.children || []).map(child =>
				child.id === updatedChild.id
					? {
							...updatedChild,
							level: (current.level ?? 0) + 1,
							children: updatedChild.children || [],
						}
					: child,
			);
			return { ...current, children: nextChildren };
		});

	const result = roots.map(updateInNode);
	setRoot?.(result);
	return result;
};
