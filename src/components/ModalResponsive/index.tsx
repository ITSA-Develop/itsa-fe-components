
import { Modal } from 'antd';
import { ReactNode } from 'react';

export interface IModalResponsiveProps {
	title: string;
	open: boolean;
	onOk: () => void;
	onCancel: () => void;
	footer: ReactNode;
	content: ReactNode;
}

export const ModalResponsive = ({ title, open, onOk, onCancel, footer, content }: IModalResponsiveProps) => {
	
	return (
		<Modal
			title={title}
			centered
			open={open}
			onOk={onOk}
			onCancel={onCancel}
			width={{
				xs: '90%',
				sm: '80%',
				md: '70%',
				lg: '60%',
				xl: '50%',
				xxl: '40%',
			}}
			footer={footer}
		>
			{content}
		</Modal>
	);
};
