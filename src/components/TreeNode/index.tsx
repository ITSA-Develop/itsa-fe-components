import React from "react";
import { IItemTreeNode } from "@/interfaces";
import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { Button as ButtonAntd } from "antd";
import { Button } from "@/components/Button";
import { TagStatus } from "@/components/TagStatus";

export interface ITreeNodeProps {
	items: IItemTreeNode[];
	onEdit: (node: IItemTreeNode) => void;
	onAddChild: (parent: IItemTreeNode) => void;
	onExpandLoadChildren?: (parent: IItemTreeNode) => Promise<IItemTreeNode[]> | IItemTreeNode[];
	defaultExpandedIds?: number[];
}

export const TreeNode: React.FC<ITreeNodeProps> = ({ items, onEdit, onAddChild, defaultExpandedIds }) => {
	const [expandedIds, setExpandedIds] = React.useState<Set<number>>(
		() => new Set(defaultExpandedIds ?? []),
	);

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

	const renderNode = (node: IItemTreeNode): React.ReactNode => {
		const level = node.level ?? 0;
		const baseBgColor = level === 0 ? "bg-gray-25" : "bg-gray-50";
		const borderColor = "border-gray-200";
		const hoverColor = "hover:!bg-gray-75";
		const hasChildren = Boolean(node.children && node.children.length > 0);
		const canShowExpand = hasChildren;
		const isExpanded = expandedIds.has(node.id);

		return (
			<div key={node.id} className="flex-1 nbg w-full h-full min-w-0 min-h-0">
				<div
					className={`${baseBgColor} ${isExpanded ? "!bg-gray-75" : ""} ${borderColor} border rounded-lg p-2 transition-all duration-200 ${hoverColor}`}
					style={{ marginLeft: `${level * 32}px` }}
				>
					<div className="flex items-center gap-1.5">
						<ButtonAntd
							size="small"
							type="default"
							onClick={() => {
								if (canShowExpand) toggleExpanded(node.id);
								else console.log("Toggle expand (noop):", node);
							}}
							style={{ visibility: canShowExpand ? "visible" : "hidden" }}
							icon={
								hasChildren ? (
									<RightOutlined
										style={{
											transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
										}}
									/>
								) : undefined
							}
						/>

						<div className="flex-1 min-w-0">
							<p className={`text-slate-900 font-medium text-xs truncate ${!node.active ? "opacity-40 line-through" : ""}`}>
								{node.description}
							</p>
						</div>

						<div className="flex items-center gap-0.5">
							<TagStatus status={node.active} />
							{level < 20 && (
								<ButtonAntd
									type="default"
									icon={<PlusOutlined />}
									size="small"
									onClick={() => handleAddChild(node)}
								/>
							)}
							<Button type="text" label="Editar" size="small" onClick={() => handleEdit(node)} />
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
