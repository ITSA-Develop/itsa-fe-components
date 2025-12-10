import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

export interface AppLayoutFooterContextValue {
	footerComponent: ReactNode | null;
	setFooterComponent: (component: ReactNode | null) => void;
	clearFooter: () => void;
}

const AppLayoutFooterContext = createContext<AppLayoutFooterContextValue | undefined>(undefined);

export const AppLayoutFooterProvider = ({ children }: { children: ReactNode }) => {
	const [footerComponent, setFooterComponent] = useState<ReactNode | null>(null);

	const clearFooter = useCallback(() => setFooterComponent(null), []);

	const value = useMemo(
		() => ({
			footerComponent,
			setFooterComponent,
			clearFooter,
		}),
		[footerComponent, clearFooter],
	);

	return <AppLayoutFooterContext.Provider value={value}>{children}</AppLayoutFooterContext.Provider>;
};

export const useAppLayoutFooter = () => {
	const context = useContext(AppLayoutFooterContext);
	if (!context) {
		throw new Error('useAppLayoutFooter must be used within AppLayoutFooterProvider');
	}
	return context;
};
