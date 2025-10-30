import { IModule, ISubmodule } from '@/interfaces';
import { Home } from './components/Home';
import watermarkLogo from '@/assets/images/logo-tomebamba-negro.png';

export interface ICardModuleProps {
	modules: IModule[];
	handleNavigateProgram: (program: ISubmodule) => void;
}

export const Dashboard = ({ modules, handleNavigateProgram }: ICardModuleProps) => {
	return (
		<div className="relative flex-1 h-full flex flex-col">
			<div className="pointer-events-none absolute inset-0 z-0">
				<img
					src={watermarkLogo}
					alt="Marca de agua"
					className="opacity-10 max-w-[60%] max-h-[60%] object-contain absolute left-1/3 top-[36%] transform"
				/>
			</div>
			<div className="relative z-10">
				<Home modules={modules} handleNavigateProgram={handleNavigateProgram} />
			</div>
		</div>
	);
};
