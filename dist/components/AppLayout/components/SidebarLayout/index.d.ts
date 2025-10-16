import { TExtendedMenuItem, TMenuMode } from '../../../../types';
import { ReactNode } from 'react';

export interface SidebarLayoutProps {
    children: ReactNode;
    onClickOptionMenu: (info: {
        key: string;
        item: TExtendedMenuItem;
    }) => void;
    width?: number;
    currentPath?: string;
    modeSidebar?: TMenuMode;
    loadingMenu?: boolean;
}
export declare const SidebarLayout: ({ children, onClickOptionMenu, width, currentPath, modeSidebar, loadingMenu, }: SidebarLayoutProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map