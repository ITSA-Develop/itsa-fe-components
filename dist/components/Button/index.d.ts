import { ReactNode } from 'react';

export interface IButtonProps {
    size?: 'small' | 'middle' | 'large';
    type?: 'primary' | 'secondary' | 'submit';
    htmlType?: 'button' | 'submit' | 'reset';
    label?: ReactNode;
    disabled?: boolean;
    onClick?: () => void;
    default?: boolean;
    width?: number;
    block?: boolean;
}
export declare const Button: (props: IButtonProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map