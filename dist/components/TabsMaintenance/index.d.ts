import { ITabsMaintenanceItem } from '../../interfaces';

export interface ITabsMaintenance {
    items: ITabsMaintenanceItem[];
    onChange: (key: string) => void;
    defaultActiveKey: string;
}
export declare const TabsMaintenance: ({ items, onChange, defaultActiveKey }: ITabsMaintenance) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map