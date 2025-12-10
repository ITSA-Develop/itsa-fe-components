import { ButtonAntd } from '@/components/ButtonAntd';

export interface IButtonInactiveSubmoduleProps {
	name: string;
	icon: string;
	onclick: () => void;
}

export const ButtonInactiveSubmodule = ({ name, onclick }: IButtonInactiveSubmoduleProps) => {
	return (
		<ButtonAntd
			type="text"
			size="small"
			onClick={onclick}
			className="px-2 sm:px-3 min-h-[35px] h-auto flex items-center justify-center text-xs sm:text-sm font-medium rounded-none bg-transparent text-gray-600 border-0 transition-all duration-200 hover:!bg-transparent hover:!text-gray-900 active:bg-gray-50 whitespace-nowrap"
		>
			<span className="text-xs sm:text-sm leading-tight">{name}</span>
		</ButtonAntd>
	);
};
