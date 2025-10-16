import { TExtendedMenuItem, TMenuMode } from '../../../../types';
import { default as React } from 'react';

export interface MenuOptionsProps {
    collapsed: boolean;
    currentPath: string;
    onClickOptionMenu: (info: {
        key: string;
        item: TExtendedMenuItem;
    }) => void;
    items?: TExtendedMenuItem[];
    mode?: TMenuMode;
    openKeys?: string[];
    loading?: boolean;
    onOpenKeysChange?: (openKeys: string[]) => void;
}
declare const MenuOptions: React.FC<MenuOptionsProps>;
export default MenuOptions;
//# sourceMappingURL=index.d.ts.map