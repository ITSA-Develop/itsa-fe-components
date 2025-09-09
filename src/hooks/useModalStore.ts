// TODO: deprecate this after ant design UI framework is implemented
import { TModalFooter } from '@/types';
import { ReactNode } from 'react';
import { create } from 'zustand';

interface ModalState {
	open: boolean;
	title: string;
	children: ReactNode;
	size: 'xs' | 'sm' | 'md' | 'lg';
	footer: TModalFooter | null;
	onClose?: () => void;
	openModal: (
		title: string,
		size: 'xs' | 'sm' | 'md' | 'lg',
		children: ReactNode,
		footer?: TModalFooter | null,
		onClose?: () => void,
	) => void;
	closeModal: () => void;
}

export const useModalStore = create<ModalState>(set => ({
	open: false,
	title: '',
	children: null,
	size: 'md',
	footer: null,
	openModal: (title, size, children, footer = null, onClose = undefined) =>
		set({
			open: true,
			title,
			size,
			children,
			footer,
			onClose,
		}),
	closeModal: () =>
		set({
			open: false,
			title: '',
			onClose: undefined,
			children: null,
			size: 'sm',
			footer: null,
		}),
}));
