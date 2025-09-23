
import { ModalResponsive } from '@/components/ModalResponsive';
import { createContext, ReactNode, useState } from 'react';

export interface ResponsiveModalContextType {
	openModal: (params: {
		content: ReactNode;
		title?: string;
		footer?: ReactNode;
		onOk?: () => void;
		onCancel?: () => void;
		height?: string;
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
	const [height, setHeight] = useState<string>('90vh');
	const handleOk = () => {
		onOk?.();
		setOpen(false);
	};

	const handleCancel = () => {
		onCancel?.();
		setOpen(false);
	};

	const openModal = ({ title, content, footer, onOk, onCancel, height }: {
		content: ReactNode;
		title?: string;
		footer?: ReactNode;
		onOk?: () => void;
		onCancel?: () => void;
		height?: string;
	}) => {
		if (title !== undefined) setTitle(title);
		setContent(content);
		if (footer !== undefined) setFooter(footer);
		setOnOk(() => (onOk ? onOk : () => setOpen(false)));
		setOnCancel(() => (onCancel ? onCancel : () => setOpen(false)));
		setOpen(true);
		setHeight(height || '90vh');
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
				height={height}
			/>
		</ResponsiveModalContext.Provider>
	);
};
