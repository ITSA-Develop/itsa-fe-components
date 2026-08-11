import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { Button } from '../Button';
import { DeleteOutlined } from '@ant-design/icons';
import { ITableDetailsColumn } from '@/interfaces';
import { GetRowKey } from 'antd/es/table/interface';
import { TableDetailsMobile } from '../TableDetailsMobile';
import { renderTableDetailsCell } from './renderTableDetailsCell';

const MOBILE_TABLE_MEDIA_QUERY = '(max-width: 480px)';

const getIsMobileTableView = () => {
	if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
	return window.matchMedia(MOBILE_TABLE_MEDIA_QUERY).matches;
};

export interface ITableDetailsProps<T extends object> {
	columns: ITableDetailsColumn<T>[];
	data: T[];
	onDelete: (value: any, record: T, index: number) => void;
	onChangeData?: (params: { record: T; dataIndex: keyof T | string | number; value: any }, index: number) => void;
	rowKey?: string | keyof T | GetRowKey<T>;
	scroll?: {
		x?: string | number | true | undefined;
		y?: string | number | undefined;
	} & {
		scrollToFirstRowOnChange?: boolean | undefined;
	};
	disabledColumnActions?: boolean;
	footer?: ReactNode;
	showHeader?: boolean;
	showActions?: boolean;
	/** Alto fijo del cuerpo de la tabla (ej: 400, '400px', '50vh'). Se aplica con o sin datos. */
	height?: number | string;
	loading?: boolean;
	expandable?: TableProps<T>['expandable'];
	rowClassName?: TableProps<T>['rowClassName'];
}

export const TableDetails = <T extends object>({
	rowKey,
	columns,
	data,
	onDelete,
	onChangeData,
	scroll,
	disabledColumnActions = false,
	footer,
	showHeader = true,
	showActions = true,
	height,
	loading = false,
	expandable,
	rowClassName,
}: ITableDetailsProps<T>) => {
	const [isMobileTableView, setIsMobileTableView] = useState(getIsMobileTableView);

	useEffect(() => {
		if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

		const mediaQueryList = window.matchMedia(MOBILE_TABLE_MEDIA_QUERY);
		const handleMediaChange = (event: MediaQueryListEvent) => {
			setIsMobileTableView(event.matches);
		};

		setIsMobileTableView(mediaQueryList.matches);
		mediaQueryList.addEventListener('change', handleMediaChange);

		return () => {
			mediaQueryList.removeEventListener('change', handleMediaChange);
		};
	}, []);

	const handleChangeData = useCallback(
		(record: T, dataIndex: keyof T | string | number, value: unknown, index: number) => {
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

	const antColumns = useMemo(
		() =>
			columns.map(column => {
				const width = column.width;
				const minWidth = column.minWidth ?? column.width ?? column.maxWidth ?? 150;
				const maxWidth = column.maxWidth ?? column.width;
				const widthStyle = width ?? column.maxWidth ?? column.minWidth;

				return {
					title: column.title,
					dataIndex: column.dataIndex,
					key: column.key,
					width,
					minWidth,
					maxWidth,
					display: column.display,
					fixed: column.fixed,
					align: column.align || 'left',
					onHeaderCell: () => ({
						style: {
							paddingTop: 6,
							paddingBottom: 6,
							width: widthStyle,
							minWidth,
							maxWidth,
						},
					}),
					onCell: () => {
						const baseStyle = {
							width: widthStyle,
							minWidth,
							maxWidth,
							paddingTop: 2,
							paddingBottom: 2,
						};

						if (column.type === undefined) {
							return {
								style: {
									...baseStyle,
									whiteSpace: 'nowrap',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									wordBreak: 'normal',
									overflowWrap: 'normal',
								},
							};
						}

						return {
							style: {
								...baseStyle,
								whiteSpace: 'normal',
								wordBreak: 'break-word',
								overflowWrap: 'break-word',
							},
						};
					},
					render: (value: unknown, record: T, index: number) =>
						renderTableDetailsCell({
							column,
							value,
							record,
							index,
							disabledColumnActions,
							onChangeData: handleChangeData,
						}),
				};
			}) as ColumnsType<T>,
		[columns, disabledColumnActions, handleChangeData],
	);

	const ACTION_COL_WIDTH = 40;

	const handleDelete = useCallback(
		(value: unknown, record: T, index: number) => {
			onDelete(value, record, index);
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
				render: (value: unknown, record: T, index: number) => {
					return (
						<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
							<Button
								type="secondary"
								size="small"
								onClick={() => handleDelete(value, record, index)}
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

	const bodyHeight = height != null ? (typeof height === 'number' ? `${height}px` : height) : undefined;

	const scrollConfig = useMemo(
		() => ({
			y: bodyHeight ?? scroll?.y ?? 'calc(80dvh - 310px)',
			x: scroll?.x ?? 'max-content',
			...(scroll?.scrollToFirstRowOnChange != null && { scrollToFirstRowOnChange: scroll.scrollToFirstRowOnChange }),
		}),
		[bodyHeight, scroll],
	);

	const expandableWithRowClass = useMemo(() => {
		if (!expandable) return expandable;

		const defaultExpandedRowClass = 'itsa-expanded-row-no-spacing';
		const currentExpandedRowClass = expandable.expandedRowClassName;

		if (currentExpandedRowClass === undefined) {
			return {
				...expandable,
				expandedRowClassName: () => defaultExpandedRowClass,
			};
		}

		if (typeof currentExpandedRowClass === 'string') {
			return {
				...expandable,
				expandedRowClassName: `${currentExpandedRowClass} ${defaultExpandedRowClass}`.trim(),
			};
		}

		return {
			...expandable,
			expandedRowClassName: (record: T, index: number, indent: number) => {
				const userClassName = currentExpandedRowClass(record, index, indent);
				return `${userClassName ?? ''} ${defaultExpandedRowClass}`.trim();
			},
		};
	}, [expandable]);

	if (isMobileTableView) {
		return (
			<TableDetailsMobile
				rowKey={rowKey}
				columns={columns}
				data={data}
				onDelete={onDelete}
				onChangeData={onChangeData}
				disabledColumnActions={disabledColumnActions}
				showActions={showActions}
				loading={loading}
			/>
		);
	}

	return (
		<div
			className={bodyHeight !== undefined ? 'itsa-table-details itsa-table-details-fixed-height' : 'itsa-table-details'}
			style={bodyHeight !== undefined ? ({ '--itsa-table-body-height': bodyHeight } as React.CSSProperties) : undefined}
		>
			<Table
				columns={disabledColumnActions || !showActions ? antColumns : antdWithActions}
				dataSource={data}
				rowKey={rowKey}
				pagination={false}
				tableLayout="fixed"
				scroll={scrollConfig}
				bordered={true}
				footer={footer !== undefined ? () => footer : undefined}
				showHeader={showHeader}
				loading={loading}
				expandable={expandableWithRowClass}
				rowClassName={rowClassName}
			/>
		</div>
	);
};
