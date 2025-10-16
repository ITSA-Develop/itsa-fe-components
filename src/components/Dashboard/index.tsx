'use client';

import { Button, Card, Input } from 'antd';
import { DownOutlined, SearchOutlined, UpOutlined, CloseCircleFilled } from '@ant-design/icons';
import { useMemo, useState } from 'react';
import { IModule, ISubmodule } from '@/interfaces';
import { Title } from '../Title';
import { getIcon } from '@/helpers/menu/menuDataTransformer';

export interface ICardModuleProps {
	modules: IModule[];
	itemAction: (item: ISubmodule, module: IModule) => void;
}

export const Dashboard = ({ modules, itemAction }: ICardModuleProps) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [expandedCard, setExpandedCard] = useState<number | null>(null);

	const normalizedQuery = searchQuery.trim().toLowerCase();

	const filteredSettings = useMemo(
		() =>
			modules.filter(setting => {
				if (!normalizedQuery) return true;
				if (setting.name.toLowerCase().includes(normalizedQuery)) return true;
				return setting.submodules.some(submodule => submodule.name.toLowerCase().includes(normalizedQuery));
			}),
		[modules, normalizedQuery],
	);

	const toggleCard = (cardId: number) => {
		setExpandedCard(expandedCard === cardId ? null : cardId);
	};

	const labelSubmodule = (submodule: ISubmodule[]) => {
		return submodule.map(s => s.name).join(', ');
	};

	const highlight = (text: string): React.ReactNode => {
		if (!normalizedQuery) return text;
		const index = text.toLowerCase().indexOf(normalizedQuery);
		if (index === -1) return text;
		const before = text.slice(0, index);
		const match = text.slice(index, index + normalizedQuery.length);
		const after = text.slice(index + normalizedQuery.length);
		return (
			<>
				{before}
				<mark className="bg-yellow-100 px-1 rounded-md">{match}</mark>
				{after}
			</>
		);
	};

	return (
		<main className="flex-1 h-full bg-background p-4">
			<div className="max-w-6xl mx-auto">
				<div className="flex flex-col w-full items-center justify-center">
					<Title level={2} title="Módulos disponibles" type="secondary" />
					<div className="w-full">
						<div className="relative max-w-md mx-auto w-full">
							<Input
								allowClear
								type="text"
								placeholder="Buscar configuración o submódulo"
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
								className="pl-10 h-12 border-2 border-border focus-visible:ring-2"
								addonBefore={<SearchOutlined />}
							/>
							{normalizedQuery && (
								<div className="text-xs text-gray-500 mt-2 flex items-center justify-center gap-2">
									<span>
										{filteredSettings.length} {filteredSettings.length === 1 ? 'resultado' : 'resultados'}
									</span>
									<Button
										aria-label="Limpiar búsqueda"
										className="inline-flex items-center gap-1 text-gray-400 hover:!text-gray-900 transition-all"
										onClick={() => setSearchQuery('')}
									>
										<CloseCircleFilled /> Limpiar
									</Button>
								</div>
							)}
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
					{filteredSettings.map(setting => {
						const isExpanded = expandedCard === setting.id;

						return (
							<div key={setting.id} className="flex flex-col">
								<Card
									role="button"
									tabIndex={0}
									aria-expanded={isExpanded}
									title={
										<div className="flex flex-row gap-2 items-center justify-center w-full">
											<div className="flex items-center justify-center shrink-0">{getIcon(setting.icon)}</div>
											<Title className="!m-0" level={4} title={highlight(setting.name)} type="secondary" />
										</div>
									}
									onClick={() => toggleCard(setting.id)}
									onKeyDown={e => {
										if (e.key === 'Enter' || e.key === ' ') toggleCard(setting.id);
									}}
									className="cursor-pointer transition-all hover:shadow-sm hover:primary-700"
								>
									<div className="flex flex-col items-center justify-center gap-0">
										<small className="text-xs text-muted-foreground text-center leading-relaxed text-gray-[#00000073] truncate w-full">
											{normalizedQuery ? (
												<>{highlight(labelSubmodule(setting.submodules))}</>
											) : (
												<>{labelSubmodule(setting.submodules)}</>
											)}
										</small>
										<div className="mt-2">
											{isExpanded ? (
												<UpOutlined className="w-4 h-4 text-muted-foreground text-primary-500" />
											) : (
												<DownOutlined className="w-4 h-4 text-muted-foreground text-primary-500" />
											)}
										</div>
									</div>
								</Card>

								<div
									className={`transition-all overflow-hidden ${isExpanded ? 'mt-2 max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
								>
									<Card className="flex flex-col gap-0 m-0">
										{setting.submodules.map(subOption => (
											<Button
												key={subOption.id}
												className="flex flex-row gap-2 items-center justify-between w-full"
												type="text"
												icon={getIcon(subOption.icon)}
												onClick={() => itemAction(subOption, setting)}
											>
												<small className="text-xs text-foreground text-left truncate w-full">
													{highlight(subOption.name) as any}
												</small>
											</Button>
										))}
									</Card>
								</div>
							</div>
						);
					})}
				</div>

				{filteredSettings.length === 0 && (
					<div className="text-center py-12">
						<p className="text-muted-foreground text-lg">
							No se encontraron configuraciones que coincidan con "{searchQuery}"
						</p>
					</div>
				)}
			</div>
		</main>
	);
};
