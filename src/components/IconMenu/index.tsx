import * as Icons from '@/assets/icons';
import { AppstoreOutlined } from '@ant-design/icons';
import React from 'react';

interface IconMenuProps {
	icon: string;
	className?: string;
	style?: React.CSSProperties;
}

export const IconMenu = ({ icon, className = 'w-4 h-4', style }: IconMenuProps) => {
	const iconsMap = Icons as unknown as Record<string, React.ComponentType<any>>;
	const IconComponent = iconsMap[icon];

	if (IconComponent) {
		return <IconComponent className={className} style={style} />;
	}

	return <AppstoreOutlined className={className} style={style} />;
};
