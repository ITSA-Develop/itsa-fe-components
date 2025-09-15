import { TNotificationProps } from '@/types';
import { notification } from 'antd';
import { createContext, ReactNode } from 'react';

export interface NotificationsContextType {
	openNotificationWithIcon: (notificationProps: TNotificationProps) => void;
}

export const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const NotificationsProvider = ({ children }: { children: ReactNode }) => {
	const [api, contextHolder] = notification.useNotification();

	const openNotificationWithIcon = (notificationProps: TNotificationProps) => {
		api[notificationProps.type]({
			message: notificationProps.message,
			description: notificationProps.description,
		});
	};

	return (
		<NotificationsContext.Provider value={{ openNotificationWithIcon }}>
			{children}
			{contextHolder}
		</NotificationsContext.Provider>
	);
};

