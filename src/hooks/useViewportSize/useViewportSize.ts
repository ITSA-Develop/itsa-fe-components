
import { useViewportStore } from '@/store/viewport.store';
import { useEffect, useRef } from 'react';
export const useViewportSize = (debounceMs = 150) => {
	const setSize = useViewportStore(s => s.setSize);
	const tRef = useRef<number | null>(null);

	useEffect(() => {
		const update = () => {
			setSize({ width: window.innerWidth, height: window.innerHeight });
		};

		const onResize = () => {
			if (tRef.current != null) window.clearTimeout(tRef.current);
			tRef.current = window.setTimeout(update, debounceMs);
		};

		update();
		window.addEventListener('resize', onResize, { passive: true });
		window.addEventListener('orientationchange', onResize, { passive: true });

		return () => {
			if (tRef.current != null) window.clearTimeout(tRef.current);
			window.removeEventListener('resize', onResize);
			window.removeEventListener('orientationchange', onResize);
		};
	}, [debounceMs, setSize]);
}