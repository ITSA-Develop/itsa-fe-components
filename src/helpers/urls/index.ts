type TParam = string | number | boolean | null | undefined | object | any;

export interface IParams extends Record<string, TParam> {}

export const getQueryParam = (param: string, url: string = window.location.href): string | null => {
	try {
		const parsedUrl = new URL(url);
		return parsedUrl.searchParams.get(param);
	} catch {
		return null;
	}
};

export const buildQueryParams = (filters: Record<string, unknown>): string =>
	Object.entries(filters)
		.filter(([_, value]) => value !== undefined && value !== null && value !== '')
		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
		.join('&');

export const updateURLParams = (filters: Record<string, unknown>) => {
	const queryString = buildQueryParams(filters);
	const newURL = `${window.location.pathname}${queryString ? `?${queryString}` : ''}`;

	window.history.replaceState(null, '', newURL);
};

export const getParamsFromURL = (): Record<string, string> => {
	const searchParams = new URLSearchParams(window.location.search);
	return Object.fromEntries(searchParams.entries());
};

export const clearURLParams = () => {
	const url = new URL(window.location.href);
	url.search = '';
	window.history.replaceState({}, document.title, url.toString());
};

// TODO: double check if we actually need this - probably deprecated after implement new table component
export const addOrderParamIfMissing = (query: string, defaultOrder = ''): string => {
	const params = new URLSearchParams(query);

	if (!params.has('order')) {
		params.append('order', defaultOrder);
	}

	return params.toString();
};

export const cleanPath = (path: string): string => {
	const regex = /(\/(crear|editar|detalles))$/;
	return path.replace(regex, '');
};

export const fillRoute = (routeName: string, params: IParams = {}, isOpenInNewTab?: boolean): string => {
	let outputRoute = routeName.toString();

	Object.keys(params).forEach(key => {
		const paramValue = params[key];

		if (paramValue === null || paramValue === undefined) {
			const regex = new RegExp(`(/?)(:${key})\\??`, 'gi');
			outputRoute = outputRoute.replace(regex, '');
		} else {
			const regex = new RegExp(`(/?)(:${key})\\??`, 'gi');
			outputRoute = outputRoute.replace(regex, (_, p1) => `${p1}${paramValue.toString()}`);
		}
	});

	if (params?.search && typeof params.search === 'object' && Object.keys(params.search).length > 0) {
		outputRoute +=
			'?' +
			Object.keys(params.search)
				.map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params.search[key] ?? ''))
				.join('&');
	}

	outputRoute = outputRoute.replace(/\/+/g, '/');

	if (isOpenInNewTab) {
		window.open(outputRoute, '_blank');
		return '';
	}

	return outputRoute;
};
