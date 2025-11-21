import React from 'react';
import type { StoryObj } from '@storybook/react';
import { TreeNode } from '../../components/TreeNode';
import type { IItemTreeNode } from '../../interfaces';
import {
	addChildByParentId,
	addChildrenByParentId,
	updateChildUnderParent,
} from '../../helpers/treeNode';

const meta = {
	title: 'Components/TreeNode',
	component: TreeNode,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Estructura en árbol básica. Acepta una lista de nodos raíz en la prop "items", cada uno con sus "children".',
			},
		},
	},
	argTypes: {
		items: {
			control: 'object',
			description:
				'Lista de nodos raíz. Cada nodo incluye id, description, active, level y children.',
		},
		onEdit: {
			action: 'onEdit',
			description:
				'Callback al presionar el botón "Editar" de un nodo. Recibe el nodo y el id del padre (opcional).',
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

const sampleItems: IItemTreeNode[] = [
		{
			id: 123,
			name: 'NEW SUBCLAS 2',
			active: true,
			fatherAllName: 'NEW CLASS TOYOTA TEST',
			fatherAllId: 47,
			children: [
				{
					id: 126,
					name: 'NEW SUBCLAS N 3',
					active: true,
					parentId: 123,
					fatherAllName: 'NEW CLASS TOYOTA TEST',
					fatherAllId: 47,
					children: [],
				},
			],
		},
		{
			id: 122,
			name: 'NEW SUCLAS 1',
			active: true,
			fatherAllName: 'NEW CLASS TOYOTA TEST',
			fatherAllId: 47,
			children: [
				{
					id: 125,
					name: 'NEW SUBCLAS NIVEL 1.2 UPDATe',
					active: true,
					parentId: 122,
					fatherAllName: 'NEW CLASS TOYOTA TEST',
					fatherAllId: 47,
					children: [],
				},
				{
					id: 124,
					name: 'NEW SUBCLAS NIVEL 2 UPDAT2',
					active: true,
					parentId: 122,
					fatherAllName: 'NEW CLASS TOYOTA TEST',
					fatherAllId: 47,
					children: [],
				},
		],
	},
	// {
	// 	id: 1,
	// 	name: 'Root 1',
	// 	active: true,
	// 	level: 0,
	// 	children: [
	// 		{
	// 			id: 11,
	// 			name: 'Child 1.1',
	// 			active: true,
	// 			level: 1,
	// 			children: [],
	// 		},
	// 		{
	// 			id: 12,
	// 			name: 'Child 1.2',
	// 			active: false,
	// 			level: 1,
	// 			children: [
	// 				{
	// 					id: 121,
	// 					name: 'Child 1.2.1',
	// 					active: true,
	// 					level: 2,
	// 					children: [],
	// 				},
	// 			],
	// 		},
	// 	],
	// },
	// {
	// 	id: 2,
	// 	name: 'Root 2',
	// 	active: false,
	// 	level: 0,
	// 	children: [
	// 		{
	// 			id: 21,
	// 			name: 'Child 2.1',
	// 			active: true,
	// 			level: 1,
	// 			children: [
	// 				{
	// 					id: 211,
	// 					name: 'Child 2.1.1',
	// 					active: true,
	// 					level: 2,
	// 					children: [],
	// 				},
	// 			],
	// 		},
	// 	],
	// },
];

export const Basic: Story = {
	args: {
		items: sampleItems,
		onEdit: (_node, _parentId) => {},
		onAddChild: () => {},
		onExpandParent: () => {},
	},
	parameters: {
		docs: {
			description: {
				story:
					'Ejemplo con una estructura de 2 raíces y varios niveles de anidación.',
			},
		},
	},
};


export const InteractiveHelpersDemo: Story = {
	args: {
		items: sampleItems,
		onEdit: (_node, _parentId) => {},
		onAddChild: () => {},
		onExpandParent: () => {},
	},
	render: args => {
		const [items, setItems] = React.useState<IItemTreeNode[]>(args.items);
		return (
			<div className="flex flex-col gap-4 h-[60dvh]">
				<div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
					<button
						onClick={() =>
							setItems(prev =>
								addChildByParentId(prev, 1, {
									id: Math.floor(Math.random() * 10000),
									description: <span>Child (added via demo)</span>,
									active: true,
									level: 1,
									children: [],
								}),
							)
						}
					>
						Add child under Root 1
					</button>
					<button
						onClick={() =>
							setItems(prev =>
								addChildrenByParentId(prev, 12, [
									{
										id: Math.floor(Math.random() * 10000),
										description: <span>Child 1.2.X (added via demo)</span>,
										active: true,
										level: 2,
										children: [],
									},
									{
										id: Math.floor(Math.random() * 10000),
										description: <span>Child 1.2.Y (added via demo)</span>,
										active: false,
										level: 2,
										children: [],
									},
								]),
							)
						}
					>
						Add children under Child 1.2
					</button>
					<button
						onClick={() =>
							setItems(prev =>
								updateChildUnderParent(prev, 1, {
									id: 11,
									description: <span>Child 1.1 (updated via demo)</span>,
									active: false,
									level: 1,
									children: [],
								}),
							)
						}
					>
						Update Child 1.1 under Root 1
					</button>
				</div>
				<TreeNode
					type="SELECT"
					items={items}
					defaultExpandedIds={[1, 12]}
					onEdit={args.onEdit}
					onAddChild={args.onAddChild}
					onExpandParent={args.onExpandParent}
				/>
			</div>
		);
	},
	argTypes: { items: { control: false } },
	parameters: {
		docs: {
			description: {
				story:
					'Demostración interactiva: usa botones externos para invocar las funciones helper y actualizar el árbol en vivo. Los botones internos del componente son no-ops.',
			},
		},
	},
};
