'use client';

import { useState } from 'react';
// import { ChevronRight, Plus, Eye, EyeOff, Loader2 } from 'lucide-react';
import { DownOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from '../Button';
import { Button as ButtonAntd } from 'antd';

interface ClassItem {
	id: string;
	name: string;
	active: boolean;
	subclasses?: ClassItem[];
	loaded?: boolean;
}

interface TreeNodeProps {
	item: ClassItem;
	level: number;
	onAdd: (parentId: string) => void;
	onToggleActive: (itemId: string) => void;
	onLoadSubclasses: (itemId: string) => Promise<void>;
}

export function TreeNode({ item, level, onAdd, onToggleActive, onLoadSubclasses }: TreeNodeProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const hasSubclasses = item.subclasses && item.subclasses.length > 0;
	const canHaveSubclasses = level < 20; // Limitar profundidad

	const handleExpand = async () => {
		if (isExpanded) {
			setIsExpanded(false);
		} else {
			if (!item.loaded) {
				setIsLoading(true);
				await onLoadSubclasses(item.id);
				setIsLoading(false);
			}
			setIsExpanded(true);
		}
	};

	const handleAdd = () => {
		onAdd(item.id);
		setIsExpanded(true);
	};

	const baseBgColor = level === 0 ? 'bg-gray-25' : 'bg-gray-50';
	const rowBgColor = isExpanded ? 'bg-gray-200' : baseBgColor;
	const borderColor = 'border-gray-200';
	const hoverColor = 'hover:!bg-gray-75';

	return (
		<div className="flex-1 nbg w-full h-full min-w-0 min-h-0">
			<div
				className={`${rowBgColor} ${borderColor} border rounded-lg pr-2 pl-2 transition-all duration-200 ${hoverColor}`}
				style={{ marginLeft: `${level * 32}px` }}
			>
				<div className="flex items-center gap-1.5">
					{/* Expand Button */}
					<ButtonAntd
						size="small"
						type="default"
						disabled={isLoading}
						onClick={handleExpand}
						icon={isExpanded ? <DownOutlined /> : <RightOutlined />}
					/>

					{/* Item Content */}
					<div className="flex-1 min-w-0">
						<p
							className={`text-slate-900 font-medium text-xs truncate ${!item.active ? 'opacity-40 line-through' : ''}`}
						>
							{item.name}
						</p>
					</div>

					{/* Action Buttons */}
					<div className="flex items-center gap-0.5">
						{/* Add Subclass Button */}
						{canHaveSubclasses && (
							<ButtonAntd type="default" icon={<PlusOutlined />} size="small" onClick={handleAdd} />
						)}

						{/* Toggle Active Button */}
						<Button type="text" label="Editar" size="small" />
					</div>
				</div>
			</div>

			{/* Subclasses */}
			{isExpanded && hasSubclasses && (
				<div className="space-y-1 mt-1">
					{item.subclasses!.map(subitem => (
						<TreeNode
							key={subitem.id}
							item={subitem}
							level={level + 1}
							onAdd={onAdd}
							onToggleActive={onToggleActive}
							onLoadSubclasses={onLoadSubclasses}
						/>
					))}
				</div>
			)}
		</div>
	);
}
