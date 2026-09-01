import { Menu, MenuProps } from "antd";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { useMemo } from "react";
import { useAppLayoutStore } from "../../store/useAppLayoutStore";

export interface MenuItemsProps {
  openKeysMenuOptions: string[];
  onOpenKeysChange: (openKeys: string[]) => void;
  currentPathKeyString?: string;
}

export const MenuItems = ({ currentPathKeyString, openKeysMenuOptions, onOpenKeysChange }: MenuItemsProps) => {
  const { currentSubmodule } = useAppLayoutStore();

  const menuItems = useMemo(() => {
    const menuOPtions: ItemType<MenuItemType>[] = [];
    if (currentSubmodule === undefined) {
      return [];
    }

    for (const submodule of currentSubmodule.programs) {
      menuOPtions.push({
        key: submodule.id,
        label: submodule.name,
        icon: submodule.icon,
      });
    }


    return menuOPtions;
  }, [currentSubmodule]);




  const handleMenuClick: MenuProps['onClick'] = info => {
    console.log(info);
  }


  return <div className="flex flex-col gap-2">
    <Menu
      mode={"inline"}
      items={menuItems}
      selectedKeys={currentPathKeyString ? [currentPathKeyString] : []}
      className="overflow-auto scrollbar-none border-none min-w-full"
      openKeys={openKeysMenuOptions}
      onOpenChange={onOpenKeysChange}
      onClick={handleMenuClick}
    />
  </div>;
}