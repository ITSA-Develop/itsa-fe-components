import { Button } from '@/components/Button/Button';
import { EButtonColor } from '@/enums';
import { clearURLParams } from '@/helpers';
import { ReactNode } from 'react';

export interface IFilterSearchContainerProps {
	handleSubmit: (data: unknown) => void; // TODO: define when new UI implementation starts
	reset: () => void; // TODO: define when new UI implementation starts
	children: ReactNode;
}

export const FilterSearchContainer = ({ handleSubmit, reset, children }: IFilterSearchContainerProps) => {
	const handleClear = () => {
		reset();
		clearURLParams();
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="p-4 w-full bg-grey-100 rounded-md">
				<div className="flex flex-wrap gap-4 items-center justify-between">
					{children}
					<Button onClick={handleClear} color={EButtonColor.primary}>
						Limpiar Filtros
					</Button>
					{/* To trigger the onsubmit */}
					<Button htmlType="submit" className="!hidden" />
				</div>
			</div>
		</form>
	);
};
