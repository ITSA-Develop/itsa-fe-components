import { Button, Dropdown, MenuProps } from 'antd';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import { useSidebarStore } from '@/hooks';
import { useAppLayoutStore } from '@/store';
import { imageItsaLogo } from '@/assets/images';
import { DropdownIcon } from '@/components/DropdownIcon';
import { ActiveNotificationIcon, NotificationIcon, PinIcon, UserIcon } from '@/assets/icons';
import { SettingOutlined } from '@ant-design/icons';
import { IAgency, IModule, ISelectOptionDropdownButton } from '@/interfaces';
import { DropdownCustomLabel } from '@/components/DropdownCustomLabel';
import { useCallback, useEffect } from 'react';
import { ELocalStorageKeys } from '@/enums';
import { getNumberFromStorage } from '@/helpers';

export interface HeaderLayoutProps {
	onChangeModule: (module: IModule) => void;
	onChangeAgency: (agency: IAgency) => void;
	loadingAppLayout: boolean;
	userActions?: MenuProps;
	notifications?: MenuProps;
}

export const HeaderLayout = ({ onChangeModule, onChangeAgency, loadingAppLayout, userActions = { items: [] }, notifications = { items: [] } }: HeaderLayoutProps) => {
	const { collapsed, setCollapsed } = useSidebarStore();
	const { modulesAgency } = useAppLayoutStore();
	const { agencies } = useAppLayoutStore();
	const { userRole } = useAppLayoutStore();
	const { userName } = useAppLayoutStore();
	const { currentModule } = useAppLayoutStore();
	const { currentAgency } = useAppLayoutStore();
	const { setCurrentModule, setModulesAgency, setCurrentAgency } = useAppLayoutStore();

	const isActiveUserActions = Boolean(userActions?.items?.length);
	const isActiveNotifications = Boolean(notifications?.items?.length);

	const modulesData: ISelectOptionDropdownButton = {
		items: modulesAgency.map(m => ({
			key: m.id.toString(),
			label: m.name,
			onClick: (id: string) => {
				const mod = modulesAgency.find(m => m.id.toString() === id);
				if (mod) {
					onChangeModule(mod);
				}
			},
		})),
	};

	const agenciesData: ISelectOptionDropdownButton = {
		items: agencies.map(a => ({
			key: a.id.toString(),
			label: a.name,
			onClick: (id: string) => {
				const agency = agencies.find(a => a.id.toString() === id);
				if (agency) {
					onChangeAgency(agency);
				}
			},
		})),
	};

	  const setModulesAgencyCallback = useCallback(
			(agencies: IAgency[]) => {
				const moduleId = getNumberFromStorage(ELocalStorageKeys.moduleId);
				if (moduleId) {
					for (const agency of agencies) {
						if (!agency.modules) continue;
						for (const module of agency.modules) {
							if (module.id === moduleId) {
								setCurrentModule(module);
								setModulesAgency(agency.modules);
								setCurrentAgency(agency);
								return;
							}
						}
					}
				}
			},
			[setCurrentModule, setModulesAgency],
		);

	useEffect(() => {
		setModulesAgencyCallback(agencies);
	}, [agencies, setModulesAgencyCallback]);

	const handleSetCurrentModule = (moduleId: string) => {
		const module = modulesAgency.find(m => m.id.toString() === moduleId);
		if (module) {
			onChangeModule(module);
		}
	};

	const handleSetCurrentAgency = (agencyId: string) => {
		const agency = agencies.find(a => a.id.toString() === agencyId);
		if (agency) {
			onChangeAgency(agency);
		}
	};

	

	return (
		<header className="h-16">
			<div className="flex flex-row text-white-100 items-center justify-between w-full rounded-xl h-16 pr-4 pl-6 bg-primary-700">
				<div className="w-full flex flex-row items-center justify-start gap-4">
					{collapsed && (
						<Button
							type="text"
							icon={<MenuUnfoldOutlined className="text-white-100" />}
							onClick={() => setCollapsed(!collapsed)}
						/>
					)}
					<div className="hidden md:block">
						<img src={imageItsaLogo} alt="logo" className="h-full max-h-12 max-w-[150px] object-cover" />
					</div>
				</div>
				<div className="block md:hidden">
					<div className="flex flex-row items-center gap-4">
						<DropdownIcon
							options={modulesData}
							loading={loadingAppLayout}
							icon={<SettingOutlined className="text-white-100 w-4 h-4" />}
							onChange={handleSetCurrentModule}
						/>
						<DropdownIcon
							options={agenciesData}
							loading={loadingAppLayout}
							icon={<PinIcon className="text-white-100 w-4 h-4" />}
							onChange={handleSetCurrentAgency}
						/>
					</div>
				</div>
				<div className="hidden md:block">
					<div className="flex flex-row items-center gap-4">
						<DropdownCustomLabel
							defaultValue={currentModule?.id?.toString()}
							options={modulesData}
							loading={loadingAppLayout}
							icon={<SettingOutlined className="text-white-100 w-4 h-4" />}
							emptyLabel="Sin módulos asignados"
							onChange={handleSetCurrentModule}
						/>
						<DropdownCustomLabel
							defaultValue={currentAgency?.id?.toString()}
							options={agenciesData}
							loading={loadingAppLayout}
							icon={<PinIcon className="text-white-100 w-4 h-4" />}
							emptyLabel="Sin agencias asignadas"
							onChange={handleSetCurrentAgency}
						/>
						<div className="flex flex-col">
							<span className="text-4 whitespace-nowrap">{userName ?? ''}</span>
							<span className="text-primary-900 font-bold text-end text-xs whitespace-nowrap">
								{userRole?.name ?? ''}
							</span>
						</div>
					</div>
				</div>
				<div className="flex flex-row pl-4">
					<Dropdown menu={userActions} placement="bottomRight" disabled={!isActiveUserActions}>
						<Button type="text" icon={<UserIcon className="text-white-100 w-6 h-6" />} />
					</Dropdown>
					<Dropdown menu={notifications} placement="bottomRight" disabled={!isActiveNotifications}>
						<Button
							type="text"
							icon={
								isActiveNotifications ? (
									<ActiveNotificationIcon className="fill-white-100 w-6 h-6" />
								) : (
									<NotificationIcon className="text-white-100 w-6 h-6" />
								)
							}
						/>
					</Dropdown>
				</div>
			</div>
		</header>
	);
};
