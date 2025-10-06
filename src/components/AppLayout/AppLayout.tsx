import { TMenuMode } from '@/types';
import { Layout, LayoutProps, MenuProps } from 'antd';
import { ReactNode, useEffect, useMemo, useCallback } from 'react';
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
	logo?: string;
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
	logo = '',
	modeSidebar = 'inline',
}: AppLayoutProps) => {
	useViewportSize();
	const { setCurrentAgency, setCurrentModule } = useAppLayoutStore();
	const agencies = useAppLayoutStore(state => state.agencies);
	const modulesAgency = useAppLayoutStore(state => state.modulesAgency);

	const selectOrDefault = useCallback(
		<T extends { id: number }>(items: T[], storedId: string | null, setter: (item: T) => void) => {
			if (!items.length) return;

			if (storedId) {
				const parsedId = Number(storedId);
				if (!isNaN(parsedId)) {
					const foundItem = items.find(item => item.id === parsedId);
					if (foundItem) {
						setter(foundItem);
						return;
					}
				}
			}
			setter(items[0]!);
		},
		[],
	);

	const storedIds = useMemo(
		() => ({
			agencyId: dataFromLocalStorage(ELocalStorageKeys.agencyId),
			moduleId: dataFromLocalStorage(ELocalStorageKeys.moduleId),
		}),
		[],
	);

	useEffect(() => {
		selectOrDefault(agencies, storedIds.agencyId, setCurrentAgency);
	}, [agencies, storedIds.agencyId, setCurrentAgency, selectOrDefault]);

	useEffect(() => {
		selectOrDefault(modulesAgency, storedIds.moduleId, setCurrentModule);
	}, [modulesAgency, storedIds.moduleId, setCurrentModule, selectOrDefault]);

	return (
		<div className="flex h-[100dvh] w-full overflow-hidden">
			<Layout className="p-2 gap-2">
				<HeaderLayout loadingHeader={loading} notifications={notifications} userActions={userActions} logo={logo} />
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
