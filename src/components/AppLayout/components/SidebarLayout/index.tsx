import { Button, Input, Layout } from 'antd';
import { ReactNode } from 'react';
import { DoubleLeftOutlined, SearchOutlined } from '@ant-design/icons';
import { useAppLayoutFooter } from '@/HOC/AppLayoutFooterContext';
import { Content } from 'antd/es/layout/layout';
import { useSidebarStore } from '@/hooks';

export interface SidebarLayoutProps {
	children: ReactNode;
	width?: number;
}

export const SidebarLayout = ({ children, width = 235 }: SidebarLayoutProps) => {
	const { collapsed, setCollapsed, searchTerm, setSearchTerm } = useSidebarStore();

	const { footerComponent } = useAppLayoutFooter();

	return (
		<Layout hasSider className="gap-2 h-full">
			{!collapsed && (
				<div className="flex flex-col pt-3 rounded-lg bg-gray-200" style={{ width: width }}>
					<div className="flex items-center justify-center pr-3 pl-3">
						<Input
							placeholder="Buscar en el menú"
							className="rounded-lg text-sm"
							suffix={<SearchOutlined className="text-gray-300" />}
							defaultValue={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
						/>
					</div>
					<div className="flex-1 overflow-y-auto scrollbar-none h-full max-w-full"></div>
					<div className="w-full flex justify-end pr-3 pl-3">
						<Button
							type="link"
							onClick={() => setCollapsed(!collapsed)}
							icon={<DoubleLeftOutlined className="text-gray-400" />}
						/>
					</div>
				</div>
			)}
			<Layout className="rounded-lg h-full">
				<Content className="bg-white-100 rounded-lg pt-3 h-full flex flex-col min-h-0 relative">
					<div className="flex-1 overflow-auto min-h-0 p-2">{children}</div>
					{footerComponent && (
						<div className="h-auto w-full z-50 rounded-bl-lg rounded-br-lg p-1">{footerComponent}</div>
					)}
				</Content>
			</Layout>
		</Layout>
	);
};
