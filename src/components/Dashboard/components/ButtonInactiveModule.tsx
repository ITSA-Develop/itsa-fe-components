import { ButtonAntd } from "@/components/ButtonAntd";
import { getIcon } from "@/helpers/menu/menuDataTransformer";

export interface IButtonInactiveModuleProps {
	name: string;
	icon: string;
	onclick: () => void;
	type: 'module' | 'submodule';
}

export const ButtonInactiveModule = ({ name, icon, onclick, type }: IButtonInactiveModuleProps) => {


	const newClassName = `flex min-w-[165px] ${type === 'module' ? 'flex-col' : 'flex-row'} items-center justify-center hover:!bg-gray-75 hover:!text-gray-400 hover:!border-gray-100 h-auto w-full p-2`;

	return (
		<ButtonAntd
			type="default"
			variant="filled"
			className={newClassName}
			size="large"
			onClick={onclick}
		>
			{getIcon(icon, 'text-gray-400 w-10 h-10')}
			<strong className="text-xs text-gray-400 truncate line-clamp-1">{name}</strong>
		</ButtonAntd>
	);
};