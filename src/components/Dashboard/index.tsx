import { IModule } from '@/interfaces';
import { BreadcrumbCustom } from '../BreadcrumbCustom';
import { Home } from './components/Home';
import { useAppLayoutStore } from '@/store/appLayout.store';

export interface ICardModuleProps {
	modules: IModule[];
	itemAction: (module: IModule) => void;
}

export const Dashboard = ({ modules, itemAction }: ICardModuleProps) => {
	const currentModule = useAppLayoutStore(state => state.currentModule);

	return (
		<div>
			<BreadcrumbCustom title="MÓDULOS" description={currentModule?.name ?? ''} action={() => {}} />
			<Home modules={modules} itemAction={itemAction} />
		</div>
	);
};
