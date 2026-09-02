// import { EUserRoleCodes } from '@/enums';
import { useLegacyAppLayoutStore } from '@/store';

export const codeUserInputValidation = (requiredCodes: string[]) => {
	const userRole = useLegacyAppLayoutStore.getState().userRole;
	const codeUserRole = userRole?.code ?? '';
	for (const requiredCode of requiredCodes) {
		if (codeUserRole === requiredCode) {
			return true;
		}
	}
	return false;
};