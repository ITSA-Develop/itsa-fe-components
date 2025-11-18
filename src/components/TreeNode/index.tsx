import React from 'react';
import { IItemTreeNode } from '@/interfaces';
import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import { Button as ButtonAntd } from 'antd';
import { Button } from '@/components/Button';
import { TagStatus } from '@/components/TagStatus';
import { ETreeNodeTypeComponent } from '@/enums';
import { TTreeNodeTypeComponent } from '@/types';

export interface ITreeNodeProps {
	items: IItemTreeNode[];
	onEdit: (node: IItemTreeNode) => void;
	onAddChild: (parent: IItemTreeNode) => void;
	onExpandParent?: (parent: IItemTreeNode, isExpanded: boolean) => void;
	onSelectNode?: (node: IItemTreeNode) => void;
	defaultExpandedIds?: number[];
	type?: TTreeNodeTypeComponent;
}

export const TreeNode: React.FC<ITreeNodeProps> = ({
	items,
	onEdit,
	onAddChild,
	onExpandParent,
	onSelectNode,
	defaultExpandedIds,
	type = 'CRUD',
}) => {
	const [expandedIds, setExpandedIds] = React.useState<Set<number>>(() => new Set(defaultExpandedIds ?? []));

	const toggleExpanded = (id: number) => {
		setExpandedIds(prev => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	};

	const handleEdit = (node: IItemTreeNode) => {
		onEdit(node);
	};
	const handleAddChild = (node: IItemTreeNode) => {
		onAddChild?.(node);
	};
	const handleExpandParent = (node: IItemTreeNode, isExpanded: boolean) => {
		if (onExpandParent) {
			onExpandParent(node, !isExpanded);
		}
		toggleExpanded(node.id);
	};

	const renderNode = (node: IItemTreeNode): React.ReactNode => {
		const level = node.level ?? 0;
		const baseBgColor = level === 0 ? 'bg-gray-25' : 'bg-gray-50';
		const borderColor = 'border-gray-200';
		const hoverColor = 'hover:!bg-gray-75';
		const isExpanded = expandedIds.has(node.id);

		const classNameNode = `nbg w-full min-w-0 ${type === ETreeNodeTypeComponent.select ? 'cursor-pointer' : ''}`;

		return (
			<div key={node.id} className={classNameNode} onClick={() => onSelectNode?.(node)}>
				<div
					className={`${baseBgColor} ${isExpanded ? '!bg-gray-75' : ''} ${borderColor} border rounded-lg p-2 transition-all duration-200 ${hoverColor}`}
					style={{ marginLeft: `${level * 32}px` }}
				>
					<div className="flex items-center gap-1.5">
						<ButtonAntd
							size="small"
							type="default"
							onClick={() => handleExpandParent(node, isExpanded)}
							icon={
								<RightOutlined
									style={{
										transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
									}}
								/>
							}
						/>
						<div className="flex-1 min-w-0">
							<p
								className={`text-slate-900 font-medium text-xs truncate ${!node.active ? 'opacity-40 line-through' : ''}`}
							>
								{node.description}
							</p>
						</div>
						<div className="flex items-center gap-0.5">
							<TagStatus status={node.active} />
							{level < 20 && type === 'CRUD' && (
								<ButtonAntd
									type="default"
									disabled={!node.active}
									icon={<PlusOutlined />}
									size="small"
									onClick={() => handleAddChild(node)}
								/>
							)}
							{type === 'CRUD' && <Button type="text" label="Editar" size="small" onClick={() => handleEdit(node)} />}
						</div>
					</div>
				</div>

				{node.children && node.children.length > 0 && isExpanded && (
					<div className="space-y-1 mt-1">{node.children.map(child => renderNode(child))}</div>
				)}
			</div>
		);
	};

	return <div className="space-y-1">{items.map(n => renderNode(n))}</div>;
};
