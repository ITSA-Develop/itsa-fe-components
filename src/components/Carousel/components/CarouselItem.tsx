import classNames from 'classnames';
import type { CarouselItemProps } from '../types';

export const CarouselItem = ({ children, className }: CarouselItemProps) => {
	return (
		<div className={classNames('min-w-full h-full flex-shrink-0', className)} role="group" aria-roledescription="slide">
			{children}
		</div>
	);
};
