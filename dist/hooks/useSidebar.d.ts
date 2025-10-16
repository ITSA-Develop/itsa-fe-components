type SidebarStore = {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
    openKeys: string[];
    setOpenKeys: (openKeys: string[]) => void;
};
export declare const useSidebarStore: import('zustand').UseBoundStore<import('zustand').StoreApi<SidebarStore>>;
export {};
//# sourceMappingURL=useSidebar.d.ts.map