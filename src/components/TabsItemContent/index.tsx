import { TABS_ITEM_CONTENT_WIDTH } from '@/constants';
import { Typography } from 'antd';
import { ReactNode } from 'react';

const { Text } = Typography;

export interface ITabsItemContent {
	children: ReactNode;
	width?: string;
	title?: string;
}

export const TabsItemContent = ({ children, width = TABS_ITEM_CONTENT_WIDTH, title }: ITabsItemContent) => {
	return (
		<div className="flex flex-col justify-center items-center h-full pb-4">
			{title && (
				<div className="flex justify-start items-center w-full pb-2" style={{ width: width }}>
					<Text className="text-sm font-bold">{title}</Text>
				</div>
			)}
			<div className="flex flex-col justify-center items-center h-full rounded-lg bg-gray-250" style={{ width: width }}>
				{children}
			</div>
		</div>
	);
};
