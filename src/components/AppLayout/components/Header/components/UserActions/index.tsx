import { MenuProps } from 'antd';
import { NavigateFunction } from 'react-router-dom';
import { UserInformationUI } from './UserInformationUI.view';
import { NotificationsUI } from './UserNotificationsUI.view';
import { UserSubAgencyUI } from './UserSubAgencyUI.view';
import { UserModuleUI } from './UserModuleUI.view';

export interface UserActionsProps {
	userActions?: MenuProps;
	notifications?: MenuProps;
	loadingAppLayout?: boolean;
	navigateApp?: NavigateFunction;
}

export const UserActions = ({ userActions, notifications, loadingAppLayout, navigateApp }: UserActionsProps) => {
	return (
		<div className="flex w-full min-w-0 items-center justify-end gap-3">
			<div className="flex items-center gap-2">
				<UserModuleUI loadingAppLayout={loadingAppLayout} navigateApp={navigateApp} />
				<UserSubAgencyUI />
			</div>
			<div className="flex shrink-0 items-center gap-1">
				<UserInformationUI userActions={userActions} />
				<NotificationsUI notifications={notifications} />
			</div>
		</div>
	);
};
