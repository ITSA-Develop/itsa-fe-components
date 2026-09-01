import { useLegacyAppLayoutStore } from '@/store';

export const useUserCurrentRole = () => {
	const userRole = useLegacyAppLayoutStore(state => state.userRole);
	return userRole;
};
