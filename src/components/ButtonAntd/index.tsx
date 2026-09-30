import { Button as AntButton, ButtonProps } from 'antd';
import { forwardRef, ReactNode } from 'react';

export interface IButtonProps extends ButtonProps {
	children: ReactNode;
}

export const ButtonAntd = forwardRef<HTMLButtonElement, IButtonProps>(({ children, ...rest }, ref) => {
	return (
		<AntButton ref={ref} {...rest}>
			{children}
		</AntButton>
	);
});

ButtonAntd.displayName = 'ButtonAntd';
