import { IUserInformation, IUserRole } from '@/interfaces';
import { useLegacyAppLayoutStore } from '@/store';
import { useMemo } from 'react';

export interface IUseGetUserInformationProps {
	codeUserRole: string;
	userRole?: IUserRole;
	userInformation?: IUserInformation;
}

export const useGetUserInformation = (): IUseGetUserInformationProps => {
	const userInformation = useLegacyAppLayoutStore(state => state.userInformation);
	const currentModule = useLegacyAppLayoutStore(state => state.currentModule);

	const userRole = useMemo((): IUserRole | undefined => {
		return userInformation?.roles.find(role => role.moduleId === currentModule?.id) ?? undefined;
	}, [userInformation, currentModule]);

	const codeUserRole = useMemo(() => {
		const code = userRole?.code;
		if(code){
			return code;
		}
		return '';
    }, [userRole]);

	return {
        codeUserRole,
		userRole,
		userInformation,
	};
};
