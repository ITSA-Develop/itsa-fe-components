import { useState } from 'react';
import { DownOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from '../Button';
import { Button as ButtonAntd } from 'antd';
import { IItemTreeNode } from '@/interfaces';

export interface ITreeNodeProps {
	items: IItemTreeNode[];
	level?: number;
	onAdd?: (parentId: IItemTreeNode) => void;
	onToggleActive?: (itemId: number) => void;
}

export const TreeNodeItem = ({
	item,
	level,
	onAdd,
	onToggleActive,
}: {
	item: IItemTreeNode;
	level: number;
	onAdd?: (parentId: IItemTreeNode) => void;
	onToggleActive?: (itemId: number) => void;
}) => {
	const currentLevel = level;
	const [isExpanded, setIsExpanded] = useState(false);

	const hasSubclasses = item.children && item.children.length > 0;
	const canHaveSubclasses = currentLevel < 20;

	const handleExpand = async () => {
		if (isExpanded) {
			setIsExpanded(false);
		} else {
			setIsExpanded(true);
		}
	};

	const handleAdd = () => {
		(item.onAdd ?? onAdd)?.(item);
		setIsExpanded(true);
	};

	const handleToggle = () => {
		(item.onToggleActive ?? onToggleActive)?.(item.id);
	};

	const baseBgColor = currentLevel === 0 ? 'bg-gray-25' : 'bg-gray-50';
	const rowBgColor = isExpanded ? 'bg-gray-200' : baseBgColor;
	const borderColor = 'border-gray-200';
	const hoverColor = 'hover:!bg-gray-75';

	return (
		<div className="flex-1 nbg w-full h-full min-w-0 min-h-0">
			<div
				className={`${rowBgColor} ${borderColor} border rounded-lg p-2 transition-all duration-200 ${hoverColor}`}
				style={{ marginLeft: `${currentLevel * 32}px` }}
			>
				<div className="flex items-center gap-1.5">
					{/* Expand Button */}
					<ButtonAntd
						size="small"
						type="default"
						onClick={handleExpand}
						icon={isExpanded ? <DownOutlined /> : <RightOutlined />}
					/>

					{/* Item Content */}
					<div className="flex-1 min-w-0">
						<p
							className={`text-slate-900 font-medium text-xs truncate ${!item.active ? 'opacity-40 line-through' : ''}`}
						>
							{item.description}
						</p>
					</div>

					{/* Action Buttons */}
					<div className="flex items-center gap-0.5">
						{/* Add Subclass Button */}
						{canHaveSubclasses && (
							<ButtonAntd type="default" icon={<PlusOutlined />} size="small" onClick={handleAdd} />
						)}

						{/* Toggle Active Button */}
						<Button type="text" label="Editar" size="small" onClick={handleToggle} />
					</div>
				</div>
			</div>

			{/* Subclasses */}
			{isExpanded && hasSubclasses && (
				<div className="space-y-1 mt-1">
					<TreeNode
						items={item.children!}
						level={currentLevel + 1}
						onAdd={onAdd}
						onToggleActive={onToggleActive}
					/>
				</div>
			)}
		</div>
	);
};

export const TreeNode = ({ items, level, onAdd, onToggleActive }: ITreeNodeProps) => {
	const currentLevel = typeof level === 'number' ? level : 0;
	return (
		<div className="flex-1 nbg w-full h-full min-w-0 min-h-0 space-y-1">
			{(items || []).map(node => (
				<TreeNodeItem key={node.id} item={node} level={currentLevel} onAdd={onAdd} onToggleActive={onToggleActive} />
			))}
		</div>
	);
};
