import { ActiveNotificationIcon, NotificationIcon } from '@/assets/icons';
import { Button, Dropdown, MenuProps } from 'antd';

export interface NotificationsUIProps {
	notifications?: MenuProps;
}

export const NotificationsUI = ({ notifications = { items: [] } }: NotificationsUIProps) => {
	const isActiveNotifications = Boolean(notifications?.items?.length);

	return (
		<Dropdown menu={notifications} placement="bottomRight" disabled={!isActiveNotifications}>
			<Button
				type="text"
				icon={
					isActiveNotifications ? (
						<ActiveNotificationIcon className="text-white-100 w-6 h-6" />
					) : (
						<NotificationIcon className="text-white-100 w-6 h-6" />
					)
				}
			/>
		</Dropdown>
	);
};
