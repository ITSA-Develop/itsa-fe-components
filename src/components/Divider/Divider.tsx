import { Divider as AntDivider, DividerProps } from 'antd';

export const Divider = ({ ...rest }: DividerProps) => {
	return <AntDivider {...rest} />;
};
