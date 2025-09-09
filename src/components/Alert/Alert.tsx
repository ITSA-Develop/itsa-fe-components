import { AlertProps, Alert as AntAlert } from 'antd';

export const Alert = ({ ...rest }: AlertProps) => {
	return (
		<>
			<p>Alert!</p>
			<AntAlert {...rest} />
		</>
	);
};
