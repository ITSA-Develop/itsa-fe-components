import { MenuProps } from 'antd';
import { NotificationsUI } from './Notifications/UserNotificationsUI.controller';
import { IItemNotification } from '@/interfaces';
import { useEnvironment } from '@/hooks/useEnvironment';
import { ControlSidebarUI } from './ControlSidebar.view';
import { ControlMultiCompanySelectorUI } from './ControlMultiCompanySelectorUI.view';
import { ControlBusinessLineSelectorUI } from './ControlBusinessLineSelectorUI.view';
import { ControlSubAgencySelectorUI } from './ControlSubAgencySelectorUI.view';
import { ControlUserInformationUI } from './ControlUserInformationUI.view';
import { DefaultOptionType } from 'antd/es/select';

export interface IHeaderOptionsProps {
	loadingAppLayout: boolean;
	optionsCompany: DefaultOptionType[];
	// appNavigate: () => void;
	userActions?: MenuProps;
	notifications?: IItemNotification[];
}

export const HeaderOptions = ({ userActions, notifications, loadingAppLayout, optionsCompany }: IHeaderOptionsProps) => {
	const environment = useEnvironment();
	return (
		<div className="flex h-full min-h-0 min-w-0 flex-row items-center justify-between">
			<ControlSidebarUI environment={environment} />
			<ControlMultiCompanySelectorUI optionsCompany={optionsCompany} loadingAppLayout={loadingAppLayout} />
			<div className="flex min-w-0 flex-row gap-1">
				<div className="flex min-w-0 flex-row gap-1">
					<ControlBusinessLineSelectorUI loadingAppLayout={loadingAppLayout} />
					<ControlSubAgencySelectorUI />
				</div>
				<div className="flex shrink-0 flex-row items-center gap-0.5">
					<ControlUserInformationUI userActions={userActions} />
					<NotificationsUI notifications={notifications} />
				</div>
			</div>
		</div>
	);
};
