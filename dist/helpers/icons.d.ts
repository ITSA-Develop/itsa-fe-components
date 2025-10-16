import { default as React } from 'react';

import * as Icons from '@/assets/icons';
export type IconName = keyof typeof Icons;
interface GetIconOptions {
    className?: string;
    style?: React.CSSProperties;
}
export declare const getIconByName: (name: string | null | undefined, options?: GetIconOptions) => import("react/jsx-runtime").JSX.Element;
export declare const resolveIconComponent: (name: string | null | undefined) => React.ComponentType<any> | null;
export {};
//# sourceMappingURL=icons.d.ts.map