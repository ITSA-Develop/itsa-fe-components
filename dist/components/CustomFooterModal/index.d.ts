import { ReactNode, HTMLAttributes } from 'react';

export interface ICustomFooterModalProps {
    cancelLabel?: ReactNode;
    confirmLabel?: ReactNode;
    confirmDisabled?: boolean;
    confirmLoading?: boolean;
    onConfirm: () => void;
    onCancel?: () => void;
    align?: 'start' | 'center' | 'end';
    size?: 'small' | 'middle' | 'large';
    className?: string;
    containerProps?: HTMLAttributes<HTMLDivElement>;
    confirmWidthPercent?: number;
}
export declare const CustomFooterModal: ({ cancelLabel, confirmLabel, confirmDisabled, confirmLoading, onCancel, onConfirm, align, size, className, containerProps, confirmWidthPercent, }: ICustomFooterModalProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map