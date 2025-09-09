import { Popconfirm as AntPopconfirm, PopconfirmProps } from 'antd';

export const Popconfirm = ({ ...rest }: PopconfirmProps) => {
	return <AntPopconfirm {...rest} />;
};
