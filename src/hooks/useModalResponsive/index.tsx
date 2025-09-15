import { ResponsiveModalContext, ResponsiveModalContextType } from '@/HOC/ResponsiveModalProvider';
import { useContext } from 'react';

export const useModalResponsive = (): ResponsiveModalContextType => {
	const context = useContext(ResponsiveModalContext);
	if (!context) {
		throw new Error('useModal debe usarse dentro de ResponsiveModalProvider');
	}
	return context;
};
