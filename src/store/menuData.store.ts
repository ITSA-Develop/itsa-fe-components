import { TExtendedMenuItem } from '@/types';
import { create } from 'zustand';

export interface MenuDataStore {
	menuData: TExtendedMenuItem[];
	setMenuData: (menuData: TExtendedMenuItem[]) => void;
    currenItemMenu?: TExtendedMenuItem;
	setCurrenItemMenu: (itemMenu: TExtendedMenuItem) => void;
}

export const useMenuDataStore = create<MenuDataStore>(set => ({
	menuData: [],
	setMenuData: menuData => set({ menuData }),
	currenItemMenu: undefined,
	setCurrenItemMenu: itemMenu => set({ currenItemMenu: itemMenu }),
}));