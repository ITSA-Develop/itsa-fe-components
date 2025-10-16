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
import { IAgency, IModule } from '@/interfaces'; // Asumiendo que IModule existe

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
	const { agencies, setCurrentAgency, setCurrentModule, setSubmodulesAgency, setCurrentSubmodule } =
		useAppLayoutStore();

	// 1. Lectura de localStorage (sin cambios, ya era eficiente)
	const storedData = useMemo(
		() => ({
			agencyId: dataFromLocalStorage(ELocalStorageKeys.agencyId),
			moduleId: dataFromLocalStorage(ELocalStorageKeys.moduleId),
			currentEnvironment: dataFromLocalStorage(ELocalStorageKeys.currentEnvironment),
		}),
		[],
	);

	useEffect(() => {
		// 2. Solo ejecutar si ya se cargaron las agencias
		if (agencies.length === 0) {
			return;
		}

		const { agencyId, moduleId, currentEnvironment } = storedData;

		// 3. Función auxiliar para evitar la duplicación de código
		const updateStateAndStorage = (agency: IAgency, module: IModule) => {
			setCurrentAgency(agency);
			setCurrentModule(module);

			const submodules = module.submodules || [];
			setSubmodulesAgency(submodules);
			if (submodules.length > 0) {
				if (submodules[0]) {
					setCurrentSubmodule(submodules[0]);
				}
			}
			// Asegurarse de que el localStorage esté sincronizado
			localStorage.setItem(ELocalStorageKeys.agencyId, String(agency.id));
			localStorage.setItem(ELocalStorageKeys.moduleId, String(module.id));
		};

		// 4. Lógica de selección simplificada (Prioridad 1: Usar IDs de localStorage)
		if (agencyId && moduleId) {
			const targetAgency = agencies.find(a => a.id.toString() === agencyId);
			const targetModule = targetAgency?.modules.find(m => m.id.toString() === moduleId);

			if (targetAgency && targetModule) {
				updateStateAndStorage(targetAgency, targetModule);
				return; // Se encontró la coincidencia, no es necesario continuar
			}
		}

		// 5. Lógica de fallback (Prioridad 2: Usar 'currentEnvironment' si los IDs fallaron)
		if (currentEnvironment) {
			for (const agency of agencies) {
				const targetModule = agency.modules.find(m => m.entorno.toUpperCase() === currentEnvironment.toUpperCase());
				if (targetModule) {
					updateStateAndStorage(agency, targetModule);
					return; // Se encontró la primera coincidencia, no es necesario continuar
				}
			}
		}

		console.log('No se encontró una agencia/módulo por defecto.');
	}, [agencies, storedData, setCurrentAgency, setCurrentModule, setSubmodulesAgency, setCurrentSubmodule]);

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
