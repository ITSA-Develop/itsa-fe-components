import { TMenuMode } from '@/types';
import { Layout, LayoutProps, MenuProps } from 'antd';
import { ReactNode, useEffect, useMemo } from 'react';
import { HeaderLayout } from './components/HeaderLayout';
import { SidebarLayout } from './components/SidebarLayout';
import { useAppLayoutStore } from '@/store/appLayout.store';
import { dataFromLocalStorage } from '@/helpers/objects';
import { ELocalStorageKeys } from '@/enums';
import { TExtendedMenuItem } from '@/types';
import { useViewportSize } from '@/hooks';

export interface AppLayoutProps extends LayoutProps {
	loading: boolean;
	currentPath: string;
	widthSidebar: number;
	children: ReactNode;
	onClickOptionMenu: (info: { key: string; item: TExtendedMenuItem }) => void;
	userActions?: MenuProps;
	notifications?: MenuProps;
	logo?: string;
	modeSidebar?: TMenuMode;
}

export const AppLayout = ({
	loading,
	currentPath,
	widthSidebar,
	children,
	onClickOptionMenu,
	notifications = { items: [] },
	userActions = { items: [] },
	logo = '',
	modeSidebar = 'inline',
}: AppLayoutProps) => {
	useViewportSize();
	const { agencies, setCurrentModule, setModulesAgency, setCurrentAgency } = useAppLayoutStore();

	const storedData = useMemo(
		() => ({
			moduleId: dataFromLocalStorage(ELocalStorageKeys.moduleId),
			currentEnvironment: dataFromLocalStorage(ELocalStorageKeys.currentEnvironment),
		}),
		[],
	);

	useEffect(() => {
		const moduleId = storedData.moduleId;
		if (moduleId) {
			for (const agency of agencies) {
				if (!agency.modules) continue;
				for (const module of agency.modules) {
					if (module.id.toString() === moduleId.toString()) {
						setCurrentModule(module);
						setModulesAgency(agency.modules);
						setCurrentAgency(agency);
						localStorage.setItem(ELocalStorageKeys.agencyId, String(agency.id));
						return;
					}
				}
			}
		}
		const environment = storedData.currentEnvironment;
		for (const agency of agencies) {
			if (!agency.modules) continue;
			for (const module of agency.modules) {
				if (module.entorno === environment) {
					setCurrentModule(module);
					setModulesAgency(agency.modules);
					setCurrentAgency(agency);
					localStorage.setItem(ELocalStorageKeys.agencyId, String(agency.id));
					localStorage.setItem(ELocalStorageKeys.moduleId, String(module.id));
					return;
				}
			}
		}
	}, [agencies]);

	// useEffect(() => {
	// 	let stepCounter = 0;
	// 	const logStep = (message: string, data?: unknown) => {
	// 		console.log(`[AppLayout:init] ${++stepCounter}. ${message}`, data ?? '');
	// 	};

	// 	logStep('Efecto iniciado', { agenciesLength: agencies.length });
	// 	if (agencies.length === 0) {
	// 		logStep('Agencias vacías; retorno temprano');
	// 		return;
	// 	}
	// 	const { agencyId, moduleId, currentEnvironment } = storedData;
	// 	logStep('Datos en storage', { agencyId, moduleId, currentEnvironment });

	// 	const updateStateAndStorage = (agency: IAgency, module: IModule) => {
	// 		logStep('Actualizando estado con agencia y módulo', {
	// 			agencyId: agency.id,
	// 			agencyName: (agency as any).name ?? (agency as any).nombre ?? undefined,
	// 			moduleId: module.id,
	// 			moduleName: (module as any).name ?? (module as any).nombre ?? undefined,
	// 		});
	// 		setCurrentAgency(agency);
	// 		setCurrentModule(module);

	// 		const submodules = module.submodules || [];
	// 		logStep('Submódulos calculados', { count: submodules.length });
	// 		setSubmodulesAgency(submodules);
	// 		if (submodules.length > 0) {
	// 			if (submodules[0]) {
	// 				logStep('Asignando submódulo por defecto', {
	// 					id: (submodules[0] as any).id,
	// 					name: (submodules[0] as any).name ?? (submodules[0] as any).nombre ?? undefined,
	// 				});
	// 				setCurrentSubmodule(submodules[0]);
	// 			}
	// 		}
	// 		localStorage.setItem(ELocalStorageKeys.agencyId, String(agency.id));
	// 		localStorage.setItem(ELocalStorageKeys.moduleId, String(module.id));
	// 		logStep('Guardado en localStorage', { agencyId: agency.id, moduleId: module.id });
	// 	};

	// 	if (agencyId && moduleId) {
	// 		logStep('Intentando restaurar por agencyId y moduleId de localStorage', { agencyId, moduleId });
	// 		const targetAgency = agencies.find(a => a.id.toString() === agencyId);
	// 		const targetModule = targetAgency?.modules.find(m => m.id.toString() === moduleId);

	// 		if (targetAgency && targetModule) {
	// 			logStep('Restauración exacta encontrada');
	// 			updateStateAndStorage(targetAgency, targetModule);
	// 			return;
	// 		}
	// 		logStep('No se encontró combinación exacta agencyId/moduleId. Se continua.');
	// 	}

	// 	if (currentEnvironment) {
	// 		logStep('Buscando por entorno', { currentEnvironment });
	// 		for (const agency of agencies) {
	// 			logStep('Revisando agencia', { agencyId: agency.id });
	// 			const targetModule = agency.modules.find(
	// 				m => m.id.toString() === String(moduleId || '') || m.entorno.toLowerCase() === currentEnvironment.toLowerCase(),
	// 			);
	// 			if (targetModule) {
	// 				logStep('Módulo encontrado por id o entorno', {
	// 					agencyId: agency.id,
	// 					moduleId: targetModule.id,
	// 					entorno: (targetModule as any).entorno,
	// 				});
	// 				updateStateAndStorage(agency, targetModule);
	// 				return;
	// 			}
	// 		}
	// 		logStep('No se encontró módulo por entorno.');
	// 	}

	// 	console.log('[AppLayout:init] No se encontró una agencia/módulo por defecto.');
	// }, [agencies, storedData, setCurrentAgency, setCurrentModule, setSubmodulesAgency, setCurrentSubmodule]);

	return (
		<div className="flex h-[100dvh] w-full overflow-hidden">
			<Layout className="p-2 gap-2">
				<HeaderLayout loadingHeader={loading} notifications={notifications} userActions={userActions} logo={logo} />
				<SidebarLayout
					width={widthSidebar}
					currentPath={currentPath}
					modeSidebar={modeSidebar}
					onClickOptionMenu={onClickOptionMenu}
					loadingMenu={loading}
				>
					{children}
				</SidebarLayout>
			</Layout>
		</div>
	);
};
