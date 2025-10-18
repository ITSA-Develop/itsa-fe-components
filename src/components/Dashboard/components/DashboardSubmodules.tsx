import { IActions, ISubmodule } from '@/interfaces';
import { Collapse } from '@/components/Collapse/Collapse';
import { Tag } from '@/components/Tag';
import { Title } from '@/components/Title';
import { getIcon } from '@/helpers/menu/menuDataTransformer';
import { useMemo } from 'react';
import { Button } from 'antd';

export interface IDashboardSubmodulesProps {
	submodules: ISubmodule[];
	handleNavigateProgram: (program: ISubmodule) => void;
}

const getPermissionTag = (actions?: IActions) => {
	if (!actions) return null;
	if (actions.allActions) return <Tag color="green">Full</Tag>;
	const labels: string[] = [];
	if (actions.read) labels.push('R');
	if (actions.create) labels.push('C');
	if (actions.update) labels.push('U');
	if (actions.delete) labels.push('D');
	if (labels.length === 0) return null;
	return <Tag color="blue">{labels.join('')}</Tag>;
};

export const DashboardSubmodules = ({ submodules, handleNavigateProgram }: IDashboardSubmodulesProps) => {
	const items = useMemo(() => {
		return submodules.map(sm => {
			const programsCount =
				(sm.programs?.length || 0) + (sm.groups?.reduce((acc, g) => acc + (g.programs?.length || 0), 0) || 0);
			return {
				key: `submodule-${sm.id}`,
				label: (
					<div className="flex items-center justify-between w-full py-1">
						<div className="flex items-center gap-2">
							{getIcon(sm.icon)}
							<span className="font-semibold">{sm.name}</span>
						</div>
						<span className="text-xs text-gray-500">{programsCount}</span>
					</div>
				),
				children: (
					<div className="flex flex-col gap-3">
						{/* Programs directly under submodule */}
						{(sm.programs?.length || 0) > 0 && (
							<div className="flex flex-col">
								<Title level={5} title="Programas" className="!mb-1 text-gray-700" />
								<div className="flex flex-col divide-y divide-gray-200">
									{sm.programs?.map(p => (
										<button
											key={`program-${p.id}`}
											type="button"
											className="flex items-center justify-between py-1.5 text-left hover:bg-gray-50 rounded-md px-2"
											onClick={() => handleNavigateProgram(p)}
										>
											<div className="flex items-center gap-2">
												{getIcon(p.icon)}
												<span className="text-sm">{p.name}</span>
											</div>
											<div>{getPermissionTag(p.actions)}</div>
										</button>
									))}
								</div>
							</div>
						)}

						{/* Groups and their programs (collapsible) */}
						{sm.groups?.map(group => {
							const groupItems = [
								{
									key: `submodule-${sm.id}-group-${group.id}`,
									label: (
										<div className="flex items-center gap-2 text-gray-700 font-medium w-full">
											{getIcon(group.icon)}
											<span>{group.name}</span>
											<span className="ml-auto text-xs text-gray-500">{group.programs?.length || 0}</span>
										</div>
									),
									children: (
										<div className="flex flex-col gap-1">
											{group.programs?.map(program => (
												<Button
													key={`program-${program.id}`}
													type="default"
													className="w-full flex items-center justify-between hover:!border-primary-700 hover:!bg-primary-50 hover:!text-primary-800"
													onClick={() => handleNavigateProgram(program)}
												>
													<div className="flex items-center gap-2">
														{getIcon(program.icon)}
														<span className="text-sm">{program.name}</span>
													</div>
													<div>{getPermissionTag(program.actions)}</div>
												</Button>
											))}
										</div>
									),
								},
							];
							return (
								<div key={`group-${group.id}`}>
									<Collapse items={groupItems as any} />
								</div>
							);
						})}
					</div>
				),
			};
		});
	}, [submodules, handleNavigateProgram]);

	return (
		<div className="flex-1 h-full">
			<Collapse items={items as any} />
		</div>
	);
};
