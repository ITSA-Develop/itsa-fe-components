import { Tag as AntTag } from 'antd';
import { EStatus } from '@/enums';

export interface ITagStatusProps {
	status?: boolean;
}
export const TagStatus = ({ status }: ITagStatusProps) => {
	return (
		<div className="flex flex-row justify-center">
			<AntTag color={status ? EStatus.success : EStatus.error}>{status === true ? 'Activo' : 'Inactivo'}</AntTag>
		</div>
	);
};
