import { Button } from '@/index';
import { DeleteOutlined } from '@ant-design/icons';
import { Typography } from 'antd';


const { Text } = Typography;

interface ListItemProps {
	title: string;
	description: string;
	time: string;
	onDelete?: () => void;
	className?: string;
}

export const ItemList = ({ title, description, time, onDelete }: ListItemProps) => {
	return (
		<div className="flex flex-row items-center justify-between gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
			<div className="flex flex-col gap-4 w-full">
				<div className="flex flex-row items-center justify-between">
					<Text className="text-gray-900 text-sm font-medium truncate">{title}</Text>
					<Text className="text-gray-400 text-xs">{time}</Text>
				</div>
				<Text className="text-gray-400 text-xs truncate">{description}</Text>
			</div>
			<div>
				{onDelete && (
					<Button type="primary" label={<DeleteOutlined />} onClick={onDelete} />
				)}
			</div>
		</div>
	);	
};
