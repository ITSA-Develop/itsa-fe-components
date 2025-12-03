export { CarouselRoot } from './CarouselRoot';
export { CarouselContent } from './components/CarouselContent';
export { CarouselItem } from './components/CarouselItem';
export { CarouselPrevButton, CarouselNextButton } from './components/CarouselButtons';
export { CarouselIndicators } from './components/CarouselIndicators';
export { CarouselImage } from './components/CarouselImage';
export { useCarousel } from './CarouselContext';
export * from './types';

import { CarouselRoot } from './CarouselRoot';
import { CarouselContent } from './components/CarouselContent';
import { CarouselItem } from './components/CarouselItem';
import { CarouselImage } from './components/CarouselImage';
import { CarouselPrevButton, CarouselNextButton } from './components/CarouselButtons';
import { CarouselIndicators } from './components/CarouselIndicators';

export const Carousel = {
	Root: CarouselRoot,
	Content: CarouselContent,
	Item: CarouselItem,
	Image: CarouselImage,
	PrevButton: CarouselPrevButton,
	NextButton: CarouselNextButton,
	Indicators: CarouselIndicators,
};
