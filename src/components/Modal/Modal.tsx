import { Modal as AntModal, ModalProps } from 'antd';

// TODO: we need to circle back to this later
export const Modal = ({ children, ...rest }: ModalProps) => {
	return <AntModal {...rest}>{children}</AntModal>;
};
