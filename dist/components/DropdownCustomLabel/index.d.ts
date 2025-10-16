import { ISelectOptionDropdownButton } from '../../interfaces';
import { ReactNode } from 'react';

export interface DropdownCustomLabelProps {
    emptyLabel: string;
    onChange: (value: string) => void;
    defaultValue?: string;
    options?: ISelectOptionDropdownButton;
    loading?: boolean;
    icon?: ReactNode;
}
export declare const DropdownCustomLabel: ({ emptyLabel, onChange, defaultValue, options, loading, icon, }: DropdownCustomLabelProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map