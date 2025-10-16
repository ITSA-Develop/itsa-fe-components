import { IModule } from '@/interfaces';
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
}

export const Dashboard = ({ modules, itemAction }: ICardModuleProps) => {
	const [isAvailableIdModuleHomeSelected, setIsAvailableIdModuleHomeSelected] = useState<string>();

	const currentModule = useAppLayoutStore(state => state.currentModule);
	const submodulesAgency = useAppLayoutStore(state => state.submodulesAgency);
	

	useEffect(() => {
		const idModuleHomeSelected = dataFromLocalStorage(ELocalStorageKeys.moduleHomeSelectedId);
		if (idModuleHomeSelected) {
			setIsAvailableIdModuleHomeSelected(idModuleHomeSelected);
		}
	}, []);

	const handleViewSubmodules = () => {
		localStorage.removeItem(ELocalStorageKeys.moduleHomeSelectedId);
	};

	const validateTitle = () => {
		if (isAvailableIdModuleHomeSelected) {
			return currentModule?.name ?? '';
		}
		return submodulesAgency.map(submodule => submodule.name).join(', ');
	};

	return (
		<div className="flex-1 h-full flex flex-col">
			{!isAvailableIdModuleHomeSelected ? (
				<div>
					<Home modules={modules} itemAction={itemAction} />
				</div>
			) : (
				<div>
					<BreadcrumbCustom title={'MÓDULOS'} description={validateTitle()} action={handleViewSubmodules} />
					<div className="flex-1 h-full flex flex-col">
						<DashboardSubmodules />
					</div>
				</div>
			)}
		</div>
	);
};
