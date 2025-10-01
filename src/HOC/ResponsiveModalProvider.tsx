import { ModalResponsive } from '@/components/ModalResponsive';
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

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
	setBeforeClose: Dispatch<SetStateAction<(() => void) | undefined>>;
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
	const [beforeClose, setBeforeClose] = useState<() => void>();

	const handleOk = () => {
		onOk?.();
		setOpen(false);
	};

	// const handleCancel = () => {
	// 	onCancel?.();
	// 	setOpen(false);
	// };

	const openModal = ({
		title,
		content,
		footer,
		onOk,
		onCancel,
		height,
	}: {
		content: ReactNode;
		title?: string;
		footer?: ReactNode;
		onOk?: () => void;
		onCancel?: () => void;
		height?: string;
	}) => {
		setTitle(title ?? '');
		setContent(content);
		setFooter(footer ?? null);
		setOnOk(() => (onOk ? onOk : () => setOpen(false)));
		setOnCancel(() => (onCancel ? onCancel : () => setOpen(false)));
		setHeight(height ?? '90vh');
		setOpen(true);
	};

	const closeModal = () => {
		setTitle('');
		setContent(null);
		setFooter(null);
		setHeight('90vh');
		setOnOk(() => () => setOpen(false));
		setOnCancel(() => () => setOpen(false));
		setOpen(false);
		onCancel?.();
	};
	return (
		<ResponsiveModalContext.Provider value={{ openModal, closeModal, setBeforeClose }}>
			{children}
			<ModalResponsive
				title={title}
				open={open}
				onOk={handleOk}
				onCancel={closeModal}
				footer={footer}
				content={content}
				height={height}
				beforeClose={beforeClose}
			/>
		</ResponsiveModalContext.Provider>
	);
};
