import { IModule, ISubmodule } from '@/interfaces';
import { useAppLayoutStore } from '@/store/appLayout.store';
import { ButtonActiveModule } from './ButtonActiveModule';
import { ButtonInactiveModule } from './ButtonInactiveModule';
import { useMemo, useState } from 'react';
import { ButtonAntd } from '@/components/ButtonAntd';
import { ButtonActiveSubmodule } from './ButtonActiveSubmodule';
import { ButtonInactiveSubmodule } from './ButtonInactiveSubmodule';
import { getIcon } from '@/helpers/menu/menuDataTransformer';
import { Input } from 'antd';

export interface IHomeProps {
	handleNavigateProgram: (program: ISubmodule) => void;
}

export const Home = ({ handleNavigateProgram }: IHomeProps) => {
	// const windowWidth = useViewportStore(state => state.width);
	const currentModule = useAppLayoutStore(state => state.currentModule);
	const setCurrentModule = useAppLayoutStore(state => state.setCurrentModule);
	const currentSubmodule = useAppLayoutStore(state => state.currentSubmodule);
	const setCurrentSubmodule = useAppLayoutStore(state => state.setCurrentSubmodule);
	const agencies = useAppLayoutStore(state => state.currentAgency);
	const modules = agencies?.modules ?? [];
	const submodules = currentModule?.submodules ?? [];
	const [searchBySubmoduleId, setSearchBySubmoduleId] = useState<Record<ISubmodule['id'], string>>({});

	const buttonHeader = (module: IModule) => {
		if (module.id === currentModule?.id) {
			return (
				<ButtonActiveModule
					name={module.name}
					icon={module.icon}
					onclick={() => setCurrentModule(module)}
					type="module"
				/>
			);
		}
		return (
			<ButtonInactiveModule
				name={module.name}
				icon={module.icon}
				onclick={() => setCurrentModule(module)}
				type="module"
			/>
		);
	};

	const programs = (programs: ISubmodule[], isNested = false) => {
		const paddingClass = isNested ? 'pl-3' : '';
		return programs.map(program => (
			<div key={program.id} className={paddingClass}>
				<ButtonAntd
					type="text"
					size="small"
					className="flex justify-start w-full !text-gray-400 hover:!text-gray-900"
					onClick={() => handleNavigateProgram(program)}
				>
					<div className="flex flex-row gap-1 items-center justify-start">
						{getIcon(program.icon, 'w-10 h-10')}
						{program.name}
					</div>
				</ButtonAntd>
			</div>
		));
	};

	const groups = (groups: ISubmodule[]) => {
		return groups.map(group => (
			<div key={group.id}>
				<div className="bg-gray-50 p-2 rounded-lg">
					<strong>{group.name}</strong>
				</div>
				<div className="pt-0.5 pb-0.5">{programs(group.programs ?? [], true)}</div>
			</div>
		));
	};

	const contentSubmodule = (submodule: ISubmodule) => {
		const query = (searchBySubmoduleId[submodule.id] ?? '').toLowerCase().trim();
		const basePrograms = submodule.programs ?? [];
		const baseGroups = submodule.groups ?? [];

		const visiblePrograms = query
			? basePrograms.filter(program => program.name.toLowerCase().includes(query))
			: basePrograms;

		const visibleGroups = query
			? baseGroups
					.map(group => {
						const groupMatches = group.name.toLowerCase().includes(query);
						const filteredGroupPrograms = (group.programs ?? []).filter(p => p.name.toLowerCase().includes(query));
						return groupMatches ? { ...group } : { ...group, programs: filteredGroupPrograms };
					})
					.filter(group => group.name.toLowerCase().includes(query) || (group.programs?.length ?? 0) > 0)
			: baseGroups;

		return (
			<div className="flex-1 p-2 min-h-0 h-full w-full overflow-y-auto">
				<div>{programs(visiblePrograms)}</div>
				<div>{groups(visibleGroups)}</div>
			</div>
		);
	};

	const buttonSubmodule = (submodule: ISubmodule) => {
		if (submodule.id === currentSubmodule?.id) {
			return (
				<ButtonActiveSubmodule
					name={submodule.name}
					icon={submodule.icon ?? ''}
					onclick={() => {
						setCurrentSubmodule(submodule);
					}}
				/>
			);
		}
		return (
			<ButtonInactiveSubmodule
				name={submodule.name}
				icon={submodule.icon ?? ''}
				onclick={() => {
					setCurrentSubmodule(submodule);
				}}
			/>
		);
	};

	const titlePopover = (submodule: ISubmodule) => {
		return (
			<div className="flex flex-row justify-center items-center gap-2 bg-gray-50 rounded-lg">
				<div className="w-full">
					<Input
						placeholder="Buscar"
						allowClear
						value={searchBySubmoduleId[submodule.id] ?? ''}
						onChange={e => setSearchBySubmoduleId(prev => ({ ...prev, [submodule.id]: e.target.value }))}
					/>
				</div>
			</div>
		);
	};

	const currentSubmoduleContent = useMemo(() => {
		if (!currentSubmodule) return null;
		return contentSubmodule(currentSubmodule);
	}, [currentSubmodule, submodules]);

	return (
		<div className="flex-1 h-full w-full flex flex-col">
			<div className="h-22  w-full ">
				<div className="flex flex-col w-full overflow-x-auto overflow-y-hidden md:justify-center md:items-center">
					<div className="flex flex-row flex-nowrap gap-1 md:!gap-2 lg:!gap-3 xl:!gap-4 justify-start items-center">
						{modules.map(module => (
							<div key={module.id}>{buttonHeader(module)}</div>
						))}
					</div>
				</div>
			</div>
			<div className="flex-1 flex flex-col md:flex-row min-h-0 w-full pt-2 pb-2 max-h-[64vh] overflow-y-auto">
				<div className="flex flex-col gap-1 w-full max-h-[24vh] overflow-y-auto md:w-52 md:max-h-none md:!h-full md:overflow-y-hidden shrink-0">
					{submodules.map(submodule => (
						<div key={submodule.id}>{buttonSubmodule(submodule)}</div>
					))}
				</div>
				<div className="flex-1 min-h-0">{currentSubmoduleContent}</div>
			</div>
			<div className="h-auto w-full">
				<div>Ultimos programas visitados</div>
				{currentSubmodule && titlePopover(currentSubmodule)}
				{/* <div className="flex flex-row gap-1 md:!gap-2 lg:!gap-3 xl:!gap-4 flex-wrap">
					{modules.map(module => (
						<div key={module.id}>{buttonHeader(module)}</div>
					))}
				</div> */}
			</div>
		</div>
	);
};
