import { Layout } from 'antd';
import { AppLayoutFooterProvider } from '../../HOC/AppLayoutFooterContext';
import { SidebarLayout } from './components/SidebarLayout';
import { HeaderLayout } from './components/HeaderLayout';
import { ReactNode } from 'react';
import { useSidebarStore, useViewportSize } from '@/hooks';
import { useEffect } from 'react';
import { ELocalStorageKeys } from '@/enums';

export interface AppLayoutProps {
	children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
	useViewportSize();
	const { setCollapsed } = useSidebarStore();
	useEffect(() => {
		// Initialize collapsed from localStorage
		const storedCollapsed = localStorage.getItem(ELocalStorageKeys.collapsedSidebar);
		if (storedCollapsed && storedCollapsed === 'true') {
			setCollapsed(true);
		} else {
			setCollapsed(false);
		}
	}, []);
	return (
		<AppLayoutFooterProvider>
			<div className="flex h-[100dvh] w-full overflow-hidden">
				<Layout className="p-2 gap-2">
					<HeaderLayout />
					<SidebarLayout>{children}</SidebarLayout>
				</Layout>
			</div>
		</AppLayoutFooterProvider>
	);
};
