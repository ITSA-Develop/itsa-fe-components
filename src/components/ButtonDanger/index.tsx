import { Button as AntButton, ButtonProps } from 'antd';

export const ButtonDanger = ({ children }: ButtonProps) => {
	return (
		<AntButton type="text" className="bg-red-50 border-red-500 text-red-500 hover:bg-red-100 hover:border-red-200">
			{children}
		</AntButton>
	);
};
