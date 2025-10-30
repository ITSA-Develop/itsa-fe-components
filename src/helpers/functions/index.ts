

import { ELocalStorageKeys, EOptionsFilterStatus } from '@/enums';
import { TNotificationProps } from '@/types';
import { notification } from 'antd';
import { dataFromLocalStorage } from '../objects';

export const openNotificationWithIcon = ({ type, message, description }: TNotificationProps) => {
	notification[type]({
		message,
		description,
	});
};

export const normalizeStatus = (status?: string | boolean | number): EOptionsFilterStatus => {
	if (status === undefined || status === null || status === '') return 2;

	if (status === true || status === 'true' || status === 1 || status === '1') return 1;

	if (status === false || status === 'false' || status === 0 || status === '0') return 0;

	return 2;
};

export const getStoredCollapsedSidebar = () => {
	const closeSidebar = dataFromLocalStorage(ELocalStorageKeys.collapsedSidebar);
	return closeSidebar === 'true' ? true : false;
};

export const setStoredCollapsedSidebar = (collapsed: boolean) => {
	localStorage.setItem(ELocalStorageKeys.collapsedSidebar, String(collapsed));
};