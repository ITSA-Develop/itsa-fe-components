import type { TableProps as AntTableProps } from 'antd';
import type { TableLocale } from 'antd/es/table/interface';
import type { Key, MouseEvent, ReactNode } from 'react';

export const MOBILE_TABLE_MEDIA_QUERY = '(max-width: 480px)';

type RowKey<T extends object> = Extract<keyof T, string> | ((record: T) => Key);

interface ResolveRowSelectionParams<T extends object> {
	rowSelection?: AntTableProps<T>['rowSelection'];
	selectionMode: 'single' | 'multiple';
}

interface GetNextRowSelectionParams<T extends object> {
	record: T;
	data: T[];
	rowKey: RowKey<T>;
	selectedRowKeys?: readonly Key[];
	selectionMode: 'single' | 'multiple';
}

export const getIsMobileTableView = () => {
	if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
	return window.matchMedia(MOBILE_TABLE_MEDIA_QUERY).matches;
};

export const resolveTableRootClassName = ({
	enableColumnDrag,
	hasRefresh,
	rootClassName,
	className,
}: {
	enableColumnDrag: boolean;
	hasRefresh: boolean;
	rootClassName?: string;
	className?: string;
}) =>
	[
		'itsa-table--head-rounded',
		'w-full min-w-0 max-w-full',
		enableColumnDrag ? 'itsa-table--column-drag' : '',
		hasRefresh ? 'itsa-table--with-refresh' : '',
		rootClassName,
		className,
	]
		.filter(Boolean)
		.join(' ');

export const resolveRowSelection = <T extends object>({
	rowSelection,
	selectionMode,
}: ResolveRowSelectionParams<T>): AntTableProps<T>['rowSelection'] => {
	if (!rowSelection) return undefined;

	const isSingleSelection = selectionMode === 'single';
	const lastSingleSelectionKey =
		isSingleSelection && Array.isArray(rowSelection.selectedRowKeys) && rowSelection.selectedRowKeys.length > 0
			? rowSelection.selectedRowKeys[rowSelection.selectedRowKeys.length - 1]
			: undefined;

	const finalRowSelection: NonNullable<AntTableProps<T>['rowSelection']> = {
		...rowSelection,
		selectedRowKeys:
			isSingleSelection && lastSingleSelectionKey !== undefined
				? [lastSingleSelectionKey]
				: rowSelection.selectedRowKeys,
		type: isSingleSelection ? 'radio' : (rowSelection.type ?? 'checkbox'),
	};

	if (isSingleSelection && rowSelection.onChange) {
		const originalOnChange = rowSelection.onChange;
		finalRowSelection.onChange = (selectedRowKeys, selectedRows, info) => {
			const lastKey = selectedRowKeys[selectedRowKeys.length - 1];
			const lastRow = selectedRows[selectedRows.length - 1];

			if (lastKey === undefined || !lastRow) {
				originalOnChange([], [], info);
				return;
			}

			originalOnChange([lastKey], [lastRow], info);
		};
	}

	return finalRowSelection;
};

export const getRecordKey = <T extends object>(record: T, rowKey: RowKey<T>): Key | undefined => {
	if (typeof rowKey === 'function') return rowKey(record);
	return (record as Record<string, Key | undefined>)[rowKey];
};

export const isSelectionControlClick = (event: MouseEvent<HTMLElement>) => {
	const target = event.target as HTMLElement | null;
	if (!target) return false;
	return !!target.closest('.ant-checkbox') || !!target.closest('.ant-radio');
};

export const getNextRowSelection = <T extends object>({
	record,
	data,
	rowKey,
	selectedRowKeys = [],
	selectionMode,
}: GetNextRowSelectionParams<T>) => {
	const recordKey = getRecordKey(record, rowKey);
	if (recordKey === undefined) return undefined;

	const isSingle = selectionMode === 'single';
	const exists = selectedRowKeys.includes(recordKey);
	const nextKeys = isSingle
		? exists
			? []
			: [recordKey]
		: exists
			? selectedRowKeys.filter(key => key !== recordKey)
			: [...selectedRowKeys, recordKey];
	const nextRows = data.filter(item => {
		const key = getRecordKey(item, rowKey);
		return key !== undefined && nextKeys.includes(key);
	});

	return { exists, isSingle, nextKeys, nextRows };
};

export const getTableEmptyContent = (locale?: TableLocale): ReactNode => {
	const emptyText = locale?.emptyText;
	return typeof emptyText === 'function' ? emptyText() : emptyText;
};
