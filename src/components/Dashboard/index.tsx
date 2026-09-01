import { IProgram } from '@/interfaces';
import { Home } from './components/Home';

export interface ICardModuleProps {
	handleNavigateProgram: (program: IProgram) => void;
}

export const Dashboard = ({ handleNavigateProgram }: ICardModuleProps) => {
	return (
		<div className="w-full h-full flex flex-col overflow-hidden">
			<Home handleNavigateProgram={handleNavigateProgram} />
		</div>
	);
};
