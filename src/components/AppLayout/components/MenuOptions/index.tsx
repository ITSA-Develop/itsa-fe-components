import { TExtendedMenuItem, TMenuMode } from '@/types';
import { Menu, MenuProps } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { useSidebarStore } from '@/hooks';
import { findMenuItemByRoute, getProgramActionsbyPath } from '@/helpers/functions';
import { useLegacyAppLayoutStore, useMenuDataStore } from '@/store';
import { useEffect, useMemo } from 'react';
export interface MenuOptionsProps {
	loadingAppLayout: boolean;
	openKeysMenuOptions: string[];
	onClickOptionMenu: (info: { key: string; item: TExtendedMenuItem }) => void;
	items: TExtendedMenuItem[];
	onOpenKeysChange: (openKeys: string[]) => void;
	mode?: TMenuMode;
}
export const MenuOptions = ({
	loadingAppLayout,
	mode = 'inline',
	items,
	openKeysMenuOptions,
	onOpenKeysChange,
	onClickOptionMenu,
}: MenuOptionsProps) => {
	const setCurrentProgram = useSidebarStore(state => state.setCurrentProgram);
	const setCurrentItemMenu = useMenuDataStore(state => state.setCurrenItemMenu);
	const currentModule = useLegacyAppLayoutStore(state => state.currentModule);
	const localPath = window.location.pathname;
	const currentPathModule = useMemo(() => findMenuItemByRoute(items, localPath), [items, localPath]);
	const currentPathKeyString = currentPathModule?.key?.toString() ?? '';
	
	useEffect(() => {
		if (currentPathModule) {
			setCurrentItemMenu(currentPathModule);
		}
	}, [currentPathModule, setCurrentItemMenu]);

	const handleMenuClick: MenuProps['onClick'] = info => {
		const findMenuItem = (menuItems: TExtendedMenuItem[], key: string): TExtendedMenuItem | null => {
			for (const item of menuItems) {
				if (item.key === key) {
					return item;
				}
				if ('children' in item && item.children !== undefined) {
					const found = findMenuItem(item.children as TExtendedMenuItem[], key);
					if (found) return found;
				}
			}
			return null;
		};

		const clickedItem = findMenuItem(items, info.key);
		if (clickedItem !== null && onClickOptionMenu !== undefined) {
			const path = clickedItem.data?.path;
			if (path !== null && currentModule !== undefined) {
				const program = getProgramActionsbyPath(path ?? '', currentModule);
				if (program) {
					setCurrentProgram(program.program);
				}
			}
			onClickOptionMenu({ key: info.key, item: clickedItem });
		}
	};

	return (
		<div className="menu-options">
			{loadingAppLayout && items.length === 0 ? (
				<div className="flex flex-col items-center justify-center h-full pt-10 gap-2">
					<SyncOutlined spin className="text-gray-400" />
					<small className="text-gray-400">Cargando menú</small>
				</div>
			) : (
				<Menu
					mode={mode}
					items={items}
					selectedKeys={currentPathKeyString ? [currentPathKeyString] : []}
					className="overflow-auto scrollbar-none border-none min-w-full"
					openKeys={openKeysMenuOptions}
					onOpenChange={onOpenKeysChange}
					onClick={handleMenuClick}
				/>
			)}
		</div>
	);
};
