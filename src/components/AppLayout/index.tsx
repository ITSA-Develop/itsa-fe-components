import { Layout, MenuProps } from 'antd';
import { SidebarLayout } from './components/SidebarLayout';
import { ReactNode, useRef } from 'react';
import { useSidebarStore, useViewportSize } from '@/hooks';
import { useEffect } from 'react';
import { ELocalStorageKeys } from '@/enums';
import { TExtendedMenuItem } from '@/types';
import { useAppLayoutStore, useMenuDataStore } from '@/store';
import { transformModuleToMenuData } from '@/helpers';
import { NavigateFunction } from 'react-router-dom';
import { HeaderLayout } from './components/Header';
import { DefaultOptionType } from 'antd/es/select';
import { IItemNotification } from '@/interfaces';

export interface AppLayoutProps {
	children: ReactNode;
	navigateApp: NavigateFunction;
	loadingAppLayout: boolean;
	userActions?: MenuProps;
	notifications?: IItemNotification[];
	onClickOptionMenu: (info: { key: string; item: TExtendedMenuItem }) => void;
	accessDenied: boolean;
	showMultiCompanySelector: boolean;
	optionsCompany: DefaultOptionType[];
}

export const AppLayout = ({
	children,
	loadingAppLayout,
	userActions = { items: [] },
	notifications = [],
	onClickOptionMenu,
	navigateApp,
	showMultiCompanySelector,
	optionsCompany,
}: AppLayoutProps) => {
	const initCollapsed = useRef(false);
	useViewportSize();
	const { setCollapsed } = useSidebarStore();
	const currentModule = useAppLayoutStore(state => state.currentModule);
	const setMenuData = useMenuDataStore(state => state.setMenuData);
	useEffect(() => {
		if (initCollapsed.current) return;
		initCollapsed.current = true;
		const storedCollapsed = localStorage.getItem(ELocalStorageKeys.collapsedSidebar);
		if (storedCollapsed !== undefined && storedCollapsed === 'true') {
			setCollapsed(true);
		} else {
			setCollapsed(false);
		}
	}, [setCollapsed]);

	useEffect(() => {
		if (currentModule) {
			const menuData = transformModuleToMenuData(currentModule);
			setMenuData(menuData ?? []);
		}
	}, [currentModule, setMenuData]);

	return (
		<div className="flex h-[100dvh] w-full overflow-hidden">
			<Layout className="md:p-2 gap-0.5 md:gap-2">
				<HeaderLayout
					showMultiCompanySelector={showMultiCompanySelector}
					optionsCompany={optionsCompany}
					userActions={userActions}
					notifications={notifications}
					loadingAppLayout={loadingAppLayout}
					navigateApp={navigateApp}
				/>
				<SidebarLayout loadingAppLayout={loadingAppLayout} onClickOptionMenu={onClickOptionMenu}>
					{children}
				</SidebarLayout>
			</Layout>
		</div>
	);
};
