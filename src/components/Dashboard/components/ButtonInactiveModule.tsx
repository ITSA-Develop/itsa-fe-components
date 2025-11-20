import { ButtonAntd } from '@/components/ButtonAntd';
import { getIcon } from '@/helpers/menu/menuDataTransformer';

export interface IButtonInactiveModuleProps {
	name: string;
	icon: string;
	onclick: () => void;
}

export const ButtonInactiveModule = ({ name, icon, onclick }: IButtonInactiveModuleProps) => {
	return (
		<ButtonAntd
			type="default"
			onClick={onclick}
			className="
				flex flex-col items-center justify-center
				w-[160px] h-[140px]
				bg-white
				border border-gray-200
				hover:border-gray-300
				p-3 gap-2
                rounded-[16px]
                shadow-lg
                mt-2
                mb-2
			"
		>
			{getIcon(icon, 'w-14 h-14 !text-gray-400')}
			<strong className="text-sm text-gray-400 text-center truncate max-w-[130px]">{name}</strong>
		</ButtonAntd>
	);
};
