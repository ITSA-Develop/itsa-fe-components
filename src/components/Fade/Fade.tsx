import { ReactNode } from 'react';

export interface IFadeProps {
	children: ReactNode;
	transitionChildren: ReactNode;
	showTransition?: boolean;
	duration?: number;
}

export const Fade = ({ children, transitionChildren, showTransition = false, duration = 500 }: IFadeProps) => {
	return (
		<div className="grid grid-cols-[1fr] h-full w-full">
			<div
				className={`row-start-1 col-start-1 transition-all ease-in ${
					!showTransition ? 'visible' : 'invisible h-0'
				} duration-${duration} ${!showTransition ? 'opacity-100' : 'opacity-0'}`}
			>
				{children}
			</div>
			<div
				className={`row-start-1 col-start-1 transition-all ease-in ${
					showTransition ? 'visible' : 'invisible h-0'
				} duration-${duration} ${showTransition ? 'opacity-100' : 'opacity-0'}`}
			>
				{transitionChildren}
			</div>
		</div>
	);
};
