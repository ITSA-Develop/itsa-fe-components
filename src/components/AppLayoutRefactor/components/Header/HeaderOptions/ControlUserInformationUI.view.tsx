import { UserIcon } from '@/assets/icons';
import { USER_INFO_WRAPPER_CLASSNAME } from '@/constants';
import { Button, Dropdown, MenuProps } from 'antd';
import { useAppLayoutStore } from '../../store';
import { LogoutOutlined } from '@ant-design/icons';

export interface ControlUserInformationUIProps {
	onCloseSession: () => void;
	userActions?: MenuProps;
}

export const ControlUserInformationUI = ({ userActions = { items: [] }, onCloseSession }: ControlUserInformationUIProps) => {
	const { userInformation, module } = useAppLayoutStore();
	const roles = userInformation?.roles ?? [];
	const userName = userInformation?.name ?? 'Usuario';
	const roleName = module
		? roles.find(role => role.moduleId === module.id)?.name ?? 'Sin rol específico'
		: roles[0]?.name ?? 'Sin rol específico';

	const newUserActions: MenuProps = {
		...userActions,
		items: [
			...(userActions.items ?? []),
			{
				key: 'close-session',
				label: 'Cerrar sesión',
				danger: true,
				onClick: onCloseSession,
				icon: <LogoutOutlined />,
			},
		],
	}

	return (
		<div className="flex min-w-0 shrink items-center md:gap-1">
			<div className={USER_INFO_WRAPPER_CLASSNAME}>
				<strong className="block truncate whitespace-nowrap text-xs leading-tight text-white-100" title={userName}>
					{userName}
				</strong>
				<div className="min-w-0 max-w-full overflow-hidden rounded border border-primary-700 bg-primary-500 px-1 text-primary-900 flex items-center justify-center">
					<span className="block truncate text-end text-[11px] font-bold leading-4 text-primary-900" title={roleName}>
						{roleName}
					</span>
				</div>
			</div>
			<Dropdown menu={newUserActions} placement="bottomRight">
				<Button type="text" size="small" icon={<UserIcon className="h-5 w-5 text-white-100" />} />
			</Dropdown>
		</div>
	);
};