'use client';

import { useState } from 'react';
import { TreeNode } from '../index';
import { IClassItemTreeNode } from '@/interfaces';

export function TreeClassifier() {
	const [items, setItems] = useState<IClassItemTreeNode[]>([]);

	const handleAddItem = (parentId: string | null) => {
		const newId = `${Date.now()}-${Math.random()}`;

		if (parentId === null) {
			setItems([
				...items,
				{
					id: newId,
					description: `Nueva Clase ${items.length + 1}`,
					active: true,
					children: [],
					loaded: false,
				},
			]);
		} else {
			setItems(addItemToTree(items, parentId, newId));
		}
	};

	const addItemToTree = (items: IClassItemTreeNode[], parentId: string, newId: string): IClassItemTreeNode[] => {
		return items.map(item => {
			if (item.id === parentId) {
				return {
					...item,
					children: [
						...(item.children || []),
						{
							id: newId,
							description: `Nueva Subclase ${(item.children?.length || 0) + 1}`,
							active: true,
							children: [],
							loaded: false,
						},
					],
				};
			}
			return {
				...item,
				children: item.children ? addItemToTree(item.children, parentId, newId) : undefined,
			};
		});
	};

	const handleToggleActive = (itemId: string) => {
		setItems(toggleActiveInTree(items, itemId));
	};

	const toggleActiveInTree = (items: IClassItemTreeNode[], itemId: string): IClassItemTreeNode[] => {
		return items.map(item => {
			if (item.id === itemId) {
				return { ...item, active: !item.active };
			}
			return {
				...item,
				children: item.children ? toggleActiveInTree(item.children, itemId) : undefined,
			};
		});
	};

	const handleLoadSubclasses = async (itemId: string) => {
		await new Promise(resolve => setTimeout(resolve, 800));
		setItems(loadSubclassesInTree(items, itemId));
	};

	const loadSubclassesInTree = (items: IClassItemTreeNode[], itemId: string): IClassItemTreeNode[] => {
		return items.map(item => {
			if (item.id === itemId) {
				if (!item.loaded) {
					return {
						...item,
						loaded: true,
						children: item.children ?? [],
					};
				}
				return item;
			}
			return {
				...item,
				children: item.children ? loadSubclassesInTree(item.children, itemId) : undefined,
			};
		});
	};

	return (
		<div className="space-y-2 w-full h-full">
			<div className="flex justify-between items-center pb-2 border-b !border-gray-200">
				<h2 className="text-sm font-semibold text-slate-900">Estructura de Clases</h2>
				<button
					onClick={() => handleAddItem(null)}
					className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium transition-colors"
				>
					+ Agregar
				</button>
			</div>

			<div className="max-h-96 overflow-y-auto pr-2 space-y-1">
				{items.map(item => (
					<TreeNode
						key={item.id}
						item={item}
						level={0}
						onAdd={handleAddItem}
						onToggleActive={handleToggleActive}
						onLoadSubclasses={handleLoadSubclasses}
					/>
				))}
			</div>
		</div>
	);
}
