import { useAppLayoutStore } from '@/store/appLayout.store';

export const useUserCurrentRole = () => {
	const userRole = useAppLayoutStore(state => state.userRole);
	return userRole;
};
