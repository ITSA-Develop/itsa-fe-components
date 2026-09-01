import { Menu, MenuProps } from "antd";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { useMemo } from "react";
import { getIconByName } from "@/helpers/icons";
import { IProgram, ISubmodule } from "@/interfaces";
import { useAppLayoutStore } from "../../store";

export interface MenuItemsProps {
  openKeysMenuOptions: string[];
  onOpenKeysChange: (openKeys: string[]) => void;
  currentPathKeyString?: string;
  menuItemsNavigate: (program: IProgram) => void;
}

export const MenuItems = ({ currentPathKeyString, openKeysMenuOptions, onOpenKeysChange, menuItemsNavigate }: MenuItemsProps) => {
  const { module } = useAppLayoutStore();

  const { menuItems, programsByKey } = useMemo(() => {
    if (module === undefined) {
      return {
        menuItems: [],
        programsByKey: new Map<string, IProgram>(),
      };
    }

    const programMap = new Map<string, IProgram>();

    const createSubmoduleItem = (submodule: ISubmodule): ItemType<MenuItemType> | null => {
      const children: ItemType<MenuItemType>[] = [
        ...(submodule.groups ?? [])
          .map(createSubmoduleItem)
          .filter((item): item is ItemType<MenuItemType> => item !== null),
        ...submodule.programs
          .filter(program => program.root)
          .map(program => {
            const key = `program-${program.id}`;
            programMap.set(key, program);

            return {
              key,
              label: program.name,
              icon: getIconByName(program.icon, { size: 16 }),
            };
          }),
      ];

      if (children.length === 0) {
        return null;
      }

      return {
        key: `submodule-${submodule.id}`,
        label: submodule.name,
        icon: getIconByName(submodule.icon, { size: 16 }),
        children,
      };
    };

    const moduleChildren = module.submodules
      .map(createSubmoduleItem)
      .filter((item): item is ItemType<MenuItemType> => item !== null);

    return {
      menuItems: moduleChildren,
      programsByKey: programMap,
    };
  }, [module]);

  const handleMenuClick: MenuProps['onClick'] = info => {
    const selectedProgram = programsByKey.get(info.key);

    if (selectedProgram !== undefined) {
      menuItemsNavigate(selectedProgram);
    }
  }

  return <div className="flex max-h-[70dvh] flex-col gap-2 overflow-auto">
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