import { TMenuMode } from '@/types';
import { Layout, LayoutProps, MenuProps } from 'antd';
import { ReactNode, useEffect, useMemo } from 'react';
import { HeaderLayout } from './components/HeaderLayout';
import { SidebarLayout } from './components/SidebarLayout';
import { useAppLayoutStore } from '@/store/appLayout.store';
import { dataFromLocalStorage } from '@/helpers/objects';
import { ELocalStorageKeys } from '@/enums';
import { TExtendedMenuItem } from '@/types';
import { useViewportSize } from '@/hooks';

export interface AppLayoutProps extends LayoutProps {
	loading: boolean;
	currentPath: string;
	widthSidebar: number;
	children: ReactNode;
	onClickOptionMenu: (info: { key: string; item: TExtendedMenuItem }) => void;
	userActions?: MenuProps;
	notifications?: MenuProps;
	modeSidebar?: TMenuMode;
}

export const AppLayout = ({
	loading,
	currentPath,
	widthSidebar,
	children,
	onClickOptionMenu,
	notifications = { items: [] },
	userActions = { items: [] },
	modeSidebar = 'inline',
}: AppLayoutProps) => {
	useViewportSize();
	const { agencies, setCurrentModule, setModulesAgency, setCurrentAgency } = useAppLayoutStore();

	const storedData = useMemo(
		() => ({
			moduleId: dataFromLocalStorage(ELocalStorageKeys.moduleId),
			currentEnvironment: dataFromLocalStorage(ELocalStorageKeys.currentEnvironment),
		}),
		[],
	);
	
	useEffect(() => {
		const moduleId = storedData.moduleId;
		if (moduleId) {
			for (const agency of agencies) {
				if (!agency.modules) continue;
				for (const module of agency.modules) {
					if (module.id.toString() === moduleId.toString()) {
						setCurrentModule(module);
						setModulesAgency(agency.modules);
						setCurrentAgency(agency);
						localStorage.setItem(ELocalStorageKeys.agencyId, String(agency.id));
						return;
					}
				}
			}
		}
		const environment = storedData.currentEnvironment;
		for (const agency of agencies) {
			if (!agency.modules) continue;
			for (const module of agency.modules) {
				if (module.entorno === environment) {
					setCurrentModule(module);
					setModulesAgency(agency.modules);
					setCurrentAgency(agency);
					localStorage.setItem(ELocalStorageKeys.agencyId, String(agency.id));
					localStorage.setItem(ELocalStorageKeys.moduleId, String(module.id));
					return;
				}
			}
		}
		const newAgency = agencies[0];
		if (newAgency) {
			setCurrentAgency(newAgency);
			const newModule = newAgency.modules[0];
			if (newModule) {
				setCurrentModule(newModule);
				localStorage.setItem(ELocalStorageKeys.agencyId, String(newAgency.id));
				localStorage.setItem(ELocalStorageKeys.moduleId, String(newModule.id));
				return;
			}
		}
	}, [agencies]);

	return (
		<div className="flex h-[100dvh] w-full overflow-hidden">
			<Layout className="p-2 gap-2">
				<HeaderLayout loadingHeader={loading} notifications={notifications} userActions={userActions} />
				<SidebarLayout
					width={widthSidebar}
					currentPath={currentPath}
					modeSidebar={modeSidebar}
					onClickOptionMenu={onClickOptionMenu}
					loadingMenu={loading}
				>
					{children}
				</SidebarLayout>
			</Layout>
		</div>
	);
};
