import { TModalFooter } from '../types';
import { ReactNode } from 'react';

interface ModalState {
    open: boolean;
    title: string;
    children: ReactNode;
    size: 'xs' | 'sm' | 'md' | 'lg';
    footer: TModalFooter | null;
    onClose?: () => void;
    openModal: (title: string, size: 'xs' | 'sm' | 'md' | 'lg', children: ReactNode, footer?: TModalFooter | null, onClose?: () => void) => void;
    closeModal: () => void;
}
export declare const useModalStore: import('zustand').UseBoundStore<import('zustand').StoreApi<ModalState>>;
export {};
//# sourceMappingURL=useModalStore.d.ts.map