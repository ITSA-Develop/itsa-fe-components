import { useCallback, useMemo, type Key, type ReactNode } from 'react';
import { Collapse, Empty, Spin } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ITableDetailsProps } from '../TableDetails';
import { Button } from '../Button';
import { renderTableDetailsCell, type TTableDetailsHandleChangeData } from '../TableDetails/renderTableDetailsCell';

interface IMobileCell {
	title: string;
	dataIndex: PropertyKey;
	value: unknown;
	content: ReactNode;
	isTitle: boolean;
}

interface IMobileRow<T extends object> {
	key: Key;
	record: T;
	cells: IMobileCell[];
}

export const TableDetailsMobile = <T extends object>({
	rowKey,
	columns,
	data,
	onDelete,
	onChangeData,
	disabledColumnActions = false,
	showActions = true,
	loading = false,
}: ITableDetailsProps<T>) => {
	const handleChangeData = useCallback<TTableDetailsHandleChangeData<T>>(
		(record, dataIndex, value, index) => {
			const currentValue = record[dataIndex as keyof T];

			if (Object.is(currentValue, value)) return;

			const updatedRecord = {
				...record,
				[dataIndex]: value,
			};

			onChangeData?.(
				{
					record: updatedRecord,
					dataIndex,
					value,
				},
				index,
			);
		},
		[onChangeData],
	);

	const dataWithColumns = useMemo<IMobileRow<T>[]>(
		() => {
			const hasMobileTitleColumns = columns.some(column => column.mobileTitle === true);

			return data.map((record, rowIndex) => {
				const key =
					typeof rowKey === 'function'
						? rowKey(record)
						: rowKey !== undefined
							? (record[rowKey as keyof T] as Key)
							: rowIndex;

				return {
					key,
					record,
					cells: columns.map((column, columnIndex) => {
						const value = record[column.dataIndex as keyof T];

						return {
							title: column.title,
							dataIndex: column.dataIndex,
							value,
							isTitle: hasMobileTitleColumns ? column.mobileTitle === true : columnIndex < 2,
							content: renderTableDetailsCell({
								column,
								value,
								record,
								index: rowIndex,
								disabledColumnActions,
								onChangeData: handleChangeData,
							}),
						};
					}),
				};
			});
		},
		[columns, data, disabledColumnActions, handleChangeData, rowKey],
	);

	const formatValue = (value: unknown): ReactNode => {
		if (value == null || value === '') return <span className="text-gray-400">-</span>;
		if (typeof value === 'string' || typeof value === 'number') return value;
		return String(value);
	};

	return (
		<div className="w-full min-w-0 max-w-full itsa-table-mobile-collapse">
			<Spin spinning={loading}>
				{dataWithColumns.length === 0 ? (
					<Empty description="No hay datos disponibles" />
				) : (
					<Collapse
						size="small"
						expandIconPosition="end"
						className="itsa-table-mobile-collapse__panel"
						items={dataWithColumns.map((row, rowIndex) => {
							const titleCells = row.cells.filter(cell => cell.isTitle);
							const detailCells = row.cells.filter(cell => !cell.isTitle);
							const canDelete = showActions && !disabledColumnActions;

							return {
								key: String(row.key),
								label: (
									<div className="flex w-full min-w-0 max-w-full items-center gap-2 overflow-hidden pr-1 text-left text-xs">
										<div className="flex min-w-0 flex-1 flex-col gap-0.5 overflow-hidden">
											{titleCells.map((cell, cellIndex) => (
												<div key={String(cell.dataIndex)} className="min-w-0 max-w-full overflow-hidden">
													<span
														className={
															cellIndex === 0
																? 'block min-w-0 max-w-full truncate font-semibold text-gray-900'
																: 'block min-w-0 max-w-full truncate text-gray-500'
														}
													>
														{formatValue(cell.value)}
													</span>
												</div>
											))}
										</div>
										{canDelete && (
											<div className="ml-auto shrink-0" onClick={event => event.stopPropagation()}>
												<Button
													type="secondary"
													size="small"
													onClick={() => onDelete(row.key, row.record, rowIndex)}
													loading={false}
													label={<DeleteOutlined />}
												/>
											</div>
										)}
									</div>
								),
								children:
									detailCells.length === 0 ? (
										<p className="m-0 px-1 py-0.5 text-xs text-gray-400">Sin datos adicionales</p>
									) : (
										<dl className="m-0 flex flex-col divide-y divide-gray-200 bg-white">
											{detailCells.map(cell => (
												<div key={String(cell.dataIndex)} className="flex flex-col gap-0 bg-white px-2 py-1.5">
													<dt className="m-0 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
														{cell.title}
													</dt>
													<dd className="m-0 text-xs leading-snug text-gray-900 break-words">{cell.content}</dd>
												</div>
											))}
										</dl>
									),
							};
						})}
					/>
				)}
			</Spin>
		</div>
	);
};