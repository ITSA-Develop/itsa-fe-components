import { TNotificationProps } from '@/types';
import { notification } from 'antd';

export const openNotificationWithIcon = ({ type, message, description }: TNotificationProps) => {
	notification[type]({
		message,
		description,
	});
};
