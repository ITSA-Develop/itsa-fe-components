'use client';

import { useState } from 'react';
// import { ChevronRight, Plus, Eye, EyeOff, Loader2 } from 'lucide-react';
import { CaretRightOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Button } from 'antd';

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
	const canHaveSubclasses = level < 5; // Limitar profundidad

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

	const bgColor = level === 0 ? 'bg-gray-25' : 'bg-gray-50';
	const borderColor = 'border-gray-200';
	const hoverColor = 'hover:!bg-gray-75';

	return (
		<div className="space-y-1">
			<div
				className={`${bgColor} ${borderColor} border rounded-lg p-2 transition-all duration-200 ${hoverColor}`}
				style={{ marginLeft: `${level * 12}px` }}
			>
				<div className="flex items-center gap-1.5">
					{/* Expand Button */}
                     <Button type="text" icon={<PlusSquareOutlined />} disabled={isLoading} onClick={handleExpand} />
					{/* <button
						onClick={handleExpand}
						disabled={isLoading}
						
					>
						{isLoading ? <PlusSquareOutlined /> : <PlusSquareOutlined />}
					</button> */}

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
							<button
								onClick={() => onAdd(item.id)}
								className={`p-1 rounded transition-colors flex-shrink-0 ${
									isExpanded ? `${hoverColor} text-slate-600 hover:text-slate-900` : 'opacity-30 cursor-not-allowed'
								}`}
								disabled={!isExpanded}
								title={isExpanded ? 'Agregar subclase' : 'Expande el nodo primero'}
							>
								<CaretRightOutlined />
							</button>
						)}

						{/* Toggle Active Button */}
						<button
							onClick={() => onToggleActive(item.id)}
							className={`p-1 rounded transition-colors ${hoverColor} flex-shrink-0 text-slate-600 hover:text-slate-900`}
							title={item.active ? 'Desactivar' : 'Activar'}
						>
							{item.active ? <CaretRightOutlined /> : <CaretRightOutlined />}
						</button>
					</div>
				</div>
			</div>

			{/* Subclasses */}
			{isExpanded && hasSubclasses && (
				<div className="space-y-1">
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
