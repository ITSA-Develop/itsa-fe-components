import { useRef } from 'react';
import { findContainedPaths, getOriginFromUrl } from '@/helpers';

export interface IDestructureRoutesProps {
	origin: string | undefined;
	containedPaths: string[];
	moduleByPath: string;
}
export const useDestructureRoutes = (
	pathsConfig: Record<string, (params?: string | undefined) => string>,
): IDestructureRoutesProps => {
	const cachedResult = useRef<IDestructureRoutesProps | null>(null);

	if (!cachedResult.current) {
		const requestFullUrl = window.location.href;

		const origin = getOriginFromUrl(requestFullUrl);

		const containedPaths = findContainedPaths(requestFullUrl, pathsConfig);

		const moduleByPath = containedPaths[0] ?? '';

		cachedResult.current = {
			origin,
			containedPaths,
			moduleByPath,
		};
	}

	return cachedResult.current;
};
