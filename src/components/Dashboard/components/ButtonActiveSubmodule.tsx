import { ButtonAntd } from '@/components/ButtonAntd';

export interface IButtonActiveSubmoduleProps {
	name: string;
	icon: string;
	onclick: () => void;
}

export const ButtonActiveSubmodule = ({ name, onclick }: IButtonActiveSubmoduleProps) => {

	return (
		<ButtonAntd
			type="text"
					className="
						px-3 py-2 h-9 -mb-px 
						flex items-center justify-center 
						font-medium text-sm rounded-none
						text-primary-700 
						border-0 
						hover:!text-primary-700 hover:!border-b-primary-700
						hover:!bg-[transparent]
						transition-colors duration-200 ease-out
					"
			size="small"
			onClick={onclick}
		>
					<strong className="text-sm leading-none">{name}</strong>
		</ButtonAntd>
	);
};
