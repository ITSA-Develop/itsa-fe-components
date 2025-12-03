import { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { CarouselContext, useCarousel } from '../CarouselContext';
import type { CarouselContentProps } from '../types';

export const CarouselContent = ({ children, className, aspectRatio = '16/9' }: CarouselContentProps) => {
	const context = useContext(CarouselContext);
	const { currentIndex, goToNext, goToPrev } = useCarousel();
	const contentRef = useRef<HTMLDivElement>(null);
	const [touchStart, setTouchStart] = useState(0);
	const [touchEnd, setTouchEnd] = useState(0);

	useEffect(() => {
		if (contentRef.current && context) {
			const slideCount = contentRef.current.children.length;
			(context as any).setTotalSlides?.(slideCount);
		}
	}, [children, context]);

	const handleTouchStart = (e: React.TouchEvent) => {
		if (e.targetTouches[0]) {
			setTouchStart(e.targetTouches[0].clientX);
		}
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		if (e.targetTouches[0]) {
			setTouchEnd(e.targetTouches[0].clientX);
		}
	};

	const handleTouchEnd = () => {
		if (!touchStart || !touchEnd) return;
		const distance = touchStart - touchEnd;
		const isLeftSwipe = distance > 50;
		const isRightSwipe = distance < -50;

		if (isLeftSwipe) {
			goToNext();
		}
		if (isRightSwipe) {
			goToPrev();
		}

		setTouchStart(0);
		setTouchEnd(0);
	};

	return (
		<div 
			className={classNames('overflow-hidden w-full', className)} 
			style={{ aspectRatio }}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
		>
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
