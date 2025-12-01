import { ISubmodule } from '@/interfaces';
import { Home } from './components/Home';
// import watermarkLogo from '@/assets/images/logo-tomebamba-negro.png';

export interface ICardModuleProps {
	handleNavigateProgram: (program: ISubmodule) => void;
}
//className = 'opacity-10 max-w-[60%] max-h-[60%] object-contain absolute left-1/3 top-[36%] transform';

export const Dashboard = ({ handleNavigateProgram }: ICardModuleProps) => {
	return (
		<div className="relative flex-1 h-full flex flex-col">
		<div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
				{/* <img
					src={watermarkLogo}
					alt="Marca de agua"
					className="opacity-5 max-w-[60%] max-h-[60%] object-contain"
				/> */}
			</div>
			<div className="relative z-10 flex-1 flex flex-col">
				<Home handleNavigateProgram={handleNavigateProgram} />
			</div>
		</div>
	);
};
