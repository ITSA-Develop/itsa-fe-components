import { MakeFunctionParamsOptional } from '../../types';
import { TableProps as AntTableProps, TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';

export interface ITableHookProps<T extends object> {
    pagination: TablePaginationConfig;
    filters: Record<string, FilterValue | null>;
    sorter: SorterResult<T> | SorterResult<T>[];
    onChangePaginationHook: MakeFunctionParamsOptional<NonNullable<AntTableProps<T>['onChange']>>;
}
export declare const useTable: <T extends object>(paginationConfig?: TablePaginationConfig) => {
    pagination: TablePaginationConfig;
    filters: Record<string, FilterValue | null>;
    sorter: SorterResult<T> | SorterResult<T>[];
    onChangePagination: (pagination?: TablePaginationConfig | undefined, filters?: Record<string, FilterValue | null> | undefined, sorter?: SorterResult<T> | SorterResult<T>[] | undefined, extra?: import('antd/es/table/interface').TableCurrentDataSource<T> | undefined) => void;
};
//# sourceMappingURL=useTable.d.ts.map