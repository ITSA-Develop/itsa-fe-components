import { ITableColumnAction, MakeFunctionParamsOptional, TStrictTableColumnsType } from '../../types';
import { TableProps as AntTableProps, TablePaginationConfig } from 'antd';
import { TableLocale } from 'antd/es/table/interface';

export interface ITableProps<T extends object> {
    columns: TStrictTableColumnsType<T>;
    data: T[];
    rowKey: Extract<keyof T, string> | ((record: T) => React.Key);
    loading: boolean;
    onChange: MakeFunctionParamsOptional<NonNullable<AntTableProps<T>['onChange']>>;
    bordered?: boolean;
    rowSelection?: AntTableProps<T>['rowSelection'];
    showPagination?: boolean;
    paginationConfig?: TablePaginationConfig;
    scroll?: {
        x?: string | number | true;
        y?: string | number;
    };
    showColumnActions?: boolean;
    columnActions?: ITableColumnAction<T>[];
    getActionsDisabled?: (record: T) => boolean;
    getActionsTriggerDisabled?: (record: T) => boolean;
    className?: string;
    rootClassName?: string;
    rowClassName?: AntTableProps<T>['rowClassName'];
    locale?: TableLocale;
}
export declare const Table: <T extends object>({ columns, data, rowKey, loading, onChange, bordered, rowSelection, showPagination, paginationConfig, scroll, showColumnActions, columnActions, getActionsDisabled, getActionsTriggerDisabled, rootClassName, locale, }: ITableProps<T>) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map