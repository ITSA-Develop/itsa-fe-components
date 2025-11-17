import { Tag as AntTag } from 'antd';
import { EStatus } from '@/enums';

export interface ITagStatusProps {
	status: boolean;
	labelTrue?: string;
	labelFalse?: string;
}
export const TagStatus = ({ status, labelTrue, labelFalse }: ITagStatusProps) => {
	const normalizedLabelTrue = () => {
		if (labelTrue) return labelTrue;
		return 'Activo';
	};
	const normalizedLabelFalse = () => {
		if (labelFalse) return labelFalse;
		return 'Inactivo';
	};

	return (
		<div className="flex flex-row justify-center">
			<AntTag color={status ? EStatus.success : EStatus.error}>
				{status === true ? normalizedLabelTrue() : normalizedLabelFalse()}
			</AntTag>
		</div>
	);
};
