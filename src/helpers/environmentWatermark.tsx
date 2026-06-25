import type { ReactNode } from 'react';

export type AppEnvironment = 'LOCAL' | 'DESARROLLO' | 'QA' | 'PRODUCCION';

/** Tailwind classes for the repeating environment watermark layer (shared by header and login). */
export const ENVIRONMENT_WATERMARK_LAYER_CLASSNAME =
	'absolute inset-0 flex flex-wrap items-center gap-x-4 gap-y-1 px-8 text-white-100/20 text-sm font-bold uppercase tracking-[0.35em] select-none pointer-events-none';

export function getEnvironmentWatermarkLabel(environment: AppEnvironment): string {
	const map: Record<AppEnvironment, string> = {
		LOCAL: 'LOCAL',
		DESARROLLO: 'DESARROLLO',
		QA: 'QA',
		PRODUCCION: 'PRODUCCIÓN',
	};
	return map[environment];
}

/** Same repeating watermark markup used in `HeaderLayout` and `Login`. */
export function renderEnvironmentWatermark(environment: AppEnvironment): ReactNode {
	const label = getEnvironmentWatermarkLabel(environment);
	const textRender = Array.from({ length: 40 }).map((_, index) => (
		<span key={index} className='text-gray-75 font-bold uppercase tracking-[0.35em] select-none pointer-events-none'>{label}</span>
	));

	switch (label) {
		case 'LOCAL':
		case 'DESARROLLO':
		case 'PRODUCCIÓN':
			return textRender;
		case 'QA':
			return (
				<div>
					{textRender}
					{textRender}
				</div>
			);
		default:
			return textRender;
	}
}
