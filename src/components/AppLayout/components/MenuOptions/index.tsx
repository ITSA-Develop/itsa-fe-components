import { TExtendedMenuItem, TMenuMode } from '@/types';
import { Menu, MenuProps } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { useSidebarStore } from '@/hooks';
import { findMenuItemByRoute, getProgramActionsbyPath } from '@/helpers/functions';
import { useAppLayoutStore } from '@/store';
// import { cleanObject } from '@/helpers';
// import { cleanObject } from '@/helpers';
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
	const currentModule = useAppLayoutStore(state => state.currentModule);
	const handleMenuClick: MenuProps['onClick'] = info => {
		const findMenuItem = (menuItems: TExtendedMenuItem[], key: string): TExtendedMenuItem | null => {
			for (const item of menuItems) {
				if (item.key === key) {
					return item;
				}
				if ('children' in item && item.children) {
					const found = findMenuItem(item.children as TExtendedMenuItem[], key);
					if (found) return found;
				}
			}
			return null;
		};

		const clickedItem = findMenuItem(items, info.key);
		if (clickedItem && onClickOptionMenu) {
			const path = clickedItem.data?.path;
			if (path && currentModule) {
				const program = getProgramActionsbyPath(path, currentModule);
				if (program) {
					setCurrentProgram(program.program);
				}
			}
			onClickOptionMenu({ key: info.key, item: clickedItem });
		}
	};
	const localPath = window.location.pathname;
	const currentPath = findMenuItemByRoute(items, localPath);
	const currentPathKeyString = currentPath?.key?.toString() ?? '';
	console.log('localPath =>',localPath);
	console.log('currentPathKeyString =>',currentPathKeyString);

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
					// inlineCollapsed={collapsed}
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
