import { EUserRoleCodes } from '@/enums';
import { IUserInformation, IUserRole } from '@/interfaces';
import { useAppLayoutStore } from '@/store';
import { useMemo } from 'react';

export interface IUseGetUserInformationProps {
	codeUserRole: EUserRoleCodes;
	userRole?: IUserRole;
	userInformation?: IUserInformation;
}

export const useGetUserInformation = (): IUseGetUserInformationProps => {
	const userInformation = useAppLayoutStore(state => state.userInformation);
	const currentModule = useAppLayoutStore(state => state.currentModule);

	const userRole = useMemo((): IUserRole | undefined => {
		return userInformation?.roles.find(role => role.moduleId === currentModule?.id) ?? undefined;
	}, [userInformation, currentModule]);

	const codeUserRole = useMemo((): EUserRoleCodes => {
		if(!userRole?.code){
			return EUserRoleCodes.null;
		}
		return EUserRoleCodes[userRole.code as keyof typeof EUserRoleCodes];
    }, [userRole]);

	return {
        codeUserRole,
		userRole,
		userInformation,
	};
};
