import { DEFAULT_PAGINATION_CONFIG, TABLE_SCROLL } from '@/constants';
import { ITableColumnAction, TStrictColumnType, TStrictTableColumnsType } from '@/types';
import { MoreOutlined } from '@ant-design/icons';
import {
	Table as AntTable,
	TableProps as AntTableProps,
	Button,
	Dropdown,
	TableColumnsType,
	TablePaginationConfig,
} from 'antd';

export interface ITableProps<T extends object> {
	columns: TStrictTableColumnsType<T>;
	data: T[];
	rowKey: Extract<keyof T, string> | ((record: T) => React.Key);
	loading: boolean;
	onChange: AntTableProps['onChange'];
	bordered?: boolean;
	rowSelection?: AntTableProps<T>['rowSelection'];
	showPagination?: boolean;
	paginationConfig?: TablePaginationConfig;
	scroll?: { x?: string | number | true; y?: string | number };
	showColumnActions?: boolean;
	columnActions?: ITableColumnAction<T>[];
}

export const Table = <T extends object>({
	columns,
	data,
	rowKey,
	loading,
	onChange,
	bordered = false,
	rowSelection,
	showPagination = false,
	paginationConfig = DEFAULT_PAGINATION_CONFIG,
	scroll = TABLE_SCROLL,
	showColumnActions = false,
	columnActions,
}: ITableProps<T>) => {
	const finalPagination = showPagination ? paginationConfig : false;

	const finalColumns = (): TStrictTableColumnsType<T> => {
		if (showColumnActions) {
			const actionsColumn: TStrictColumnType<T> = {
				title: 'Acciones',
				key: 'actions',
				width: 100,
				align: 'center',
				render: (record: T) => (
					<Dropdown
						placement="bottomRight"
						menu={{
							items: (columnActions ?? []).map((action, index) => ({
								label: action.title,
								key: action.key || `action-${index}`,
								icon: action.icon,
								onClick: () => action.action(record),
							})),
						}}
					>
						<Button type="text" shape="circle" size="small">
							<MoreOutlined />
						</Button>
					</Dropdown>
				),
			};
			return [...columns, actionsColumn];
		}
		return columns;
	};

	return (
		<AntTable<T>
			columns={finalColumns() as TableColumnsType<T>}
			dataSource={data}
			loading={loading}
			bordered={bordered}
			rowSelection={rowSelection}
			onChange={onChange}
			pagination={finalPagination}
			scroll={scroll}
			rowKey={rowKey}
		/>
	);
};
