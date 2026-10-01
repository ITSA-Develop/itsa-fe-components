import type { TableProps as AntTableProps } from 'antd';
import type { TableLocale } from 'antd/es/table/interface';
import type { HTMLAttributes, Key, MouseEvent, ReactNode } from 'react';
import type { TStrictTableColumnsType } from '@/types';

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

export const TABLE_SELECTION_COLUMN_WIDTH = 32;
export const TABLE_EXPAND_COLUMN_WIDTH = 48;
export const TABLE_FALLBACK_COLUMN_WIDTH = 120;

export const getColumnWidthPx = (width?: number | string): number | undefined => {
	if (typeof width === 'number' && Number.isFinite(width) && width > 0) return width;
	if (typeof width === 'string' && width.endsWith('px')) {
		const parsed = Number.parseFloat(width);
		if (Number.isFinite(parsed) && parsed > 0) return parsed;
	}
	return undefined;
};

export const getColumnsWidthSum = (
	columns: Array<{ width?: number | string }>,
	extras: { hasRowSelection?: boolean; hasExpandable?: boolean } = {},
): number => {
	const columnsSum = columns.reduce((total, column) => {
		return total + (getColumnWidthPx(column.width) ?? TABLE_FALLBACK_COLUMN_WIDTH);
	}, 0);

	return (
		columnsSum +
		(extras.hasRowSelection ? TABLE_SELECTION_COLUMN_WIDTH : 0) +
		(extras.hasExpandable ? TABLE_EXPAND_COLUMN_WIDTH : 0)
	);
};

export const resolveTableScrollX = ({
	scrollX,
	columnsWidthSum,
	hasData,
}: {
	scrollX?: number | string | true;
	columnsWidthSum: number;
	hasData: boolean;
}): number | string | true | undefined => {
	if (hasData) return scrollX ?? 'max-content';
	if (columnsWidthSum <= 0) return scrollX ?? 'max-content';
	if (typeof scrollX === 'number' && scrollX > 0) return Math.max(scrollX, columnsWidthSum);
	return columnsWidthSum;
};

export const applyColumnWidthConstraints = <T extends object>(
	columns: TStrictTableColumnsType<T>,
): TStrictTableColumnsType<T> =>
	columns.map(column => {
		const widthPx = getColumnWidthPx(column.width);
		if (widthPx == null) return column;

		const widthStyle = { width: widthPx, minWidth: widthPx };

		return {
			...column,
			onHeaderCell: (col, index) => {
				const extra = (column.onHeaderCell?.(col, index) ?? {}) as HTMLAttributes<HTMLTableCellElement>;
				return {
					...extra,
					style: {
						...widthStyle,
						...extra.style,
					},
				};
			},
			onCell: (record, index) => {
				const extra = (column.onCell?.(record, index) ?? {}) as HTMLAttributes<HTMLTableCellElement>;
				return {
					...extra,
					style: {
						...widthStyle,
						...extra.style,
					},
				};
			},
		};
	});
