import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface ResponsiveModalContextType {
    openModal: (params: {
        content: ReactNode;
        title?: string;
        footer?: ReactNode;
        onOk?: () => void;
        onCancel?: () => void;
        height?: string;
        width?: string;
    }) => void;
    closeModal: () => void;
    setBeforeClose: Dispatch<SetStateAction<(() => void) | undefined>>;
}
export declare const ResponsiveModalContext: import('react').Context<ResponsiveModalContextType | undefined>;
export declare const ResponsiveModalProvider: ({ children }: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ResponsiveModalProvider.d.ts.map