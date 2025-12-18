import { TABS_ITEM_CONTENT_WIDTH } from '@/constants';
// import { Typography } from 'antd';
import { ReactNode } from 'react';

// const { Text } = Typography;

export interface ITabsItemContent {
	children: ReactNode;
	maxWidth?: string;
}

export const TabsItemContent = ({ children, maxWidth = TABS_ITEM_CONTENT_WIDTH }: ITabsItemContent) => {
	return (
		<div className="flex-1 min-w-0 w-full h-full flex justify-center items-center">
			<div className="w-full" style={{ maxWidth: maxWidth }}>
				<div className="flex flex-col justify-center items-center w-full h-full rounded-lg bg-gray-250 min-w-0">{children}</div>
			</div>
		</div>
	);
};
