import { Tag as AntTag } from 'antd';
import { EStatus } from '@/enums';

export interface ITagStatusProps {
	status: EStatus;
	label: string;
}
export const TagStatus = ({ status, label }: ITagStatusProps) => {
	return (
		<div className="flex flex-row justify-center">
			<AntTag color={status}>{label}</AntTag>
		</div>
	);
};
