import { DEFAULT_PAGINATION_CONFIG } from '@/constants';
import { TableProps as AntTableProps, TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useState } from 'react';

export interface ITableHookProps<T extends object> {
	pagination: TablePaginationConfig;
	filters: Record<string, FilterValue | null>;
	sorter: SorterResult<T> | SorterResult<T>[];
	onChangePaginationHook: AntTableProps<T>['onChange'];
}

export const useTable = <T extends object>(paginationConfig?: TablePaginationConfig) => {
	const configPagination = paginationConfig || DEFAULT_PAGINATION_CONFIG;
	const [pagination, setPagination] = useState<TablePaginationConfig>({
		...configPagination,
		showLessItems: true,
		showSizeChanger: true,
	});
	const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});
	const [sorter, setSorter] = useState<SorterResult<T> | SorterResult<T>[]>([]);
	const [total, setTotal] = useState<number>(0);

	const onChangePagination: AntTableProps<T>['onChange'] = (
		pagination: TablePaginationConfig,
		filters: Record<string, FilterValue | null>,
		sorter: SorterResult<T> | SorterResult<T>[],
	) => {
		setPagination(pagination);
		setFilters(filters);
		setSorter(sorter);
		setTotal(total);
	};

	return { pagination, filters, sorter, onChangePagination };
};
