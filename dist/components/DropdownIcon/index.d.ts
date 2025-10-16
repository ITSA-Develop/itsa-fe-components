import { ISelectOptionDropdownButton } from '../../interfaces';
import { ReactNode } from 'react';

export interface IDropdownIconProps {
    options: ISelectOptionDropdownButton;
    onChange: (id: string) => void;
    loading?: boolean;
    icon: ReactNode;
}
export declare const DropdownIcon: ({ options, loading, icon, onChange }: IDropdownIconProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map