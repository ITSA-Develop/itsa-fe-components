import { useEffect, useState } from 'react';

export const useDrawerRoute = (showForm: boolean) => {
	const [isDrawerOpen, setDrawerOpen] = useState(false);

	useEffect(() => {
		setDrawerOpen(showForm);
	}, [showForm]);

	return {
		isDrawerOpen,
		setDrawerOpen,
	};
};
