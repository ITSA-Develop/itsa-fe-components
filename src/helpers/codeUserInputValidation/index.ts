import { EUserRoleCodes } from '@/enums';
import { useAppLayoutStore } from '@/store';

export const codeUserInputValidation = (requiredCodes: EUserRoleCodes[]) => {
	const userRole = useAppLayoutStore.getState().userRole;
	const codeUserRole = userRole?.code ?? '';
	for (const requiredCode of requiredCodes) {
		if (codeUserRole === requiredCode) {
			return true;
		}
	}
	return false;
};