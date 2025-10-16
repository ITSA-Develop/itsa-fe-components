import { TMenuMode, TExtendedMenuItem } from '../../types';
import { LayoutProps, MenuProps } from 'antd';
import { ReactNode } from 'react';

export interface AppLayoutProps extends LayoutProps {
    loading: boolean;
    currentPath: string;
    widthSidebar: number;
    children: ReactNode;
    onClickOptionMenu: (info: {
        key: string;
        item: TExtendedMenuItem;
    }) => void;
    userActions?: MenuProps;
    notifications?: MenuProps;
    logo?: string;
    modeSidebar?: TMenuMode;
}
export declare const AppLayout: ({ loading, currentPath, widthSidebar, children, onClickOptionMenu, notifications, userActions, logo, modeSidebar, }: AppLayoutProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=AppLayout.d.ts.map