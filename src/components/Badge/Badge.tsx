import { Badge as AntBadge, BadgeProps } from 'antd';

export const Badge = ({ ...rest }: BadgeProps) => {
	return <AntBadge {...rest} />;
};
