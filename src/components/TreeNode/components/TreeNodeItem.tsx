'use client';

import { useState } from 'react';
import { TreeNode } from '../index';

interface ClassItem {
	id: string;
	name: string;
	active: boolean;
	subclasses?: ClassItem[];
	loaded?: boolean;
}

export function TreeClassifier() {
	const [items, setItems] = useState<ClassItem[]>([
		{
			id: '1',
			name: 'Clase Principal 1',
			active: true,
			subclasses: [],
			loaded: false,
		},
		{
			id: '2',
			name: 'Clase Principal 2',
			active: true,
			subclasses: [],
			loaded: false,
		},
	]);

	const handleAddItem = (parentId: string | null) => {
		const newId = `${Date.now()}-${Math.random()}`;

		if (parentId === null) {
			setItems([
				...items,
				{
					id: newId,
					name: `Nueva Clase ${items.length + 1}`,
					active: true,
					subclasses: [],
					loaded: false,
				},
			]);
		} else {
			setItems(addItemToTree(items, parentId, newId));
		}
	};

	const addItemToTree = (items: ClassItem[], parentId: string, newId: string): ClassItem[] => {
		return items.map(item => {
			if (item.id === parentId) {
				return {
					...item,
					subclasses: [
						...(item.subclasses || []),
						{
							id: newId,
							name: `Nueva Subclase ${(item.subclasses?.length || 0) + 1}`,
							active: true,
							subclasses: [],
							loaded: false,
						},
					],
				};
			}
			return {
				...item,
				subclasses: item.subclasses ? addItemToTree(item.subclasses, parentId, newId) : undefined,
			};
		});
	};

	const handleToggleActive = (itemId: string) => {
		setItems(toggleActiveInTree(items, itemId));
	};

	const toggleActiveInTree = (items: ClassItem[], itemId: string): ClassItem[] => {
		return items.map(item => {
			if (item.id === itemId) {
				return { ...item, active: !item.active };
			}
			return {
				...item,
				subclasses: item.subclasses ? toggleActiveInTree(item.subclasses, itemId) : undefined,
			};
		});
	};

	const handleLoadSubclasses = async (itemId: string) => {
		await new Promise(resolve => setTimeout(resolve, 800));
		setItems(loadSubclassesInTree(items, itemId));
	};

	const loadSubclassesInTree = (items: ClassItem[], itemId: string): ClassItem[] => {
		return items.map(item => {
			if (item.id === itemId) {
				if (!item.loaded) {
					return {
						...item,
						loaded: true,
						subclasses: [
							{
								id: `${itemId}-sub-1`,
								name: 'Subclase A',
								active: true,
								subclasses: [],
								loaded: false,
							},
							{
								id: `${itemId}-sub-2`,
								name: 'Subclase B',
								active: true,
								subclasses: [],
								loaded: false,
							},
							{
								id: `${itemId}-sub-3`,
								name: 'Subclase C',
								active: true,
								subclasses: [],
								loaded: false,
							},
						],
					};
				}
				return item;
			}
			return {
				...item,
				subclasses: item.subclasses ? loadSubclassesInTree(item.subclasses, itemId) : undefined,
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
