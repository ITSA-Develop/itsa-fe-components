import MenuOptions from '@/components/AppLayout/components/MenuOptions';
import { getAllMenuKeys, transformModuleToMenuData } from '@/helpers';
import { filterMenuItems } from '@/helpers/menu/menuDataTransformer';
import { useSidebarStore } from '@/hooks';
import { useAppLayoutStore } from '@/store/appLayout.store';
import { TExtendedMenuItem, TMenuMode } from '@/types';
import { DoubleLeftOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { ReactNode, useEffect, useMemo } from 'react';
export interface SidebarLayoutProps {
	children: ReactNode;
	onClickOptionMenu: (info: { key: string; item: TExtendedMenuItem }) => void;
	width?: number;
	currentPath?: string;
	modeSidebar?: TMenuMode;
}
export const SidebarLayout = ({
	children,
	onClickOptionMenu,
	width = 235,
	currentPath = '',
	modeSidebar = 'inline',
}: SidebarLayoutProps) => {
	const currentModule  = useAppLayoutStore((state) => state.currentModule);

	const { collapsed, setCollapsed, searchTerm, setSearchTerm, openKeys, setOpenKeys } = useSidebarStore();
	const menuData = useMemo(() => {
		if (!currentModule) {
			return [];
		}
		const originalMenuData = transformModuleToMenuData(currentModule);

		if (!searchTerm.trim()) {
			return originalMenuData;
		}

		return filterMenuItems(originalMenuData, searchTerm);
	}, [currentModule, searchTerm]);

	useEffect(() => {
		if (searchTerm.length > 0) {
			const allKeys = getAllMenuKeys(menuData);
			setOpenKeys(allKeys);
		} else {
			setOpenKeys([]);
		}
	}, [searchTerm, menuData, setOpenKeys]);

	return (
		<Layout hasSider className="gap-2">
			{!collapsed && (
				<div className="flex flex-col pt-3 rounded-lg bg-gray-200" style={{ width: width }}>
					<div className="flex items-center justify-center pr-3 pl-3">
						<Input
							placeholder="Buscar en el menú"
							className="rounded-lg text-sm"
							suffix={<SearchOutlined className="text-gray-300" />}
							defaultValue={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
						/>
					</div>
					<div className="flex-1 overflow-y-auto scrollbar-none h-full max-w-full">
						<MenuOptions
							items={menuData}
							collapsed={collapsed}
							onClickOptionMenu={onClickOptionMenu}
							currentPath={currentPath || ''}
							mode={modeSidebar}
							openKeys={openKeys}
							onOpenKeysChange={setOpenKeys}
						/>
					</div>
					<div className="w-full flex justify-end pr-3 pl-3">
						<Button
							type="link"
							onClick={() => setCollapsed(true)}
							icon={<DoubleLeftOutlined className="text-gray-400" />}
						/>
					</div>
				</div>
			)}
			<Layout className="rounded-lg">
				<Content className="bg-white-100 overflow-auto rounded-lg pt-3 pb-2 pr-4 pl-4">{children}</Content>
			</Layout>
		</Layout>
	);
};
