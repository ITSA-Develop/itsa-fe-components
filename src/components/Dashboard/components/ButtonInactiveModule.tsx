import { ButtonAntd } from '@/components/ButtonAntd';
import { getIcon } from '@/helpers/menu/menuDataTransformer';

export interface IButtonInactiveModuleProps {
	name: string;
	icon: string;
	onclick: () => void;
	colorDefault?: string;
	colorHover?: string;
}

export const ButtonInactiveModule = ({
	name,
	icon,
	onclick,
	colorDefault,
	colorHover = '#EF4444',
}: IButtonInactiveModuleProps) => {
	return (
		<ButtonAntd
			type="default"
			onClick={onclick}
			className="
			group
			flex flex-col items-center justify-center 
			min-w-[70px] w-[70px] 
			sm:w-[100px] md:w-[115px] lg:w-[125px] xl:w-[135px] 2xl:w-[145px] 
			h-auto min-h-[70px] 
			sm:min-h-[90px] md:min-h-[105px] lg:min-h-[115px] xl:min-h-[120px] 
			bg-white border border-gray-200 
			hover:shadow-md 
			hover:[--icon-default:var(--icon-hover)]
			active:scale-95 py-2 px-1.5 
			sm:py-2.5 sm:px-2 md:px-2.5 gap-1 sm:gap-1.5 
			rounded-lg sm:rounded-xl shadow-sm 
			sm:shadow-md transition-all duration-200
			"
			style={
				{
					...(colorDefault && { '--icon-default': colorDefault }),
					'--icon-hover': colorHover,
					'--border-hover': colorHover,
				} as React.CSSProperties
			}
			onMouseEnter={(e) => {
				e.currentTarget.style.borderColor = colorHover;
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.borderColor = '';
			}}
		>
			{getIcon(
				icon,
				`
				w-6 h-6 
				sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 
				shrink-0
				transition-colors duration-200
				`,
			)}
			<strong
				className="
			whitespace-normal text-[8px] 
			leading-[1.2] 
			sm:text-[10px] sm:leading-snug md:text-xs md:leading-tight lg:text-xs xl:text-sm 
			text-center break-words hyphens-auto 
			px-0.5 w-full
			transition-colors duration-200
			group-hover:![color:var(--icon-hover)]
			"
				style={{ color: colorDefault || '#9ca3af' }}
			>
				{name}
			</strong>
		</ButtonAntd>
	);
};
