import { TExtendedMenuItem, TMenuMode } from '@/types';
import { Menu, MenuProps } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { useSidebarStore } from '@/hooks';
export interface MenuOptionsProps {
	loadingAppLayout: boolean;
	currentPath: string;
	openKeysMenuOptions: string[];
	onClickOptionMenu: MenuProps['onClick'];
	items: TExtendedMenuItem[];
	onOpenKeysChange: (openKeys: string[]) => void;
	mode?: TMenuMode;
}
export const MenuOptions = ({
	loadingAppLayout,
	mode = 'inline',
	items,
	currentPath,
	openKeysMenuOptions,
	onOpenKeysChange,
	onClickOptionMenu,
}: MenuOptionsProps) => {
	const collapsed  = useSidebarStore(state => state.collapsed);
	return (
		<div className="menu-options">
			{loadingAppLayout ? (
				<div className="flex flex-col items-center justify-center h-full pt-10 gap-2">
					<SyncOutlined spin className="text-gray-400" />
					<small className="text-gray-400">Cargando menú</small>
				</div>
			) : (
				<Menu
					mode={mode}
					inlineCollapsed={collapsed}
					items={items}
					className="overflow-auto scrollbar-none border-none min-w-full"
					defaultSelectedKeys={[currentPath]}
					openKeys={openKeysMenuOptions}
					onOpenChange={onOpenKeysChange}
					onClick={onClickOptionMenu}
				/>
			)}
		</div>
	);
};
