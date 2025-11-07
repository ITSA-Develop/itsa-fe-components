import { ButtonAntd } from '@/components/ButtonAntd';
import { getIcon } from '@/helpers/menu/menuDataTransformer';

export interface IButtonActiveSubmoduleProps {
	name: string;
	icon: string;
	onclick: () => void;
}

export const ButtonActiveSubmodule = ({ name, icon, onclick }: IButtonActiveSubmoduleProps) => {
	const newClassName = `flex min-w-[168px] flex-row items-center justify-start gap-0 border border-primary-700 h-auto w-full`;

	return (
		<ButtonAntd type="primary" variant="filled" color="danger" className={newClassName} size="small" onClick={onclick}>
			{getIcon(icon, 'w-10 h-10')}
			<strong className="text-xs truncate line-clamp-1 text-left leading-none">{name}</strong>
		</ButtonAntd>
	);
};
