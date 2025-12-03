import classNames from 'classnames';
import { useCarousel } from '../CarouselContext';
import type { CarouselIndicatorsProps } from '../types';

export const CarouselIndicators = ({ className, position = 'bottom', variant = 'dots' }: CarouselIndicatorsProps) => {
	const { currentIndex, totalSlides, goToSlide } = useCarousel();

	const positionClasses = position === 'bottom' ? 'bottom-4' : 'top-4';

	const dotClasses = (isActive: boolean) => {
		const baseClasses = 'transition-all duration-300 cursor-pointer border-none p-0';

		if (variant === 'dots') {
			return `${baseClasses} w-2.5 h-2.5 rounded-full ${
				isActive ? 'w-8 bg-[white]' : 'bg-[rgba(255,255,255,0.6)] hover:bg-gray-100'
			}`;
		}
		
		return `${baseClasses} h-1 rounded-full ${isActive ? 'w-8 bg-[white]' : 'bg-[rgba(255,255,255,0.6)] w-4 hover:bg-gray-100'}`;
	};

	return (
		<div
			className={classNames(
				'absolute z-10 flex gap-2 items-center',
				positionClasses,
				className,
			)}
			style={{ left: '50%', transform: 'translateX(-50%)' }}
		>
			{Array.from({ length: totalSlides }).map((_, index) => (
				<button
					key={index}
					type="button"
					onClick={() => goToSlide(index)}
					className={dotClasses(index === currentIndex)}
					aria-label={`Ir a imagen ${index + 1}`}
					aria-current={index === currentIndex ? 'true' : 'false'}
				/>
			))}
		</div>
	);
};
