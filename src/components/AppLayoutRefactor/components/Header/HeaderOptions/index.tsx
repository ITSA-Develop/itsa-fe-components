import { MenuProps } from 'antd';
import { NavigateFunction } from 'react-router-dom';
import { UserInformationUI } from './UserInformationUI.view';
import { NotificationsUI } from './Notifications/UserNotificationsUI.controller';
import { UserSubAgencyUI } from './UserSubAgencyUI.view';
import { UserModuleUI } from './UserModuleUI.view';
import { IItemNotification } from '@/interfaces';
import { ButtonSidebarTitleUI } from './ButtonSidebarUI.view';
import { useEnvironment } from '@/hooks/useEnvironment';
import { MultiCompanySelectorUI } from './MultiCompanySelectorUI.view';

export interface IHeaderOptionsProps {
	userActions?: MenuProps;
	notifications?: IItemNotification[];
	loadingAppLayout?: boolean;
	navigateApp?: NavigateFunction;
}

export const HeaderOptions = ({ userActions, notifications, loadingAppLayout, navigateApp }: IHeaderOptionsProps) => {
	const environment = useEnvironment();	
	return (
		<div>
			<div className="shrink-0">
				<ButtonSidebarTitleUI environment={environment} />
			</div>
			<div>
				<MultiCompanySelectorUI optionsCompany={[]} />
			</div>
			<div className="flex min-w-0 items-center justify-end gap-0 md:w-full md:gap-3">
				<div className="flex items-center gap-0 md:gap-2">
					<UserModuleUI loadingAppLayout={loadingAppLayout} navigateApp={navigateApp} />
					<UserSubAgencyUI />
				</div>
				<div className="flex shrink-0 items-center gap-0 md:gap-1">
					<UserInformationUI userActions={userActions} />
					<NotificationsUI notifications={notifications} />
				</div>
			</div>
		</div>
	);
};
