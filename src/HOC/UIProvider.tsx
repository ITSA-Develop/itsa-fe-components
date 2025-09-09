import { ConfigProvider } from 'antd';

import { ReactNode } from 'react';
import { COLORS } from '../constants/colors';

interface UIProviderProps {
	children: ReactNode;
}

export const UIProvider = ({ children }: UIProviderProps) => {
	return (
		<ConfigProvider
			theme={{
				token: {
					fontFamily: 'var(--font-sans)',
				},
				components: {
					Menu: {
						itemBg: 'transparent',
						itemHoverBg: COLORS.white,
						itemSelectedBg: 'transparent',
						itemActiveBg: COLORS.white,
						itemSelectedColor: COLORS.primary[700],
						subMenuItemSelectedColor: COLORS.primary[700],
						itemMarginInline: 0,
						itemMarginBlock: 0,
						itemBorderRadius: 4,
						activeBarBorderWidth: 1,
						activeBarWidth: 4,
						activeBarHeight: 100,
						motionDurationSlow: '0.2s',
						motionDurationMid: '0.11s',
						iconSize: 14,
						iconMarginInlineEnd: 4,
					},
				},
			}}
		>
			{children}
		</ConfigProvider>
	);
};
