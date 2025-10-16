import { ReactNode } from 'react';

export interface IModalResponsiveProps {
    title: string;
    open: boolean;
    onOk: () => void;
    onCancel: () => void;
    footer: ReactNode;
    content: ReactNode;
    height?: string;
    hideScroll?: boolean;
    width?: string;
    beforeClose?: () => void;
}
export declare const ModalResponsive: ({ title, open, onOk, onCancel, footer, content, height, hideScroll, width, beforeClose, }: IModalResponsiveProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map