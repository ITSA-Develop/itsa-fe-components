import { notification } from 'antd';
import { TNotificationType } from '../../types';

export const useNotification = () => {
	const [api, contextHolder] = notification.useNotification();

	const openNotification = (type: TNotificationType, message: string, description: string) => {
		api[type]({
			message,
			description,
		});
	};

	return {
		api,
		contextHolder,
		openNotification,
	};
};
