import { TNotificationProps } from '../types';
import { ReactNode } from 'react';

export interface NotificationsContextType {
    openNotificationWithIcon: (notificationProps: TNotificationProps) => void;
}
export declare const NotificationsContext: import('react').Context<NotificationsContextType | undefined>;
export declare const NotificationsProvider: ({ children }: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=NotificationsProviders.d.ts.map