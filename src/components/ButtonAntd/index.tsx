import { Button as AntButton, ButtonProps } from 'antd';
import { ReactNode } from 'react';

export interface IButtonProps extends ButtonProps {
	children: ReactNode;
}

export const ButtonAntd = ({ children, ...rest }: IButtonProps) => {
	return <AntButton {...rest}>{children}</AntButton>;
};
