import React from 'react';
import * as Icons from '@/assets/icons';
import { DynamicIcon, iconNames as lucideIconNames, type IconName as LucideIconName } from 'lucide-react/dynamic';

const DEFAULT_LUCIDE_ICON = 'folder-pen' satisfies LucideIconName;

export type IconName = keyof typeof Icons;

interface GetIconOptions {
	className?: string;
	style?: React.CSSProperties;
	/**
	 * Tamaño del icono. Acepta número (px) o cualquier valor CSS válido (por ejemplo, '1.25rem').
	 */
	size?: number | string;
}

const isLucideIconName = (name: string): name is LucideIconName =>
	(lucideIconNames as readonly string[]).includes(name);

const toLucideSize = (size?: number | string) => {
	if (typeof size === 'number') return size;
	if (typeof size === 'string' && size.endsWith('px')) {
		const parsed = Number.parseFloat(size);
		if (!Number.isNaN(parsed)) return parsed;
	}
	return 16;
};

const renderLucideIcon = (name: LucideIconName, size?: number | string) => (
	<DynamicIcon
		name={name}
		size={toLucideSize(size)}
		strokeWidth={1.75}
		fallback={() => <span className="block h-4 w-4" />}
	/>
);

export const getIconByName = (name: string | null | undefined, options: GetIconOptions = {}) => {
	const { className, style, size } = options;
	const iconsMap = Icons as unknown as Record<string, React.ComponentType<any>>;
	const IconComponent = name ? iconsMap[name] : undefined;
	const lucideName = name && isLucideIconName(name) ? name : undefined;

	const normalizeSize = (value?: number | string) => {
		if (value === undefined || value === null) return undefined;
		return typeof value === 'number' ? `${value}px` : value;
	};

	const wrapperStyle: React.CSSProperties = {
		lineHeight: 1,
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: normalizeSize(size),
		...style,
	};

	return (
		<span className={className} style={wrapperStyle}>
			{lucideName ? (
				renderLucideIcon(lucideName, size)
			) : IconComponent ? (
				<IconComponent />
			) : (
				renderLucideIcon(DEFAULT_LUCIDE_ICON, size)
			)}
		</span>
	);
};

export const resolveIconComponent = (name: string | null | undefined): React.ComponentType<any> | null => {
	const iconsMap = Icons as unknown as Record<string, React.ComponentType<any>>;
	return name ? iconsMap[name] ?? null : null;
};


