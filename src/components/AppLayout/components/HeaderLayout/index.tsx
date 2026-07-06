import { Button, Dropdown, MenuProps } from 'antd';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import { useEncrypt, useSidebarStore } from '@/hooks';
import { useAppLayoutStore } from '@/store';
import { imageItsaLogo } from '@/assets/images';
import { DropdownIcon } from '@/components/DropdownIcon';
import { ActiveNotificationIcon, NotificationIcon, PinIcon, UserIcon } from '@/assets/icons';
import { SettingOutlined } from '@ant-design/icons';
import { IAgency, ISelectOptionDropdownButton } from '@/interfaces';
import { DropdownCustomLabel } from '@/components/DropdownCustomLabel';
import { useCallback, useEffect } from 'react';
import { ELocalStorageKeys } from '@/enums';
import { NavigateFunction } from 'react-router-dom';
import { useEnvironment } from '@/hooks/useEnvironment';

export interface HeaderLayoutProps {
	loadingAppLayout: boolean;
	navigateApp: NavigateFunction;
	userActions?: MenuProps;
	notifications?: MenuProps;
}

export const HeaderLayout = ({
	loadingAppLayout,
	userActions = { items: [] },
	notifications = { items: [] },
	navigateApp,
}: HeaderLayoutProps) => {
	const { encryptKey, getDecryptDataFromStorage } = useEncrypt();
	const { collapsed, setCollapsed } = useSidebarStore();
	const { modulesAgency } = useAppLayoutStore();
	const { agencies } = useAppLayoutStore();
	const { userRole } = useAppLayoutStore();
	const { userName } = useAppLayoutStore();
	const { currentModule } = useAppLayoutStore();
	const { currentAgency } = useAppLayoutStore();
	const environment = useEnvironment();

	const headerBackgroundClass = {
		LOCAL: 'LOCAL',
		DESARROLLO: 'DESARROLLO',
		QA: 'QA',
		PRODUCCION: 'PRODUCCIÓN',
	}[environment];

	const { setCurrentModule, setModulesAgency, setCurrentAgency, setSubmodulesAgency, setCurrentSubmodule } =
		useAppLayoutStore();

	const redirectToHome = () => {
		navigateApp('/home');
	};

	const selectModule = (module?: (typeof modulesAgency)[number], shouldNavigate = true) => {
		if (!module) return false;
		setCurrentModule(module, encryptKey);
		setSubmodulesAgency(module.submodules);
		const currentSubmodule = module.submodules[0];
		if (currentSubmodule) {
			setCurrentSubmodule(currentSubmodule, encryptKey);
		}
		if (shouldNavigate) {
			redirectToHome();
		}
		return true;
	};

	const selectAgency = (agency?: IAgency, navigateWhenNoModule = true) => {
		if (!agency) return false;
		setCurrentAgency(agency, encryptKey);
		setModulesAgency(agency.modules);
		const hasModule = selectModule(agency.modules[0], false);
		if (hasModule || navigateWhenNoModule) {
			redirectToHome();
		}
		return hasModule;
	};

	const isActiveUserActions = Boolean(userActions?.items?.length);
	const isActiveNotifications = Boolean(notifications?.items?.length);

	const modulesData: ISelectOptionDropdownButton = {
		items: modulesAgency.map(m => ({
			key: m.id.toString(),
			label: m.name,
			onClick: (id: string) => selectModule(modulesAgency.find(m => m.id.toString() === id)),
		})),
	};

	const agenciesData: ISelectOptionDropdownButton = {
		items: agencies.map(a => ({
			key: a.id.toString(),
			label: a.name,
			onClick: (id: string) => selectAgency(agencies.find(a => a.id.toString() === id)),
		})),
	};

	const setModulesAgencyCallback = useCallback(
		(agencies: IAgency[]) => {
			const moduleIdStorage = getDecryptDataFromStorage(ELocalStorageKeys.module);

			let moduleFound = false;

			if (moduleIdStorage !== undefined) {
				const moduleId = Number(moduleIdStorage);
				// Intenta encontrar el módulo guardado
				for (const agency of agencies) {
					for (const module of agency.modules) {
						if (module.id === moduleId) {
							setCurrentModule(module, encryptKey);
							setModulesAgency(agency.modules);
							setCurrentAgency(agency, encryptKey);
							moduleFound = true;
							return;
						}
					}
				}
			}

			// Si no encuentra el módulo guardado, carga por defecto
			if (!moduleFound) {
				const agencyIdStorage = getDecryptDataFromStorage(ELocalStorageKeys.agency);
				const normalizedAgencyIdStorage = agencyIdStorage ?? '0';
				const agencyId = Number(normalizedAgencyIdStorage);
				let selectedAgency: IAgency | undefined;

				if (agencyId !== 0) {
					selectedAgency = agencies.find(a => a.id === agencyId);
				}

				selectedAgency = selectedAgency || agencies[0];
				if (selectedAgency) {
					setCurrentAgency(selectedAgency, encryptKey);
					setModulesAgency(selectedAgency.modules);
					const currentModule = selectedAgency.modules?.[0];
					if (currentModule) {
						setCurrentModule(currentModule, encryptKey);
					}
				}
			}
		},
		[encryptKey, getDecryptDataFromStorage, setCurrentAgency, setCurrentModule, setModulesAgency],
	);

	// useEffect para detectar una combinacion de teclas para abrir el menu lateral o cerrar el menu lateral
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.ctrlKey && event.key === 'z') {
				setCollapsed(!collapsed);
			}
		};
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [collapsed, setCollapsed]);

	// Descomenta este useEffect
	useEffect(() => {
		setModulesAgencyCallback(agencies);
	}, [agencies, setModulesAgencyCallback]);

	useEffect(() => {
		if (currentAgency) {
			setModulesAgencyCallback([currentAgency]);
		}
	}, [currentAgency, setModulesAgencyCallback]);

	const handleSetCurrentModule = (moduleId: string) => {
		selectModule(modulesAgency.find(m => m.id.toString() === moduleId));
	};

	const handleSetCurrentAgency = (agencyId: string) => {
		selectAgency(
			agencies.find(a => a.id.toString() === agencyId),
			false,
		);
	};

	const renderBackgroundText = () => {
		const textRender = Array.from({ length: 28 }).map((_, index) => <span key={index}>{headerBackgroundClass}</span>);

		switch (headerBackgroundClass) {
			case 'LOCAL':
				return textRender;
			case 'DESARROLLO':
				return textRender;
			case 'QA':
				return (
					<div>
						{textRender}
						{textRender}
					</div>
				);
			case 'PRODUCCION':
				return textRender;
			default:
				return textRender;
		}
	};

	return (
		<header className="h-16">
			<div className={`relative overflow-hidden rounded-tr-none rounded-tl-none rounded-br-xl rounded-bl-xl md:rounded-xl h-16 bg-primary-700`}>
				<div
					aria-hidden="true"
					className="absolute inset-0 flex flex-wrap items-center gap-x-4 gap-y-1 px-12 text-white-100/20 text-sm font-bold uppercase tracking-[0.35em] select-none pointer-events-none"
				>
					{renderBackgroundText()}
				</div>
				<div className="relative z-10 flex flex-row text-white-100 items-center justify-between w-full h-full pr-4 pl-6">
					<div className="w-full flex flex-row items-center justify-start gap-4">
						{collapsed && (
							<Button
								type="text"
								icon={<MenuUnfoldOutlined className="text-white-100" />}
								onClick={() => setCollapsed(!collapsed)}
							/>
						)}
						{environment !== 'PRODUCCION' && (
							<div
								className="flex justify-center items-center rounded-full p-2"
								style={{ border: '1px solid #f0f0f0' }}
							>
								<strong className="text-white-100">{environment}</strong>
							</div>
						)}
						{environment === 'PRODUCCION' && (
							<div className="hidden md:block">
								<img src={imageItsaLogo} alt="logo" className="h-full max-h-12 max-w-[150px] object-cover" />
							</div>
						)}
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
			</div>
		</header>
	);
};
