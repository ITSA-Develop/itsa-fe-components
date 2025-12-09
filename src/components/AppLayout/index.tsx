import { Layout, MenuProps } from 'antd';
import { AppLayoutFooterProvider } from '../../HOC/AppLayoutFooterContext';
import { SidebarLayout } from './components/SidebarLayout';
import { HeaderLayout } from './components/HeaderLayout';
import { ReactNode } from 'react';
import { useSidebarStore, useViewportSize } from '@/hooks';
import { useEffect } from 'react';
import { ELocalStorageKeys } from '@/enums';
import { TExtendedMenuItem } from '@/types';
import { useAppLayoutStore, useMenuDataStore } from '@/store';
import { transformModuleToMenuData } from '@/helpers';

export interface AppLayoutProps {
	children: ReactNode;
	loadingAppLayout: boolean;
	userActions?: MenuProps;
	notifications?: MenuProps;
	onClickOptionMenu: (info: { key: string; item: TExtendedMenuItem }) => void;
}

export const AppLayout = ({
	children,
	loadingAppLayout,
	userActions = { items: [] },
	notifications = { items: [] },
	onClickOptionMenu,
}: AppLayoutProps) => {
	useViewportSize();
	const { setCollapsed } = useSidebarStore();
	const currentModule = useAppLayoutStore(state => state.currentModule);
	const setMenuData = useMenuDataStore(state => state.setMenuData);
	useEffect(() => {
		// Initialize collapsed from localStorage
		const storedCollapsed = localStorage.getItem(ELocalStorageKeys.collapsedSidebar);
		if (storedCollapsed && storedCollapsed === 'true') {
			setCollapsed(true);
		} else {
			setCollapsed(false);
		}
	}, []);

	useEffect(() => {
		if (currentModule) {
			const menuData = transformModuleToMenuData(currentModule);
			setMenuData(menuData ?? []);
		}
	}, [currentModule]);

	return (
		<AppLayoutFooterProvider>
			<div className="flex h-[100dvh] w-full overflow-hidden">
				<Layout className="p-2 gap-2">
					<HeaderLayout loadingAppLayout={loadingAppLayout} userActions={userActions} notifications={notifications} />
					<SidebarLayout loadingAppLayout={loadingAppLayout} onClickOptionMenu={onClickOptionMenu}>
						{children}
					</SidebarLayout>
				</Layout>
			</div>
		</AppLayoutFooterProvider>
	);
};
