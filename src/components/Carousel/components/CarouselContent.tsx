import { useContext, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { CarouselContext, useCarousel } from '../CarouselContext';
import type { CarouselContentProps } from '../types';

export const CarouselContent = ({ children, className, aspectRatio = '16/9' }: CarouselContentProps) => {
	const context = useContext(CarouselContext);
	const { currentIndex } = useCarousel();
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (contentRef.current && context) {
			const slideCount = contentRef.current.children.length;
			(context as any).setTotalSlides?.(slideCount);
		}
	}, [children, context]);

	return (
		<div className={classNames('overflow-hidden w-full', className)} style={{ aspectRatio }}>
			<div
				ref={contentRef}
				className="flex transition-transform duration-500 ease-in-out h-full"
				style={{ transform: `translateX(-${currentIndex * 100}%)` }}
			>
				{children}
			</div>
		</div>
	);
};
