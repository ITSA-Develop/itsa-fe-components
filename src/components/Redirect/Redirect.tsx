import { useEffect } from 'react';

export interface IRedirectProps {
	redirect: string;
}

export const Redirect = ({ redirect }: IRedirectProps) => {
	useEffect(() => {
		if (redirect && redirect.trim()) {
			window.location.assign(redirect);
		}
	}, [redirect]);
	return null;
};
