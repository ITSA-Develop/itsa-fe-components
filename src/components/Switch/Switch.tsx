import { Switch as AntSwitch, SwitchProps } from 'antd';

export const Switch = ({ ...rest }: SwitchProps) => {
	return <AntSwitch {...rest} />;
};
