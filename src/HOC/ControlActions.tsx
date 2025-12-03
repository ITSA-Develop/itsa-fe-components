import { getProgramActionsbyPath } from '@/helpers/functions';
import { IActions } from '@/interfaces';
import { useAppLayoutStore } from '@/store';
import { createContext, ReactNode, useEffect, useState } from 'react';

export interface ControlActionsContextType {
	setCurrentPath: (path: string) => void;
	actions?: IActions;
	programId?: number;
	fnApiValidatePermissionAction: (actionTypeId: number, programId: number, agencyId: number) => Promise<boolean>;
}

export interface ControlActionsProviderProps {
	children: ReactNode;
	fnApiValidatePermissionAction: (actionTypeId: number, programId: number, agencyId: number) => Promise<boolean>;
}

export const ControlActionsContext = createContext<ControlActionsContextType | undefined>(undefined);

export const ControlActionsProvider = ({ children, fnApiValidatePermissionAction }: ControlActionsProviderProps) => {
	// Inicializar currentPath desde la URL del navegador si está disponible
	const getInitialPath = (): string => {
		if (typeof window !== 'undefined') {
			return window.location.pathname;
		}
		return '';
	};
	
	const [currentPath, setCurrentPath] = useState<string>(getInitialPath());
	const currentModule = useAppLayoutStore(state => state.currentModule);
	const [actions, setActions] = useState<IActions>();
	const [programId, setProgramId] = useState<number>();

	// Escuchar cambios en la URL del navegador
	useEffect(() => {
		if (typeof window === 'undefined') return;
		
		const handleLocationChange = () => {
			setCurrentPath(window.location.pathname);
		};

		// Escuchar eventos de popstate (navegación hacia atrás/adelante)
		window.addEventListener('popstate', handleLocationChange);
		
		// También escuchar cambios de hash si es necesario
		window.addEventListener('hashchange', handleLocationChange);

		return () => {
			window.removeEventListener('popstate', handleLocationChange);
			window.removeEventListener('hashchange', handleLocationChange);
		};
	}, []);

	useEffect(() => {
		if (currentModule) {
			const programActions = getProgramActionsbyPath(currentPath, currentModule);
			if (programActions) {
				setActions(programActions.actions);
				setProgramId(programActions.program.id);
			}
		}
	}, [currentPath, currentModule]);

	return (
		<ControlActionsContext.Provider value={{ setCurrentPath, actions, programId, fnApiValidatePermissionAction }}>
			{children}
		</ControlActionsContext.Provider>
	);
};
