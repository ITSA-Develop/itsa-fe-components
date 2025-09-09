import { Button as AntButton, ButtonProps } from 'antd';

export const Button = ({ children, ...rest }: ButtonProps) => {
	return <AntButton {...rest}>{children}</AntButton>;
};
