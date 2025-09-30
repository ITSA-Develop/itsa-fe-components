import { Button, ButtonProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface IButtonAddItemProps extends ButtonProps {
	label: string;
	onClick: () => void;
}

export const ButtonAddItem = ({ label, onClick,  ...props }: IButtonAddItemProps) => {
	return (
		<Button
            className={`h-6 bg-white !border !border-gray-900 text-gray-900 hover:!border-gray-900 hover:!bg-gray-50 hover:!text-gray-900 rounded-lg`}
			onClick={onClick}
			icon={<PlusOutlined className='text-gray-900 text-xs' />}
			{...props}
		>
			{label}
		</Button>
	);
};
