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
	const [currentPath, setCurrentPath] = useState<string>('');
	const currentModule = useAppLayoutStore(state => state.currentModule);
	const [actions, setActions] = useState<IActions>();
	const [programId, setProgramId] = useState<number>();

	useEffect(() => {
		if (currentModule) {
			console.log('currentPath =>', currentPath);
			console.log('currentModule =>', currentModule);
			const programActions = getProgramActionsbyPath(currentPath, currentModule);
			console.log('programActions =>', programActions);
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
