import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { CarouselContext } from './CarouselContext';
import type { CarouselRootProps } from './types';

export const CarouselRoot = ({
	children,
	className,
	autoPlay = false,
	autoPlayInterval = 3000,
	loop = true,
	defaultIndex = 0,
	onChange,
}: CarouselRootProps) => {
	const [currentIndex, setCurrentIndex] = useState(defaultIndex);
	const [totalSlides, setTotalSlides] = useState(0);
	const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

	const canGoNext = loop || currentIndex < totalSlides - 1;
	const canGoPrev = loop || currentIndex > 0;

	const goToSlide = useCallback(
		(index: number) => {
			if (index < 0 || index >= totalSlides) return;
			setCurrentIndex(index);
			onChange?.(index);
		},
		[totalSlides, onChange],
	);

	const goToNext = useCallback(() => {
		if (!canGoNext && !loop) return;
		const nextIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
		if (nextIndex === 0 && !loop) return;
		goToSlide(nextIndex);
	}, [currentIndex, totalSlides, canGoNext, loop, goToSlide]);

	const goToPrev = useCallback(() => {
		if (!canGoPrev && !loop) return;
		const prevIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
		if (prevIndex === totalSlides - 1 && !loop) return;
		goToSlide(prevIndex);
	}, [currentIndex, totalSlides, canGoPrev, loop, goToSlide]);

	useEffect(() => {
		if (!autoPlay || totalSlides === 0) return;

		autoPlayRef.current = setInterval(() => {
			goToNext();
		}, autoPlayInterval);

		return () => {
			if (autoPlayRef.current) {
				clearInterval(autoPlayRef.current);
			}
		};
	}, [autoPlay, autoPlayInterval, goToNext, totalSlides]);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft') {
				e.preventDefault();
				goToPrev();
			} else if (e.key === 'ArrowRight') {
				e.preventDefault();
				goToNext();
			}
		},
		[goToPrev, goToNext],
	);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [handleKeyDown]);

	const contextValue: any = {
		currentIndex,
		totalSlides,
		goToSlide,
		goToNext,
		goToPrev,
		canGoNext,
		canGoPrev,
		setTotalSlides,
	};

	return (
		<CarouselContext.Provider value={contextValue}>
			<div className={classNames('relative w-full', className)} role="region" aria-roledescription="carousel">
				{children}
			</div>
		</CarouselContext.Provider>
	);
};
