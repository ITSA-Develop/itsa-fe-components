import dayjs from 'dayjs';

export const getCurrentDate = () => {
	return dayjs().format();
};
