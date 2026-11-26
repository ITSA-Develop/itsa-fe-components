import { ButtonAntd } from '@/components/ButtonAntd';
import { getIcon } from '@/helpers/menu/menuDataTransformer';

export interface IButtonActiveSubmoduleProps {
	name: string;
	icon: string;
	onclick: () => void;
}

export const ButtonActiveSubmodule = ({ name, icon, onclick }: IButtonActiveSubmoduleProps) => {
	return (
		<ButtonAntd
			type="text"
			size="small"
			onClick={onclick}
			className="px-2 sm:px-3 min-h-[35px] h-auto !inline-flex !items-center !justify-center font-medium text-xs sm:text-sm rounded-none text-primary-700 border-0 hover:!text-primary-700 hover:!bg-transparent active:bg-primary-50/30 transition-all duration-200 whitespace-nowrap [&_svg]:!block"
		>
			<span className="inline-flex items-center gap-1.5 leading-none">
				{getIcon(icon.trim().length > 0 ? icon : 'folder', 'inline-flex items-center text-current')}
				<strong className="text-xs sm:text-sm leading-none">{name}</strong>
			</span>
		</ButtonAntd>
	);
};
