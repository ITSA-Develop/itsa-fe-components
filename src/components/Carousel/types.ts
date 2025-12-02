import { type ReactNode } from 'react';

export interface CarouselContextProps {
	currentIndex: number;
	totalSlides: number;
	goToSlide: (index: number) => void;
	goToNext: () => void;
	goToPrev: () => void;
	canGoNext: boolean;
	canGoPrev: boolean;
}

export interface CarouselRootProps {
	children: ReactNode;
	className?: string;
	autoPlay?: boolean;
	autoPlayInterval?: number;
	loop?: boolean;
	defaultIndex?: number;
	onChange?: (index: number) => void;
}

export interface CarouselContentProps {
	children: ReactNode;
	className?: string;
	aspectRatio?: string;
}

export interface CarouselItemProps {
	children: ReactNode;
	className?: string;
}

export interface CarouselButtonProps {
	direction: 'prev' | 'next';
	className?: string;
	children?: ReactNode;
	variant?: 'default' | 'overlay' | 'outline';
}

export interface CarouselIndicatorsProps {
	className?: string;
	position?: 'bottom' | 'top';
	variant?: 'dots' | 'lines';
}

export interface CarouselImageProps {
	src: string;
	alt: string;
	className?: string;
	objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down';
}
