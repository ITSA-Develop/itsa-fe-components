import { useCallback, useMemo } from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Select } from '@/components/Select';
import { Button } from '../Button';
import { DeleteOutlined } from '@ant-design/icons';
import { ITableDetailsColumn } from '@/interfaces';
import { NumberInputCell, TextInputCell } from './Cells';
import { GetRowKey } from 'antd/es/table/interface';

export interface ITableDetailsProps<T extends object> {
	columns: ITableDetailsColumn<T>[];
	data: T[];
	onDelete: (record: T) => void;
	onChangeData?: (params: { record: T; dataIndex: keyof T | string | number; value: any }) => void;
	rowKey?: string | keyof T | GetRowKey<T>;
	scroll?: {
		x?: string | number | true | undefined;
		y?: string | number | undefined;
	} & {
		scrollToFirstRowOnChange?: boolean | undefined;
	};
}

export const TableDetails = <T extends object>({
	rowKey,
	columns,
	data,
	onDelete,
	onChangeData,
	scroll,
}: ITableDetailsProps<T>) => {
	const handleChangeData = useCallback(
		(record: T, dataIndex: keyof T | string | number, value: any) => {
			const updatedRecord = {
				...record,
				[dataIndex]: value,
			};

			onChangeData?.({
				record: updatedRecord,
				dataIndex,
				value,
			});
		},
		[onChangeData],
	);

	const antColumns = useMemo(
		() =>
			columns.map(column => {
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
						const errorFromAccessor = column.errorAccessor?.(record, column);
						const errorFromKeyObject = (record as any)?.[
							(column.errorKey as keyof T) || 'keyObjectError'
						]?.[column.dataIndex as string] as string | undefined;
						const error = errorFromAccessor ?? errorFromKeyObject;

						if (column.type === undefined) {
							return value;
						}

						if (column.type === 'select') {
							return (
								// <div style={{ width: '100%', minWidth: 0, display: 'flex' }}>
								<div className='flex flex-col gap-0.5'>
									<Select
										value={value}
										options={column.options || []}
										onChange={val => handleChangeData(record, column.dataIndex, val)}
										placeholder="Seleccione una opción"
										style={{ width: '100%' }}
										disabled={column.disabled}
										status={error && column.type === 'select' ? 'error' : undefined}
									/>
									{error && column.type === 'select' && <small className='text-[9px] text-red-500 italic'>{error}</small>}
								</div>
							);
						}

						if (column.type === 'text') {
							return (
								// <div style={{ width: '100%', minWidth: 0, display: 'flex' }}>
								<div className='flex flex-col gap-0.5'>
									<TextInputCell
										value={value}
										onCommit={val => handleChangeData(record, column.dataIndex, val)}
										disabled={column.disabled}
										status={error ? 'error' : undefined}
									/>
									{error && <small className='text-[9px] text-red-500 italic'>{error}</small>}
								</div>
							);
						}

						if (column.type === 'number') {
							return (
								// <div style={{ width: '100%', minWidth: 0, display: 'flex' }}>
								<div className='flex flex-col gap-0.5'>
									<NumberInputCell
										value={value}
										onCommit={val => handleChangeData(record, column.dataIndex, val)}
										min={0}
										disabled={column.disabled}
										maxDigits={column.maxDigits}
										status={error ? 'error' : undefined}
									/>
									{error && <small className='text-[9px] text-red-500 italic'>{error}</small>}
								</div>
							);
						}

						if (column.type === 'percentage') {
							return (
								// <div style={{ width: '100%', minWidth: 0, display: 'flex' }}>
								<div className='flex flex-col gap-0.5'>
									<NumberInputCell
										suffix="%"
										value={value}
										onCommit={val => handleChangeData(record, column.dataIndex, val)}
										min={0}
										max={100}
										disabled={column.disabled}
										maxDigits={column.maxDigits}
										status={error ? 'error' : undefined}
									/>
									{error && <small className='text-[9px] text-red-500 italic'>{error}</small>}
								</div>
							);
						}

						if (column.type === 'money') {
							return (
								// <div style={{ width: '100%', minWidth: 0, display: 'flex' }}>
								<div className='flex flex-col gap-0.5'>
									<NumberInputCell
										value={value}
										onCommit={val => handleChangeData(record, column.dataIndex, val)}
										min={0}
										disabled={column.disabled}
										suffix="USD"
										max={1000000}
										precision={2}
										prefix="$"
										maxDigits={column.maxDigits}
										status={error ? 'error' : undefined}
									/>
									{error && <small className='text-[9px] text-red-500 italic'>{error}</small>}
								</div>
							);
						}

						return value;
					},
				};
			}) as ColumnsType<T>,
		[columns, handleChangeData],
	);

	const ACTION_COL_WIDTH = 40;

	const handleDelete = useCallback(
		(record: T) => {
			onDelete(record);
		},
		[onDelete],
	);

	const antdWithActions: ColumnsType<T> = useMemo(
		() => [
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
		],
		[antColumns, handleDelete],
	);

	return (
		<Table
			columns={antdWithActions}
			dataSource={data}
			rowKey={rowKey}
			pagination={false}
			tableLayout="fixed"
			scroll={scroll || { y: 'calc(80dvh - 310px)', x: 'max-content' }}
			bordered={true}
		/>
	);
};
