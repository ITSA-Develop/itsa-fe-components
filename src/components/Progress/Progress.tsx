import { Progress as AntProgress, ProgressProps } from 'antd';

export const Progress = ({ ...rest }: ProgressProps) => {
	return <AntProgress {...rest} />;
};
