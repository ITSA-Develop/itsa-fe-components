import { Tag as AntTag, TagProps } from 'antd';

import { COLOR_TAGS } from '@/constants';

export interface ITagCustomProps extends TagProps {
	color: 'magenta' | 'green' | 'blue' | 'orange';
	className?: string;
}
export const TagCustom = ({ color, className, style, ...rest }: ITagCustomProps) => {
	const colorSet = COLOR_TAGS[color];

	return (
		<AntTag
			{...rest}
			className={className}
			style={{ ...style, backgroundColor: colorSet.bg, borderColor: colorSet.borde, color: colorSet.text }}
		/>
	);
};
