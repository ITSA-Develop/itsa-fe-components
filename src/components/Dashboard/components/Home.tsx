import { IModule, ISubmodule } from '@/interfaces';
import { useAppLayoutStore } from '@/store/appLayout.store';
import { ButtonActiveModule } from './ButtonActiveModule';
import { ButtonInactiveModule } from './ButtonInactiveModule';
import { Input, Popover } from 'antd';
import { useState } from 'react';
import { ButtonAntd } from '@/components/ButtonAntd';
import { useViewportStore } from '@/store';
import { XIcon } from '@/assets/icons';

export interface IHomeProps {
	modules: IModule[];
	handleNavigateProgram: (program: ISubmodule) => void;
}

export const Home = ({ modules, handleNavigateProgram }: IHomeProps) => {
	const windowWidth = useViewportStore(state => state.width);
	const currentModule = useAppLayoutStore(state => state.currentModule);
	const setCurrentModule = useAppLayoutStore(state => state.setCurrentModule);
	const currentSubmodule = useAppLayoutStore(state => state.currentSubmodule);
	const setCurrentSubmodule = useAppLayoutStore(state => state.setCurrentSubmodule);
	const submodules = currentModule?.submodules ?? [];
	const hasSubmodules = submodules.length > 0;
	const [openSubmoduleId, setOpenSubmoduleId] = useState<ISubmodule['id'] | null>(null);
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
				<ButtonAntd type="text" size="small" className="flex justify-start w-full" onClick={() => handleNavigateProgram(program)}>
					{program.name}
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
				<div className='pt-0.5 pb-0.5'>{programs(group.programs ?? [], true)}</div>
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
			<div className="max-h-[40vh] w-full md:w-[50dvw] overflow-y-auto">
				<div>{programs(visiblePrograms)}</div>
				<div>{groups(visibleGroups)}</div>
			</div>
		);
	};

	const buttonSubmodule = (submodule: ISubmodule) => {
		if (submodule.id === currentSubmodule?.id) {
			return (
				<ButtonActiveModule
					name={submodule.name}
					icon={submodule.icon ?? ''}
					onclick={() => setCurrentSubmodule(submodule)}
					type="submodule"
				/>
			);
		}
		return (
			<ButtonInactiveModule
				name={submodule.name}
				icon={submodule.icon ?? ''}
				onclick={() => setCurrentSubmodule(submodule)}
				type="submodule"
			/>
		);
	};

	const titlePopover = (submodule: ISubmodule) => {
		return (
			<div className="flex flex-row justify-center items-center gap-2 bg-gray-50 p-2 rounded-lg">
				<div className="flex-grow">{submodule.name}</div>
				<div className="w-full">
					<Input
						placeholder="Buscar"
						allowClear
						value={searchBySubmoduleId[submodule.id] ?? ''}
						onChange={e => setSearchBySubmoduleId(prev => ({ ...prev, [submodule.id]: e.target.value }))}
					/>
				</div>
				<ButtonAntd
					type="default"
					size="small"
					onClick={() => {
						setSearchBySubmoduleId(prev => ({ ...prev, [submodule.id]: '' }));
						setOpenSubmoduleId(null);
					}}
				>
					<XIcon />
				</ButtonAntd>
			</div>
		);
	};

	return (
		<div className="flex flex-col gap-2 max-h-[90vh]">
			<div className="flex flex-col w-full justify-center items-center gap-2 bg-gray-50 p-2 rounded-lg">
				<div className="flex flex-row gap-1 md:!gap-2 lg:!gap-3 xl:!gap-4 flex-wrap">
					{modules.map(module => (
						<div key={module.id}>{buttonHeader(module)}</div>
					))}
				</div>
			</div>
			<div className="flex max-h-[64vh] overflow-y-auto">
				<div
					className={`flex flex-col gap-2 min-w-1/4 w-full md:!w-1/4 md:shrink-0 md:flex-none transition-all duration-300 ${
						hasSubmodules ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
					}`}
					aria-hidden={!hasSubmodules}
				>
					{submodules.map(submodule => (
						<Popover
							placement={windowWidth < 900 ? 'bottom' : 'rightTop'}
							trigger="focus"
							open={openSubmoduleId === submodule.id}
							onOpenChange={newOpen => setOpenSubmoduleId(newOpen ? submodule.id : null)}
							title={titlePopover(submodule)}
							content={contentSubmodule(submodule)}
						>
							<div key={submodule.id}>{buttonSubmodule(submodule)}</div>
						</Popover>
					))}
				</div>
			</div>
		</div>
	);
};
