import { Tooltip as AntTooltip, TooltipProps } from 'antd';

export const Tooltip = ({ children, ...rest }: TooltipProps) => {
	return <AntTooltip {...rest}>{children}</AntTooltip>;
};
