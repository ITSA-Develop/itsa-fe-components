'use client';

import { Button, Card, Input } from 'antd';
import { SearchOutlined, CloseCircleFilled } from '@ant-design/icons';
import { useMemo, useState } from 'react';
import { IModule } from '@/interfaces';
import { Title } from '@/components/Title';
import { getIcon } from '@/helpers/menu/menuDataTransformer';

export interface ICardModuleProps {
	modules: IModule[];
	itemAction: (module: IModule) => void;
}

export const Home = ({ modules, itemAction }: ICardModuleProps) => {
	const [searchQuery, setSearchQuery] = useState('');

	const normalizedQuery = searchQuery.trim().toLowerCase();

	const filteredModules = useMemo(
		() =>
			modules.filter(module => {
				if (!normalizedQuery) return true;
				if (module.name.toLowerCase().includes(normalizedQuery)) return true;
				return module.submodules.some(submodule => submodule.name.toLowerCase().includes(normalizedQuery));
			}),
		[modules, normalizedQuery],
	);

	// const labelSubmodule = (submodule: ISubmodule[]) => {
	// 	return submodule.map(s => s.name).join(', ');
	// };

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

	const noLinesAvailable = useMemo(() => {
		return !filteredModules.length && !normalizedQuery.length;
	}, [modules, normalizedQuery]);

	return (
		<main className="flex-1 h-full">
			<div className="flex flex-col w-full items-center justify-center">
				<Title level={2} title="Módulos disponibles" type="secondary" />
				<div className="w-1/2">
					<Input
						allowClear
						type="text"
						placeholder="Buscar línea"
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						addonBefore={<SearchOutlined />}
					/>
				</div>
				{normalizedQuery && (
					<div className="text-xs text-gray-500 mt-2 flex items-center justify-center gap-2">
						<span>
							{filteredModules.length} {filteredModules.length === 1 ? 'resultado' : 'resultados'}
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

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
				{filteredModules.map(module => {
					return (
						<div key={module.id} className="flex flex-col">
							<Card
								role="button"
								tabIndex={0}
								onClick={() => itemAction(module)}
								className="cursor-pointer transition-all hover:shadow-sm hover:primary-700"
							>
								<div className="flex flex-col items-center justify-center gap-0">
									<div className="flex flex-row gap-2 items-center justify-center w-full">
										<div className="flex items-center justify-center shrink-0">{getIcon(module.icon, "w-10 h-10")}</div>
										<Title className="!m-0" level={4} title={highlight(module.name)} type="secondary" />
									</div>
								</div>
							</Card>
						</div>
					);
				})}
			</div>

			{filteredModules.length === 0 && normalizedQuery.length > 0 && (
				<div className="text-center py-12">
					<p className="text-muted-foreground text-lg">No se encontraron líneas que coincidan con "{searchQuery}"</p>
				</div>
			)}

			{noLinesAvailable && (
				<div className="flex-1 h-full flex items-center justify-center">
					<Title level={2} title="No hay líneas disponibles" type="secondary" />
				</div>
			)}
		</main>
	);
};
