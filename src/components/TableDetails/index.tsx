import { InputNumber, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Input } from '@/components/Input/Input';
import { Select } from '@/components/Select';
import { Button } from '../Button';
import { DeleteOutlined } from '@ant-design/icons';
import { ITableDetailsColumn } from '@/interfaces';

export interface ITableDetailsProps<T extends object> {
	columns: ITableDetailsColumn<T>[];
	data: T[];
	onDelete: (record: T) => void;
	onChangeData?: (params: { record: T; dataIndex: keyof T | string | number; value: any }) => void;
	scroll?: {
		x?: string | number | true | undefined;
		y?: string | number | undefined;
	} & {
		scrollToFirstRowOnChange?: boolean | undefined;
	};
}

export const TableDetails = <T extends object>({
	columns,
	data,
	onDelete,
	onChangeData,
	scroll,
}: ITableDetailsProps<T>) => {
	const handleChangeData = (record: T, dataIndex: keyof T | string | number, value: any) => {
		onChangeData?.({
			record,
			dataIndex,
			value,
		});
	};
	const antColumns = columns.map(column => {
		return {
			title: column.title,
			dataIndex: column.dataIndex,
			key: column.key,
			width: 'auto',
			onHeaderCell: () => ({
				style: {
					paddingTop: 6,
					paddingBottom: 6,
				},
			}),
			onCell: () => ({
				style: {
					width: column.width || '140px',
					minWidth: 0,
					whiteSpace: 'normal',
					wordBreak: 'break-word',
					overflowWrap: 'break-word',
					paddingTop: 2,
					paddingBottom: 2,
				},
			}),
			render: (value: any, record: T) => {
				if (column.type === undefined) {
					return value;
				}

				if (column.type === 'select') {
					return (
						<div style={{ width: '100%', minWidth: 0, display: 'flex' }}>
							<Select
								value={value}
								options={column.options || []}
								onChange={val => handleChangeData(record, column.dataIndex, val)}
								placeholder="Seleccione una opción"
								style={{ width: '100%' }}
								disabled={column.disabled}
							/>
						</div>
					);
				}

				if (column.type === 'text') {
					return (
						<div style={{ width: '100%', minWidth: 0, display: 'flex' }}>
							<Input
								type="text"
								value={value}
								onChange={e => handleChangeData(record, column.dataIndex, e.target.value)}
								style={{ width: '100%' }}
								disabled={column.disabled}
							/>
						</div>
					);
				}

				if (column.type === 'number') {
					return (
						<div style={{ width: '100%', minWidth: 0, display: 'flex' }}>
							<InputNumber
								value={value}
								onChange={val => handleChangeData(record, column.dataIndex, val)}
								style={{ width: '100%' }}
								min={0}
								disabled={column.disabled}
							/>
						</div>
					);
				}

				if (column.type === 'percentage') {
					return (
						<div style={{ width: '100%', minWidth: 0, display: 'flex' }}>
							<InputNumber
								suffix="%"
								value={value}
								onChange={val => handleChangeData(record, column.dataIndex, val)}
								style={{ width: '100%' }}
								min={0}
								max={100}
								disabled={column.disabled}
							/>
						</div>
					);
				}

				return value;
			},
		};
	}) as ColumnsType<T>;

	const ACTION_COL_WIDTH = 40;

	const handleDelete = (record: T) => {
		onDelete(record);
	};

	const antdWithActions: ColumnsType<T> = [
		...antColumns,
		{
			title: '',
			key: 'actions',
			fixed: 'right' as const,
			width: ACTION_COL_WIDTH,
			align: 'center',
			render: (record: T) => {
				return (
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
						<Button
							type="secondary"
							size="small"
							onClick={() => handleDelete(record)}
							loading={false}
							label={<DeleteOutlined />}
						/>
					</div>
				);
			},
			onHeaderCell: () => ({
				style: {
					paddingTop: 4,
					paddingBottom: 4,
					width: ACTION_COL_WIDTH,
				},
			}),
			onCell: () => ({
				style: {
					width: ACTION_COL_WIDTH,
					minWidth: ACTION_COL_WIDTH,
					maxWidth: ACTION_COL_WIDTH,
					textAlign: 'center',
					verticalAlign: 'middle',
					whiteSpace: 'nowrap',
					paddingTop: 0,
					paddingBottom: 0,
				},
			}),
		},
	];

	return (
		<Table
			columns={antdWithActions}
			dataSource={data}
			rowKey={(record, index) => (record as any)?.id ?? (record as any)?.key ?? index ?? 0}
			pagination={false}
			tableLayout="fixed"
			scroll={scroll || { y: 'calc(80dvh - 310px)', x: 'max-content' }}
			bordered={true}
		/>
	);
};
