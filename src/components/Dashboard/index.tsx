import { IModule, ISubmodule } from '@/interfaces';
import { BreadcrumbCustom } from '../BreadcrumbCustom';
import { Home } from './components/Home';
import { useAppLayoutStore } from '@/store/appLayout.store';
import { ELocalStorageKeys } from '@/enums';
import { useEffect, useState } from 'react';
import { dataFromLocalStorage } from '@/helpers/objects';
import { DashboardSubmodules } from './components/DashboardSubmodules';

export interface ICardModuleProps {
	modules: IModule[];
	itemAction: (module: IModule) => void;
	handleNavigateProgram: (program: ISubmodule) => void;
}

export const Dashboard = ({ modules, itemAction, handleNavigateProgram }: ICardModuleProps) => {
	const [isAvailableIdModuleHomeSelected, setIsAvailableIdModuleHomeSelected] = useState<string>();

	const currentModule = useAppLayoutStore(state => state.currentModule);
	const submodulesAgency = useAppLayoutStore(state => state.submodulesAgency);
	const setCurrentModule = useAppLayoutStore(state => state.setCurrentModule);

	useEffect(() => {
		const idModuleHomeSelected = dataFromLocalStorage(ELocalStorageKeys.moduleHomeSelectedId);
		if (idModuleHomeSelected) {
			setIsAvailableIdModuleHomeSelected(idModuleHomeSelected);
		}
	}, []);

	const handleViewSubmodules = () => {
		localStorage.removeItem(ELocalStorageKeys.moduleHomeSelectedId);
		setIsAvailableIdModuleHomeSelected(undefined);
	};

	const validateTitle = () => {
		if (isAvailableIdModuleHomeSelected) {
			return currentModule?.name ?? '';
		}
		return submodulesAgency.map(submodule => submodule.name).join(', ');
	};

	const handleItemActionHome = (module: IModule) => {
		itemAction(module);
		setCurrentModule(module);
		localStorage.setItem(ELocalStorageKeys.moduleHomeSelectedId, String(module.id));
		setIsAvailableIdModuleHomeSelected(String(module.id));
	};

	return (
		<div className="flex-1 h-full flex flex-col">
			{!isAvailableIdModuleHomeSelected ? (
				<div>
					<Home modules={modules} itemAction={handleItemActionHome} />
				</div>
			) : (
				<div>
					<BreadcrumbCustom title={'MÓDULOS'} description={validateTitle()} action={handleViewSubmodules} />
					<div className="flex-1 h-full flex flex-col">
						<DashboardSubmodules submodules={submodulesAgency} handleNavigateProgram={handleNavigateProgram} />
					</div>
				</div>
			)}
		</div>
	);
};
