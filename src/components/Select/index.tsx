import { Select as AntSelect, SelectProps } from 'antd';
import { RefCallBack } from 'react-hook-form';

export interface ISelectProps extends SelectProps {
	status: 'error' | 'warning' | undefined;
	ref?: RefCallBack;
}

export const Select = ({ ref, status, ...rest }: ISelectProps) => {
	return <AntSelect {...rest} ref={ref} status={status} className="w-full rounded-lg" />;
};
