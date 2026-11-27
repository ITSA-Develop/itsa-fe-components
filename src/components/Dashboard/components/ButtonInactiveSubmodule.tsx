import { ButtonAntd } from '@/components/ButtonAntd';
import { getIcon } from '@/helpers/menu/menuDataTransformer';

export interface IButtonInactiveSubmoduleProps {
	name: string;
	icon: string;
	onclick: () => void;
}

export const ButtonInactiveSubmodule = ({ name, icon, onclick }: IButtonInactiveSubmoduleProps) => {
	return (
		<ButtonAntd
			type="text"
			size="small"
			onClick={onclick}
			className="px-2 sm:px-3 min-h-[35px] h-auto !inline-flex !items-center !justify-center text-xs sm:text-sm font-medium rounded-none bg-transparent text-gray-600 border-0 transition-all duration-200 hover:!bg-transparent hover:!text-gray-900 active:bg-gray-50 whitespace-nowrap [&_svg]:!block"
		>
			<span className="inline-flex items-center gap-1.5 leading-none">
				{getIcon(icon.trim().length > 0 ? icon : 'folder', 'inline-flex items-center text-current')}
				<span className="text-xs sm:text-sm leading-none">{name}</span>
			</span>
		</ButtonAntd>
	);
};
