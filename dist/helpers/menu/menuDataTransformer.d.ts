import { default as React } from 'react';
import { IModule } from '../../interfaces';
import { TExtendedMenuItem } from '../../types';

export declare const getIcon: (icon: string | null, className?: string) => React.ReactNode;
export declare const transformModuleToMenuData: (module: IModule | null) => TExtendedMenuItem[];
/**
 * Función para filtrar items del menú por término de búsqueda
 */
export declare const filterMenuItems: (menuData: TExtendedMenuItem[], searchTerm: string) => TExtendedMenuItem[];
/**
 * Función para obtener información de un item del menú seleccionado
 */
export declare const getMenuItemInfo: (item: TExtendedMenuItem) => {
    key: React.Key;
    label: React.ReactNode;
    data: import('../../types').TMenuItemData | undefined;
    isLeaf: boolean;
};
//# sourceMappingURL=menuDataTransformer.d.ts.map