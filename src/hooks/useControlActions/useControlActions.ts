import { ControlActionsContext, ControlActionsContextType } from "@/HOC/ControlActions";
import { useContext } from "react";

export interface UseControlActionsProps {
	fnApiValidatePermissionAction: () => Promise<boolean>;
}

export const useControlActions = (): ControlActionsContextType => {
	const context = useContext(ControlActionsContext);
	if (!context) {
		throw new Error('useControlActions debe usarse dentro de ControlActionsProvider');
	}
	return context;
};


