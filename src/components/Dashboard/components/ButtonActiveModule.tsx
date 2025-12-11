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
			className="flex flex-col items-center justify-center min-w-[85px] w-[85px] sm:w-[120px] md:w-[140px] lg:w-[150px] xl:w-[165px] 2xl:w-[180px] h-auto min-h-[85px] sm:min-h-[110px] md:min-h-[125px] lg:min-h-[135px] xl:min-h-[145px] border-2 border-primary-700 bg-white hover:!shadow-lg active:scale-95 py-2 px-1.5 sm:py-3 sm:px-2 md:px-3 gap-1 sm:gap-2 rounded-lg sm:rounded-2xl shadow-md sm:shadow-lg transition-all duration-200"
		>
			{getIcon(icon, 'w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 !text-red-500 shrink-0')}
			<strong
				className="whitespace-normal text-[9px] leading-[1.2] sm:text-xs sm:leading-snug md:text-sm md:leading-tight lg:text-sm xl:text-base text-gray-800 text-center w-full px-0.5 break-words"
			>
				{name}
			</strong>
		</ButtonAntd>
	);
};
