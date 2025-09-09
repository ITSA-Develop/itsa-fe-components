import { clearLocalStorage } from '../helpers';
import { AUTH_LINK, ENVIRONMENT, SUBDOMAINS, URL_PARAMS } from './constants';

export const getRedirectURL = (subdomain: string): string => {
	if (subdomain) {
		if (ENVIRONMENT === 'production') {
			return `https://${subdomain}.itsa-tomebamba.com`; // TODO: to be defined
		} else if (ENVIRONMENT === 'development') {
			return `http://${subdomain}.localhost`; // TODO: ports to be defined
		}
	} else {
		return `https://localhost:5173`;
	}

	return 'error';
};

export const logout = async (redirect: string = AUTH_LINK, noNavigate?: boolean, noQueryParam?: boolean) => {
	const currentMainPath = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;

	clearLocalStorage();

	if (!noNavigate) {
		if (noQueryParam) {
			window.location.href = `${getRedirectURL(SUBDOMAINS.backOffice)}${redirect}`;
		} else {
			const queryString = window.location.search.replace('?', '');
			const existingQueryParams = queryString === '' ? '' : `&${queryString}`;
			window.location.href = `${getRedirectURL(
				SUBDOMAINS.backOffice,
			)}${redirect}?${URL_PARAMS.redirect}=${currentMainPath}${existingQueryParams}`;
		}
	}
};
