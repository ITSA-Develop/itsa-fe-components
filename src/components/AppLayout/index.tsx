import { Layout, MenuProps } from 'antd';
import { SidebarLayout } from './components/SidebarLayout';
import { HeaderLayout } from './components/HeaderLayout';
import { ReactNode, useRef } from 'react';
import { useSidebarStore, useViewportSize } from '@/hooks';
import { useEffect } from 'react';
import { ELocalStorageKeys } from '@/enums';
import { TExtendedMenuItem } from '@/types';
import { useAppLayoutStore, useMenuDataStore } from '@/store';
import { transformModuleToMenuData } from '@/helpers';
import { NavigateFunction } from 'react-router-dom';

export interface AppLayoutProps {
	children: ReactNode;
	navigateApp: NavigateFunction;
	loadingAppLayout: boolean;
	userActions?: MenuProps;
	notifications?: MenuProps;
	onClickOptionMenu: (info: { key: string; item: TExtendedMenuItem }) => void;
	accessDenied: boolean;
}

export const AppLayout = ({
	children,
	loadingAppLayout,
	userActions = { items: [] },
	notifications = { items: [] },
	onClickOptionMenu,
	navigateApp,
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
			<Layout className="p-2 gap-2">
				<HeaderLayout
					loadingAppLayout={loadingAppLayout}
					userActions={userActions}
					notifications={notifications}
					navigateApp={navigateApp}
				/>
				<SidebarLayout loadingAppLayout={loadingAppLayout} onClickOptionMenu={onClickOptionMenu}>
					{children}
				</SidebarLayout>
			</Layout>
		</div>
	);
};
