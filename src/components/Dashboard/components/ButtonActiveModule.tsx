import { ButtonAntd } from '@/components/ButtonAntd';
import { getIcon } from '@/helpers/menu/menuDataTransformer';

export interface IButtonActiveModuleProps {
	name: string;
	icon: string;
	onclick: () => void;
}

export const ButtonActiveModule = ({ name, icon, onclick }: IButtonActiveModuleProps) => {
	return (
		<ButtonAntd
			type="default"
			onClick={onclick}
			className="
                flex flex-col items-center justify-center
                w-[170px] h-[140px]
                border-[2px] border-primary-700
                bg-white
				hover:!bg-white hover:!border-primary-700 hover:!shadow-lg
                p-3 gap-2
                rounded-[16px]
                shadow-lg
            "
		>
			{getIcon(icon, 'w-14 h-14 !text-red-500')}
			<strong className="text-sm text-gray-800 text-center truncate max-w-[130px]">{name}</strong>
		</ButtonAntd>
	);
};
