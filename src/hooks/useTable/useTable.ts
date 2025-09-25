import { DEFAULT_PAGINATION_CONFIG } from '@/constants';
import { MakeFunctionParamsOptional } from '@/types';
import { TableProps as AntTableProps, TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useState } from 'react';

export interface ITableHookProps<T extends object> {
	pagination: TablePaginationConfig;
	filters: Record<string, FilterValue | null>;
	sorter: SorterResult<T> | SorterResult<T>[];
	onChangePaginationHook: MakeFunctionParamsOptional<NonNullable<AntTableProps<T>['onChange']>>;
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

	const onChangePagination: MakeFunctionParamsOptional<NonNullable<AntTableProps<T>['onChange']>> = (
		pagination?: TablePaginationConfig,
		filters?: Record<string, FilterValue | null>,
		sorter?: SorterResult<T> | SorterResult<T>[],
	) => {
		if (pagination) setPagination(pagination);
		if (filters) setFilters(filters);
		if (sorter) setSorter(sorter);
	};

	return { pagination, filters, sorter, onChangePagination };
};
