import { NotificationsContext, NotificationsContextType } from "@/HOC/NotificationsProviders";
import { useContext } from "react";

export const useNotification = (): NotificationsContextType => {
	const context = useContext(NotificationsContext);
	if (!context) {
		throw new Error('useNotifications debe usarse dentro de NotificationsProvider');
	}
	return context;
};
