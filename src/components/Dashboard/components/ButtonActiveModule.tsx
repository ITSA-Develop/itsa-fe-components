import { ButtonAntd } from "@/components/ButtonAntd";
import { getIcon } from "@/helpers/menu/menuDataTransformer";

export interface IButtonActiveModuleProps {
	name: string;
	icon: string;
	onclick: () => void;
	type: 'module' | 'submodule';
}

export const ButtonActiveModule = ({ name, icon, onclick, type }: IButtonActiveModuleProps) => {

	
	const newClassName = `flex min-w-[168px] ${type === 'module' ? 'flex-col' : 'flex-row'} items-center justify-center border border-primary-700 h-auto w-full p-2`;

	return (
		<ButtonAntd
			type="primary"
			variant="filled"
			color="danger"
			className={newClassName}
			size="large"
			onClick={onclick}
		>
			{getIcon(icon, 'w-10 h-10')}
			<strong className="text-xs truncate line-clamp-1">{name}</strong>
		</ButtonAntd>
	);
};