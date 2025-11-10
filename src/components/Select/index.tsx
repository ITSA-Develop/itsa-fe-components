import { Select as AntSelect, SelectProps } from 'antd';
import { RefCallBack } from 'react-hook-form';

export interface ISelectProps extends SelectProps {
	status?: 'error' | 'warning' | undefined;
	ref?: RefCallBack;
}

export const Select = ({ ref, status, ...rest }: ISelectProps) => {
	const validValues = rest.options?.map(o => o.value);
	const safeValue = validValues?.includes(rest.value) ? rest.value : undefined;
	return <AntSelect {...rest} value={safeValue} ref={ref} status={status} className="w-full rounded-lg" />;
};
