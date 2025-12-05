import { DEFAULT_PAGINATION_CONFIG } from '@/constants';
import { ISorterTable } from '@/interfaces';
import { TablePaginationConfig } from 'antd';
import { FilterValue, TableCurrentDataSource } from 'antd/es/table/interface';
import { useState } from 'react';

export interface ITableHookProps<T extends object> {
	pagination: TablePaginationConfig;
	filters: Record<string, FilterValue | null>;
	sorter: ISorterTable | undefined;
	extra: TableCurrentDataSource<T> | undefined;
	onChangePagination: (
		pagination?: TablePaginationConfig,
		sorter?: ISorterTable,
		filters?: Record<string, FilterValue | null>,
		extra?: TableCurrentDataSource<T>,
	) => void;
}

export const useTable = <T extends object>(paginationConfig?: TablePaginationConfig): ITableHookProps<T> => {
	const configPagination = paginationConfig || DEFAULT_PAGINATION_CONFIG;
	const [pagination, setPagination] = useState<TablePaginationConfig>({
		...configPagination,
		showLessItems: true,
		showSizeChanger: true,
	});
	const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});
	const [sorter, setSorter] = useState<ISorterTable>();
	const [extra, setExtra] = useState<TableCurrentDataSource<T>>();
	const onChangePagination = (
		pagination?: TablePaginationConfig,
		sorter?: ISorterTable,
		filters?: Record<string, FilterValue | null>,
		extra?: TableCurrentDataSource<T>,
	) => {
		if (pagination) setPagination(pagination);
		if (filters) setFilters(filters);
		if (sorter) setSorter(sorter);
		if (extra) setExtra(extra);
	};

	return { pagination, filters, sorter, extra, onChangePagination };
};
