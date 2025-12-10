import { Button, Input, Layout } from 'antd';
import { ReactNode, useEffect, useMemo } from 'react';
import { DoubleLeftOutlined, SearchOutlined } from '@ant-design/icons';
import { useAppLayoutFooter } from '@/HOC/AppLayoutFooterContext';
import { Content } from 'antd/es/layout/layout';
import { useSidebarStore } from '@/hooks';
import { MenuOptions } from '../MenuOptions';
import { useMenuDataStore } from '@/store';
import { filterMenuItems } from '@/helpers/menu/menuDataTransformer';
import { TExtendedMenuItem } from '@/types';
import { findMenuItemByRoute } from '@/helpers/functions';

export interface SidebarLayoutProps {
	children: ReactNode;
	width?: number;
	loadingAppLayout: boolean;
	onClickOptionMenu: (info: { key: string; item: TExtendedMenuItem }) => void;
}

export const SidebarLayout = ({ children, width = 245, loadingAppLayout, onClickOptionMenu }: SidebarLayoutProps) => {
	const { collapsed, searchTerm, openKeys } = useSidebarStore();
	const { setSearchTerm, setCollapsed, setOpenKeys } = useSidebarStore();
	const menuData = useMenuDataStore(state => state.menuData);
	const { footerComponent } = useAppLayoutFooter();
	const currentPath = window.location.pathname;

	const getParentKeys = (menuItems: TExtendedMenuItem[], targetKey: string, parents: string[] = []): string[] | null => {
		for (const item of menuItems) {
			const itemKey = item?.key !== undefined ? String(item.key) : undefined;
			const nextParents = itemKey ? [...parents, itemKey] : parents;

			if (itemKey === targetKey) {
				return parents;
			}

			if ('children' in item && item.children?.length) {
				const found = getParentKeys(item.children as TExtendedMenuItem[], targetKey, nextParents);
				if (found) return found;
			}
		}
		return null;
	};

	const menuDataFiltered = useMemo(() => {
		const searchTermTrim = searchTerm.trim();
		if (searchTermTrim.length === 0) {
			return menuData;
		}
		const filterResult = filterMenuItems(menuData, searchTermTrim);
		return filterResult;
	}, [searchTerm, menuData]);

	useEffect(() => {
		if (!menuDataFiltered.length) {
			setOpenKeys([]);
			return;
		}

		const selectedItem = findMenuItemByRoute(menuDataFiltered, currentPath);
		if (selectedItem?.key) {
			const parentKeys = getParentKeys(menuDataFiltered, String(selectedItem.key)) ?? [];
			setOpenKeys(parentKeys);
			return;
		}

		setOpenKeys([]);
	}, [menuDataFiltered, setOpenKeys, currentPath]);

	return (
		<Layout hasSider className="gap-2 h-full">
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
							loadingAppLayout={loadingAppLayout}
							onClickOptionMenu={onClickOptionMenu}
							openKeysMenuOptions={openKeys}
							items={menuDataFiltered}
							onOpenKeysChange={setOpenKeys}
						/>
					</div>
					<div className="w-full flex justify-end pr-3 pl-3">
						<Button
							type="link"
							onClick={() => setCollapsed(!collapsed)}
							icon={<DoubleLeftOutlined className="text-gray-400" />}
						/>
					</div>
				</div>
			)}
			<Layout className="rounded-lg h-full">
				<Content className="bg-white-100 rounded-lg pt-3 h-full flex flex-col min-h-0 relative">
					<div className="flex-1 overflow-auto min-h-0 p-2">{children}</div>
					{footerComponent && (
						<div className="h-auto w-full z-50 rounded-bl-lg rounded-br-lg p-1">{footerComponent}</div>
					)}
				</Content>
			</Layout>
		</Layout>
	);
};
