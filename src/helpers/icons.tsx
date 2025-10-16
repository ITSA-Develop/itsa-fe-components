import React from 'react';
import * as Icons from '@/assets/icons';
import { AppstoreOutlined } from '@ant-design/icons';

export type IconName = keyof typeof Icons;

interface GetIconOptions {
	className?: string;
	style?: React.CSSProperties;
}

export const getIconByName = (name: string | null | undefined, options: GetIconOptions = {}) => {
	const { className = 'w-4 h-4', style } = options;
	const iconsMap = Icons as unknown as Record<string, React.ComponentType<any>>;
	const IconComponent = name ? iconsMap[name] : undefined;

	if (IconComponent) {
		return <IconComponent className={className} style={style} />;
	}

	return <AppstoreOutlined className={className} style={style} />;
};

export const resolveIconComponent = (name: string | null | undefined): React.ComponentType<any> | null => {
	const iconsMap = Icons as unknown as Record<string, React.ComponentType<any>>;
	return name ? iconsMap[name] ?? null : null;
};


