import { addChildByParentId, addChildrenByParentId, updateChildUnderParent } from '@/helpers/treeNode';
import { IItemTreeNode } from '@/interfaces';
import { create } from 'zustand';

export interface TreesNodeStore {
	currentParent?: IItemTreeNode;
	setCurrentParent: (parent: IItemTreeNode) => void;
	currentUpdatedChild?: IItemTreeNode;
	setCurrentUpdatedChild: (updatedChild: IItemTreeNode) => void;
	onAddChild: (newChild: IItemTreeNode, parent?: IItemTreeNode) => void;
	onUpdateChild: (updatedChild: IItemTreeNode, parent?: IItemTreeNode) => void;
	onAddChildren: (newChildren: IItemTreeNode[], parent?: IItemTreeNode) => void;
	treesNodes: IItemTreeNode[];
	setTreesNodes: (treesNodes: IItemTreeNode[]) => void;
	resetCurrentParent: () => void;
}

export const useTreesNodeStore = create<TreesNodeStore>((set, get) => ({
	currentParent: undefined,
	setCurrentParent: parent => set({ currentParent: parent }),
	currentUpdatedChild: undefined,
	setCurrentUpdatedChild: updatedChild => set({ currentUpdatedChild: updatedChild }),
	treesNodes: [],
	setTreesNodes: treesNodes => set({ treesNodes }),
	onAddChild: (newChild: IItemTreeNode, parent?: IItemTreeNode) => {
		const treesNodes = get().treesNodes;
		if (!parent) {
			const rootChild: IItemTreeNode = {
				...newChild,
				level: 0,
				children: newChild.children ?? [],
			};
			set({ treesNodes: [...treesNodes, rootChild] });
			get().resetCurrentParent();
			return;
		}
		const result = addChildByParentId(treesNodes, parent.id, newChild);
		set({ treesNodes: result });
		get().resetCurrentParent();
	},
	onUpdateChild: (updatedChild: IItemTreeNode, parent?: IItemTreeNode) => {
		if (!parent) {
			get().resetCurrentParent();
			return;
		}
		const treesNodes = get().treesNodes;
		const result = updateChildUnderParent(treesNodes, parent.id, updatedChild);
		set({ treesNodes: result });
		get().resetCurrentParent();
	},
	onAddChildren: (newChildren: IItemTreeNode[], parent?: IItemTreeNode) => {
		if (!parent) {
			get().resetCurrentParent();
			return;
		}
		const treesNodes = get().treesNodes;
		const result = addChildrenByParentId(treesNodes, parent.id, newChildren);
		set({ treesNodes: result });
		get().resetCurrentParent();
	},
	resetCurrentParent: () => {
		set({ currentParent: undefined });
	},
}));
