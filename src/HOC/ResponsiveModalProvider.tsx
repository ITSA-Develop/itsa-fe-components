
import { ModalResponsive } from '@/components/ModalResponsive';
import { createContext, ReactNode, useState } from 'react';

export interface ResponsiveModalContextType {
	openModal: (params: {
		title?: string;
		content: ReactNode;
		footer?: ReactNode;
		onOk?: () => void;
		onCancel?: () => void;
	}) => void;
	closeModal: () => void;
}

export const ResponsiveModalContext = createContext<ResponsiveModalContextType | undefined>(undefined);

export const ResponsiveModalProvider = ({ children }: { children: ReactNode }) => {
	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<ReactNode>(null);
	const [footer, setFooter] = useState<ReactNode>(null);
	const [onOk, setOnOk] = useState<() => void>(() => () => setOpen(false));
	const [onCancel, setOnCancel] = useState<() => void>(() => () => setOpen(false));

	const handleOk = () => {
		onOk?.();
		setOpen(false);
	};

	const handleCancel = () => {
		onCancel?.();
		setOpen(false);
	};

	const openModal = ({ title, content, footer, onOk, onCancel }: {
		title?: string;
		content: ReactNode;
		footer?: ReactNode;
		onOk?: () => void;
		onCancel?: () => void;
	}) => {
		if (title !== undefined) setTitle(title);
		setContent(content);
		if (footer !== undefined) setFooter(footer);
		setOnOk(() => (onOk ? onOk : () => setOpen(false)));
		setOnCancel(() => (onCancel ? onCancel : () => setOpen(false)));
		setOpen(true);
	};

	const closeModal = () => setOpen(false);

	return (
		<ResponsiveModalContext.Provider value={{ openModal, closeModal }}>
			{children}
			<ModalResponsive
				title={title}
				open={open}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={footer}
				content={content}
			/>
		</ResponsiveModalContext.Provider>
	);
};
