import { DEFAULT_PAGINATION_CONFIG, TABLE_SCROLL } from '@/constants';
import { ITableColumnAction, MakeFunctionParamsOptional, TStrictColumnType, TStrictTableColumnsType } from '@/types';
import { MoreOutlined } from '@ant-design/icons';
import {
	Table as AntTable,
	TableProps as AntTableProps,
	Button,
	Dropdown,
	TableColumnsType,
	TablePaginationConfig,
} from 'antd';
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
	scroll?: { x?: string | number | true; y?: string | number };
	showColumnActions?: boolean;
	columnActions?: ITableColumnAction<T>[];
	className?: string;
	rootClassName?: string;
	rowClassName?: AntTableProps<T>['rowClassName'];
	locale?: TableLocale;
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
	rootClassName,
	locale= {
		emptyText: 'No hay datos',
	},
}: ITableProps<T>) => {
	const finalPagination = showPagination ? paginationConfig : false;

	const tableRootClassName = ['itsa-table--head-rounded', rootClassName].filter(Boolean).join(' ');

	const finalColumns = (): TStrictTableColumnsType<T> => {
		if (showColumnActions) {
			const actionsColumn: TStrictColumnType<T> = {
				title: '',
				key: 'actions',
				width: 64,
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
						<Button type="text" shape="round" size="small" className="w-full">
							<MoreOutlined className="text-gray-400" style={{ fontSize: 24 }} rotate={90} />
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
			rowSelection={rowSelection ? { type: 'checkbox', ...rowSelection } : undefined}
			onChange={onChange}
			pagination={finalPagination}
			scroll={scroll}
			locale={locale}
			rowKey={rowKey}
			rootClassName={tableRootClassName}
			components={{
				header: {
					wrapper: (props: any) => (
						<thead
							{...props}
							style={{
								...props?.style,
								overflow: 'hidden',
								borderTopLeftRadius: 8,
								borderTopRightRadius: 8,
							}}
						/>
					),
					cell: (props: any) => {
						return (
							<th
								{...props}
								style={{
									...props?.style,
									background: '#EEF1F3',
									color: 'black',
									padding: '0px',
									fontSize: '12px',
									height: '40px',
									paddingLeft: '12px',
									paddingRight: '12px',
								}}
							/>
						);
					},
				},
				body: {
					cell: (props: any) => (
						<td
							{...props}
							style={{ background: 'white', color: 'black', padding: '0px', fontSize: '14px', height: '45px' }}
						/>
					),
				},
			}}
		/>
	);
};
