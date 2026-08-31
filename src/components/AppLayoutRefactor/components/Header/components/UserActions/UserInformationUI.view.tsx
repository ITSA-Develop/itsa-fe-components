import { UserIcon } from '@/assets/icons';
import { useAppLayoutStore } from '@/store';
import { Button, Dropdown, MenuProps } from 'antd';

export interface UserInformationUIProps {
	userActions?: MenuProps;
}

export const UserInformationUI = ({ userActions = { items: [] } }: UserInformationUIProps) => {
	const isActiveUserActions = Boolean(userActions?.items?.length);
	const { userName, userRole } = useAppLayoutStore();
	return (
		<div className="flex shrink-0 items-center md:gap-1">
			<div className="hidden flex-col md:flex">
				<strong className="text-md whitespace-nowrap text-white-100">{userName ?? 'John Doe'}</strong>
				<div className='bg-primary-500 text-primary-900 rounded-md p-0.5 pl-1 pr-1 border border-primary-700'>
					<span className="text-primary-900 font-bold text-end text-xs whitespace-nowrap">
						{userRole?.name ?? 'Sin rol específico'}
					</span>
				</div>
			</div>
			<Dropdown menu={userActions} placement="bottomRight" disabled={!isActiveUserActions}>
				<Button type="text" icon={<UserIcon className="text-white-100 w-6 h-6" />} />
			</Dropdown>
		</div>
	);
};
