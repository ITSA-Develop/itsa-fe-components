import { Layout, MenuProps } from 'antd';
import { AppLayoutFooterProvider } from '../../HOC/AppLayoutFooterContext';
import { SidebarLayout } from './components/SidebarLayout';
import { HeaderLayout } from './components/HeaderLayout';
import { ReactNode } from 'react';
import { useSidebarStore, useViewportSize } from '@/hooks';
import { useEffect } from 'react';
import { ELocalStorageKeys } from '@/enums';
import { IAgency, IModule } from '@/interfaces';
import { TExtendedMenuItem } from '@/types';

export interface AppLayoutProps {
	children: ReactNode;
	onChangeModule: (module: IModule) => void;
	onChangeAgency: (agency: IAgency) => void;
	loadingAppLayout: boolean;
	userActions?: MenuProps;
	notifications?: MenuProps;
	currentPath: string;
	onClickOptionMenu: MenuProps['onClick'];
	openKeysMenuOptions: string[];
	itemsMenuOptions: TExtendedMenuItem[];
	onOpenKeysChange: (openKeys: string[]) => void;
}

export const AppLayout = ({
	children,
	onChangeModule,
	onChangeAgency,
	loadingAppLayout,
	userActions = { items: [] },
	notifications = { items: [] },
	currentPath = '',
	onClickOptionMenu,
	openKeysMenuOptions = [],
	itemsMenuOptions = [],
	onOpenKeysChange,
}: AppLayoutProps) => {

	useViewportSize();
	const { setCollapsed } = useSidebarStore();

	useEffect(() => {
		// Initialize collapsed from localStorage
		const storedCollapsed = localStorage.getItem(ELocalStorageKeys.collapsedSidebar);
		if (storedCollapsed && storedCollapsed === 'true') {
			setCollapsed(true);
		} else {
			setCollapsed(false);
		}
	}, []);

	
	return (
		<AppLayoutFooterProvider>
			<div className="flex h-[100dvh] w-full overflow-hidden">
				<Layout className="p-2 gap-2">
					<HeaderLayout
						onChangeModule={onChangeModule}
						onChangeAgency={onChangeAgency}
						loadingAppLayout={loadingAppLayout}
						userActions={userActions}
						notifications={notifications}
					/>
					<SidebarLayout
						loadingAppLayout={loadingAppLayout}
						currentPath={currentPath}
						onClickOptionMenu={onClickOptionMenu}
						openKeysMenuOptions={openKeysMenuOptions}
						itemsMenuOptions={itemsMenuOptions}
						onOpenKeysChange={onOpenKeysChange}
					>
						{children}
					</SidebarLayout>
				</Layout>
			</div>
		</AppLayoutFooterProvider>
	);
};
