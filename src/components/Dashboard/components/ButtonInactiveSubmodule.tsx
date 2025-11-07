import { ButtonAntd } from '@/components/ButtonAntd';
import { getIcon } from '@/helpers/menu/menuDataTransformer';

export interface IButtonInactiveSubmoduleProps {
	name: string;
	icon: string;
	onclick: () => void;
}

export const ButtonInactiveSubmodule = ({ name, icon, onclick }: IButtonInactiveSubmoduleProps) => {
	const newClassName = `flex min-w-[168px] flex-row items-center justify-start gap-0 hover:!bg-gray-75 hover:!text-gray-400 hover:!border-gray-100 h-auto w-full`;
	return (
		<ButtonAntd type="default" variant="filled" className={newClassName} size="small" onClick={onclick}>
			{getIcon(icon, 'w-10 h-10 text-gray-400')}
			<strong className="text-xs truncate line-clamp-1 text-left leading-none text-gray-400">{name}</strong>
		</ButtonAntd>
	);
};
