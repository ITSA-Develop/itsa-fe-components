import { InputNumber } from 'antd';
import { ReactNode, useEffect, useRef, useState } from 'react';

export interface StackedCardData {
	id: number | string;
    title?: string;
	children: ReactNode;
}

export interface StackedCardsProps {
	cards?: StackedCardData[];
	initialIndex?: number;
	maxVisible?: number;
	height?: number | string;
	maxWidth?: number | string;
	width?: number | string;
	className?: string;
	showFooterControls?: boolean;
	stackDirection?: 'downRight' | 'upLeft';
	onActiveIndexChange?: (activeIndex: number) => void;
}

const defaultCardsData: StackedCardData[] = [
	{ id: 1, title: 'Primera tarjeta', children: <p className="text-blue-600 font-medium text-sm">Primera tarjeta con contenido</p> },
	{ id: 2, title: 'Segunda tarjeta', children: <p className="text-blue-600 font-medium text-sm">Segunda tarjeta con contenido</p> },
	{ id: 3, title: 'Tercera tarjeta', children: <p className="text-blue-600 font-medium text-sm">Tercera tarjeta con contenido</p> },
	{ id: 4, title: 'Cuarta tarjeta', children: <p className="text-blue-600 font-medium text-sm">Cuarta tarjeta con contenido</p> },
	{ id: 5, title: 'Quinta tarjeta', children: <p className="text-blue-600 font-medium text-sm">Quinta tarjeta con contenido</p> },
	{ id: 6, title: 'Sexta tarjeta', children: <p className="text-blue-600 font-medium text-sm">Sexta tarjeta con contenido</p> },
];

function clamp(value: number, min: number, max: number) {
	return Math.max(min, Math.min(value, max));
}

function cssSize(value: number | string | undefined) {
	if (value === undefined) return undefined;
	return typeof value === 'number' ? `${value}px` : value;
}

function cardShadow(position: number) {
	// position: 0 = active card, >0 = cards behind
	if (position <= 0) {
		// Similar to configured shadow-lg
		return '0 0.5px 8px 0 rgba(207, 216, 220, 1)';
	}

	// Behind cards: invert shadow to top-left (negative offsets)
	const x = -2 - position * 2;
	const y = -2 - position * 2;
	const blur = 10 + position * 2;
	const alpha = Math.max(0.08, 0.18 - position * 0.02);
	return `${x}px ${y}px ${blur}px 0 rgba(38, 50, 56, ${alpha})`;
}

function cardTransform(position: number, direction: 'downRight' | 'upLeft', maxVisible: number) {
	const dir = direction === 'upLeft' ? -1 : 1;

	// Center the whole visible stack, not only the active card.
	// With upLeft the stack grows to negative offsets; with downRight it grows to positive offsets.
	// We offset by half the max spread so the stack bounding box is centered.
	const steps = Math.max(0, maxVisible - 1);
	const spreadX = 12 * steps;
	const baseX = -dir * (spreadX / 2);

	const x = baseX + position * 12 * dir;
	const y = position * 8 * dir;
	const s = 1 - position * 0.02;
	return `translateX(${x}px) translateY(${y}px) scale(${s})`;
}

export const StackedCards = (props: StackedCardsProps) => {
	const {
		cards = defaultCardsData,
		initialIndex = 0,
		maxVisible = 6,
		height = 180,
		width,
		maxWidth = 448,
		className,
		showFooterControls = false,
		stackDirection = 'downRight',
		onActiveIndexChange,
	} = props;
	const maxIndex = Math.max(0, cards.length - 1);
	const [activeIndex, setActiveIndex] = useState(() => clamp(initialIndex, 0, maxIndex));
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setActiveIndex(prev => clamp(prev, 0, maxIndex));
	}, [maxIndex]);

	useEffect(() => {
		onActiveIndexChange?.(activeIndex);
	}, [activeIndex, onActiveIndexChange]);

	useEffect(() => {
		const handleWheel = (e: WheelEvent) => {
			e.preventDefault();
			const dir = e.deltaY > 0 ? 1 : -1;
			setActiveIndex(prev => clamp(prev + dir, 0, maxIndex));
		};

		const container = containerRef.current;
		if (container) {
			container.addEventListener('wheel', handleWheel, { passive: false });
		}

		return () => {
			if (container) {
				container.removeEventListener('wheel', handleWheel);
			}
		};
	}, [maxIndex]);

	return (
		<div
			ref={containerRef}
			className={`flex items-center justify-center w-full ${className ?? ''}`}
		>
			<div
				className="relative"
				style={{
					height: cssSize(height),
					width: cssSize(width ?? maxWidth),
					maxWidth: cssSize(maxWidth),
					marginLeft: 'auto',
					marginRight: 'auto',
				}}
			>
				{cards.map((card, index) => {
					const position = index - activeIndex;
					const isVisible = position >= 0 && position < maxVisible;

					return (
						<div
							key={card.id}
							className={`absolute inset-0 bg-white-100 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-lg overflow-hidden transition-all duration-500 ease-out ${
								!isVisible ? 'opacity-0 pointer-events-none' : ''
							}`}
							style={{
								transform: isVisible
									? cardTransform(position, stackDirection, maxVisible)
									: 'translateX(100px) translateY(50px) scale(0.8)',
								zIndex: cards.length - position,
								opacity: isVisible ? 1 - position * 0.15 : 0,
								boxShadow: isVisible ? cardShadow(position) : undefined,
							}}
						>
							<div className="itsa-stacked-cards__header flex items-center gap-2 bg-gray-50 px-2 py-1">
								<div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-[10px]">
									{card.id}
								</div>
								<h2 className="m-0 text-sm font-bold text-gray-800 leading-none">{card.title}</h2>
							</div>
							<div className="itsa-stacked-cards__content p-2">{card.children}</div>
						</div>
					);
				})}

				{showFooterControls ? (
					<div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 flex gap-2">
						<div
							onWheel={e => e.stopPropagation()}
							onWheelCapture={e => e.stopPropagation()}
							className="bg-white-100 rounded-md px-2 py-1"
						>
							<InputNumber
								size="small"
								min={1}
								max={Math.max(1, cards.length)}
								value={activeIndex + 1}
								onChange={value => {
									if (typeof value !== 'number') return;
									setActiveIndex(clamp(value - 1, 0, maxIndex));
								}}
								className="w-[80px] h-[30px] text-center flex items-center justify-center"
							/>
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
};
