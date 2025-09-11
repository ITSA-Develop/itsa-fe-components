import { TNotificationProps } from '@/types';
import { notification } from 'antd';
import { createContext, useContext, ReactNode } from 'react';

interface NotificationsContextType {
	openNotificationWithIcon: (notificationProps: TNotificationProps) => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

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

export const useNotifications = () => {
	const context = useContext(NotificationsContext);
	if (!context) {
		throw new Error('useNotifications debe usarse dentro de NotificationsProvider');
	}
	return context;
};
