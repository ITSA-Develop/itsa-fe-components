import * as Icons from '@/assets/icons';

type IconComponent = (props: any) => JSX.Element;

export interface IIconOption {
	label: string;
	value: JSX.Element;
}

export const ICON_OPTIONS: IIconOption[] = Object.entries(Icons).map(([label, Icon]) => {
	const Component = Icon as IconComponent;
	return {
		label,
		value: <Component className="w-6 h-6 text-gray-400" />,
	};
});


