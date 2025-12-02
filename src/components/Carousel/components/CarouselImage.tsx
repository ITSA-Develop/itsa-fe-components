import classNames from 'classnames';
import type { CarouselImageProps } from '../types';

export const CarouselImage = ({ src, alt, className, objectFit = 'cover' }: CarouselImageProps) => {
	const objectFitClasses = {
		cover: 'object-cover',
		contain: 'object-contain',
		fill: 'object-fill',
		'scale-down': 'object-scale-down',
	};

	return (
		<img
			src={src}
			alt={alt}
			className={classNames('w-full h-full', objectFitClasses[objectFit], className)}
			loading="lazy"
		/>
	);
};
