import { ELocalStorageKeys } from '@/enums';
import { create } from 'zustand';
import { IProgram } from '..';

type SidebarStore = {
	collapsed: boolean;
	setCollapsed: (collapsed: boolean) => void;
	searchTerm: string;
	setSearchTerm: (searchTerm: string) => void;
	openKeys: string[];
	setOpenKeys: (openKeys: string[]) => void;
		currentProgram?: IProgram;
	setCurrentProgram: (program: IProgram) => void;
};

export const useSidebarStore = create<SidebarStore>(set => ({
	collapsed: false,
	setCollapsed: collapsed => {
		set({ collapsed });
		localStorage.setItem(ELocalStorageKeys.collapsedSidebar, String(collapsed));
	},
	searchTerm: '',
	setSearchTerm: searchTerm => set({ searchTerm }),
	openKeys: [],
	setOpenKeys: openKeys => set({ openKeys }),
	currentProgram: undefined,
	setCurrentProgram: program => set({ currentProgram: program }),
}));
