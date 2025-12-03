import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useCarousel } from '../CarouselContext';
import type { CarouselButtonProps } from '../types';

export const CarouselButton = ({ direction, className, children, variant = 'overlay' }: CarouselButtonProps) => {
	const { goToNext, goToPrev, canGoNext, canGoPrev } = useCarousel();
	const isDisabled = direction === 'next' ? !canGoNext : !canGoPrev;

	const handleClick = () => {
		if (isDisabled) return;
		direction === 'next' ? goToNext() : goToPrev();
	};

	const baseClasses = `
		flex items-center justify-center
		transition-all duration-200
        disabled:cursor-not-allowed
        disabled:opacity-40
		disabled:cursor-not-allowed
		disabled:bg-gray-200
		disabled:text-gray-400
		disabled:shadow-none
	`;

	const variantClasses = {
		overlay: `
			absolute top-1/2 -translate-y-1/2
			bg-white text-gray-800
			rounded-full w-10 h-10
            border-none
			shadow-md hover:shadow-lg
			hover:bg-gray-50
			z-10
		`,
		default: `
			bg-white text-gray-700 
			hover:bg-gray-100 
			border border-gray-300 
			rounded-xl p-3 shadow-sm hover:shadow-md
		`,
		outline: `
			border-2 border-white text-white 
			hover:bg-white/10 
			rounded-full w-10 h-10
		`,
	};

	const positionClasses = variant === 'overlay' ? (direction === 'next' ? 'right-4' : 'left-4') : '';

	return (
		<button
			type="button"
			onClick={handleClick}
			disabled={isDisabled}
			className={classNames(baseClasses, variantClasses[variant], positionClasses, className)}
			aria-label={direction === 'next' ? 'Siguiente imagen' : 'Imagen anterior'}
		>
			{children ||
				(direction === 'next' ? <RightOutlined className="text-lg" /> : <LeftOutlined className="text-lg" />)}
		</button>
	);
};

export const CarouselPrevButton = (props: Omit<CarouselButtonProps, 'direction'>) => (
	<CarouselButton {...props} direction="prev" />
);

export const CarouselNextButton = (props: Omit<CarouselButtonProps, 'direction'>) => (
	<CarouselButton {...props} direction="next" />
);
