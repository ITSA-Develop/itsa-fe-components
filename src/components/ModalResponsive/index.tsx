import { Modal, Grid } from 'antd';
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
	beforeClose?: () => void;
}

export const ModalResponsive = ({
	title,
	open,
	onOk,
	onCancel,
	footer,
	content,
	height,
	hideScroll = true,
	beforeClose,
}: IModalResponsiveProps) => {
	const screens = Grid.useBreakpoint();
	const computedWidth = screens.xxl
		? '40%'
		: screens.xl
			? '50%'
			: screens.lg
				? '60%'
				: screens.md
					? '70%'
					: screens.sm
						? '80%'
						: '90%';

	return (
		<Modal
			title={title}
			centered
			open={open}
			onOk={onOk}
			onCancel={onCancel}
			destroyOnHidden
			width={computedWidth}
			styles={{ body: { height, maxHeight: height, overflowY: hideScroll ? 'hidden' : 'auto' } }}
			footer={footer}
			afterClose={beforeClose}
		>
			{content}
		</Modal>
	);
};
