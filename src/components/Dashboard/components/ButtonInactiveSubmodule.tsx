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
			className="
				px-3 py-2 h-9 -mb-px
				flex items-center justify-center
				text-sm font-medium rounded-none
				bg-transparent
				text-gray-600
				border-0
				transition-colors duration-200 ease-out
				hover:!bg-[transparent]
				hover:!text-gray-900 hover:!border-b-gray-300
			" 
			size="small" 
			onClick={onclick}
		>
				<span className="text-sm leading-none">{name}</span>
		</ButtonAntd>
	);
};
