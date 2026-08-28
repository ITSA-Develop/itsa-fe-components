export const COMPANY_SELECT_LABEL_MAX_LENGTH = 12;
export const MODULE_SELECT_LABEL_MAX_LENGTH = 9;

export const truncateHeaderSelectLabel = (text: string, maxLength: number): string => {
	if (text.length <= maxLength) return text;
	return `${text.slice(0, maxLength)}...`;
};
