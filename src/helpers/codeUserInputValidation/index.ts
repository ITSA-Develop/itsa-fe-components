import { EUserRoleCodes } from '@/enums';

export const codeUserInputValidation = (codeUserRole: string, requiredCode: EUserRoleCodes) => {
	let isValid: EUserRoleCodes | undefined;
	switch (requiredCode) {
		case EUserRoleCodes.adminRepuestos:
			if (codeUserRole === EUserRoleCodes.adminRepuestos) {
				isValid = EUserRoleCodes.adminRepuestos;
			}
			break;
		case EUserRoleCodes.adminTalleres:
			if (codeUserRole === EUserRoleCodes.adminTalleres) {
				isValid = EUserRoleCodes.adminTalleres;
			}
			break;
		default:
			isValid = undefined;
	}
	return isValid;
};
