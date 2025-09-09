import { Errors } from '@/classes/Errors';
import { useErrors } from '@/hooks';
import { useEffect } from 'react';

export const ErrorsProvider = () => {
	const useErrorsHook = useErrors();

	useEffect(() => {
		Errors.useErrors = useErrorsHook;
	}, []);

	return null;
};
