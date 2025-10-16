import { TDrawerSize, TTabItem } from '../../types';
import { ReactNode } from 'react';

export interface IFormLayout {
    header: {
        title: string;
        subtitle: string;
    };
    items: TTabItem[];
    defaultActiveKey?: string;
    size?: TDrawerSize;
}
export declare const FormLayout: ({ header, items, defaultActiveKey, size }: IFormLayout) => ReactNode;
//# sourceMappingURL=FormLayout.d.ts.map