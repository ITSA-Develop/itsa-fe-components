export const clearLocalStorage = (key?: string): void => {
	if (key) {
		localStorage.removeItem(key);
	} else {
		localStorage.clear();
	}
};
