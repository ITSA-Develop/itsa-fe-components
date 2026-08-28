import { IItemNotification } from "@/interfaces";


export interface NotificationsListProps {
  notifications: IItemNotification[];
}

export const NotificationsList = () => {
  return (
    <div>
      <h1>Notifications List</h1>
    </div>
  );
};