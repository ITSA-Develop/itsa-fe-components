import { Card as AntCard, CardProps } from 'antd';

export const Card = ({ ...rest }: CardProps) => {
	return <AntCard {...rest} />;
};
