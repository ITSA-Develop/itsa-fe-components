import { DEFAULT_PAGINATION_CONFIG, TABLE_SCROLL } from '@/constants';
import { EActionType } from '@/enums';
import { disabledActionButton, parseSorter } from '@/helpers/functions';
import { useControlActions } from '@/hooks';
import { useActionsUser, useAppLayoutStore } from '@/store';
import { ITableColumnAction, TStrictColumnType, TStrictTableColumnsType } from '@/types';
import { InfoCircleOutlined, LoadingOutlined, MoreOutlined, ReloadOutlined } from '@ant-design/icons';
import { Table as AntTable, TableProps as AntTableProps, Button, Dropdown, TablePaginationConfig, Modal, TableProps } from 'antd';
import { ColumnsType, FilterValue, SorterResult, TableCurrentDataSource, TableLocale } from 'antd/es/table/interface';
import { MouseEvent, useCallback, useEffect, useState } from 'react';
import type { TableProps as RcTableProps } from 'rc-table';
import { ISorterTable } from '@/interfaces';
import { TableMobileTypeCollapse } from '@/components/TableMobileTypeCollapse/TableMobileTypeCollapse';

const DEFAULT_COLUMN_MIN_WIDTH = 140;
const ACTIONS_COLUMN_WIDTH = 64;
const MOBILE_TABLE_MEDIA_QUERY = '(max-width: 767px)';

const getIsMobileTableView = () => {
	if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
	return window.matchMedia(MOBILE_TABLE_MEDIA_QUERY).matches;
};

export interface ITableProps<T extends object> {
	columns: TStrictTableColumnsType<T>;
	data: T[];
	rowKey: Extract<keyof T, string> | ((record: T) => React.Key);
	loading: boolean;
	onChange: (
		pagination?: TablePaginationConfig,
		sorter?: ISorterTable,
		filters?: Record<string, FilterValue | null>,
		extra?: TableCurrentDataSource<T>,
	) => void;
	bordered?: boolean;
	rowSelection?: AntTableProps<T>['rowSelection'];
	showPagination?: boolean;
	paginationConfig?: TablePaginationConfig;
	scroll?: RcTableProps<T>['scroll'] & {
		scrollToFirstRowOnChange?: boolean;
	};
	/** Controla si la selección debe ser única (radio) o múltiple (checkbox). */
	selectionMode?: 'single' | 'multiple';
	showColumnActions?: boolean;
	columnActions?: ITableColumnAction<T>[];
	getActionsDisabled?: (record: T) => boolean;
	getActionsTriggerDisabled?: (record: T) => boolean;
	className?: string;
	rootClassName?: string;
	rowClassName?: AntTableProps<T>['rowClassName'];
	locale?: TableLocale;
	rowHoverable?: boolean;
	refreshDataFunction?: () => void;
	expandable?: TableProps<T>['expandable'];
	showHeader?: boolean;
	heightMobile?: number | string;
}

export const Table = <T extends object>({
	columns,
	data,
	rowKey,
	loading,
	onChange,
	bordered = false,
	className,
	rowSelection,
	selectionMode = 'multiple',
	showPagination = false,
	paginationConfig = DEFAULT_PAGINATION_CONFIG,
	scroll = TABLE_SCROLL,
	showColumnActions = false,
	columnActions,
	getActionsDisabled,
	getActionsTriggerDisabled,
	locale = {
		emptyText: 'No hay datos',
	},
	rowHoverable = true,
	refreshDataFunction,
	rowClassName,
	rootClassName,
	expandable,
	showHeader = true,
	heightMobile,
}: ITableProps<T>) => {
	const { programId, fnApiValidatePermissionAction } = useControlActions();
	const currentAgency = useAppLayoutStore(state => state.currentAgency);
	const { actionsUser } = useActionsUser();
	const [isMobileTableView, setIsMobileTableView] = useState(getIsMobileTableView);
	const finalPagination = showPagination ? paginationConfig : false;
	const baseTableScopeClass = 'itsa-table--head-rounded';
	const resolvedRootClassName = [
		baseTableScopeClass,
		refreshDataFunction ? 'itsa-table--with-refresh' : '',
		rootClassName,
		className,
	]
		.filter(Boolean)
		.join(' ');

	const [confirmModalState, setConfirmModalState] = useState<{
		open: boolean;
		action: ITableColumnAction<T> | null;
		record: T | null;
	}>({
		open: false,
		action: null,
		record: null,
	});

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

	const clickAction = useCallback(async (action: ITableColumnAction<T>, record: T) => {
		const isPermitted = disabledActionButton(action.actionType, actionsUser);
		if (isPermitted) return;
		const isDisabled = typeof action.disabled === 'function' ? action.disabled(record) : action.disabled ?? false;
		if (isDisabled) return;
		if (action.confirmDelete) {
			setConfirmModalState({
				open: true,
				action,
				record,
			});
			return;
		}

		if (action.validateWithApiAction ?? false) {
			const agencyId = currentAgency?.id;
			const actionTypeNumber = action.actionType as EActionType;
			if (actionTypeNumber === undefined || programId === undefined || agencyId === undefined) return;
			const isValid = await fnApiValidatePermissionAction(actionTypeNumber, programId, agencyId);
			if (isValid) {
				action.action(record);
			}
		} else {
			action.action(record);
		}
	}, [currentAgency, programId, fnApiValidatePermissionAction, actionsUser]);

	const handleConfirmAction = async () => {
		const { action, record } = confirmModalState;
		if (!action || !record) return;

		setConfirmModalState({ open: false, action: null, record: null });

		if (action.validateWithApiAction ?? false) {
			const agencyId = currentAgency?.id;
			const actionTypeNumber = action.actionType as EActionType;
			if (programId === undefined || agencyId === undefined) return;
			const isValid = await fnApiValidatePermissionAction(actionTypeNumber, programId, agencyId);
			if (isValid) {
				action.action(record);
			}
		} else {
			action.action(record);
		}
	};

	const handleCancelConfirm = () => {
		setConfirmModalState({ open: false, action: null, record: null });
	};

	const itemsDropdown = useCallback((record: T) => {
		const resultActionsItems = (columnActions || [])
			.filter(action => {
				const isDisabled = disabledActionButton(action.actionType, actionsUser);
				if (isDisabled === true) {
					return false;
				}
				const actionDisabled =
					typeof action.disabled === 'function' ? action.disabled(record) : action.disabled ?? false;
				return !actionDisabled;
			})
			.map((action, index) => ({
				label: action.title,
				key: action.key || `action-${index}`,
				icon: typeof action.icon === 'function' ? action.icon(record) : action.icon,
				onClick: () => clickAction(action, record),
				danger: action.danger,
			}));
		if (resultActionsItems.length > 0) {
			return resultActionsItems;
		}

		return [
			{
				label: 'Sin acciones disponibles',
				key: 'no-actions',
				icon: <InfoCircleOutlined />,
				onClick: () => {},
				danger: false,
				disabled: true,
			},
		];
	}, [columnActions, actionsUser, clickAction]);

	const finalColumns = (): TStrictTableColumnsType<T> => {
		if (showColumnActions) {
			const actionsColumn: TStrictColumnType<T> = {
				title: '',
				key: 'actions',
				width: ACTIONS_COLUMN_WIDTH,
				align: 'center',
				fixed: 'right',
				render: (record: T) => (
					<Dropdown
						disabled={getActionsDisabled?.(record) ?? false}
						placement="bottomRight"
						menu={{
							items: itemsDropdown(record),
						}}
					>
						<Button
							type="text"
							shape="round"
							size="small"
							className="w-full"
							disabled={(getActionsDisabled?.(record) ?? false) || (getActionsTriggerDisabled?.(record) ?? false)}
						>
							<MoreOutlined style={{ fontSize: 24 }} rotate={90} />
						</Button>
					</Dropdown>
				),
			};
			return [...columns, actionsColumn];
		}
		return columns;
	};

	const getColumnsTotalWidth = (tableColumns: TStrictTableColumnsType<T>) =>
		tableColumns.reduce((sum, col) => {
			if (typeof col.width === 'number') return sum + col.width;
			if (col.key === 'actions') return sum + ACTIONS_COLUMN_WIDTH;
			return sum + DEFAULT_COLUMN_MIN_WIDTH;
		}, 0);

	// Calcular el scroll final asegurando que tenga 'x' cuando hay columnas fijas
	const getFinalScroll = (tableColumns: TStrictTableColumnsType<T>) => {
		const columnsWithFixed = tableColumns.some(col => col.fixed === 'left' || col.fixed === 'right');
		const shouldForceScrollX = columnsWithFixed || showColumnActions;

		if (!shouldForceScrollX) {
			return scroll;
		}

		// Si hay columnas fijas, asegurar que scroll.x esté definido y sea un valor válido
		if (scroll != null && typeof scroll === 'object' && 'x' in scroll && scroll.x !== undefined && scroll.x !== null) {
			return scroll;
		}

		// Calcular el ancho total de las columnas o usar el valor por defecto
		const totalWidth = getColumnsTotalWidth(tableColumns);

		// Si scroll es un objeto, hacer merge; si no, crear uno nuevo con el valor por defecto
		const baseScroll = scroll != null && typeof scroll === 'object' ? scroll : TABLE_SCROLL;

		return {
			...baseScroll,
			x:
				scroll != null && typeof scroll === 'object' && scroll.x !== undefined && scroll.x !== null
					? scroll.x
					: totalWidth > 0
						? totalWidth
						: TABLE_SCROLL.x,
		};
	};

	const getConfirmContent = () => {
		if (!confirmModalState.action?.confirmDelete || !confirmModalState.record) return '';
		const { content } = confirmModalState.action.confirmDelete;
		if (typeof content === 'function') {
			return content(confirmModalState.record);
		}
		return content;
	};

	const handleChangePagination = (
		pagination: TablePaginationConfig,
		filters: Record<string, FilterValue | null>,
		sorter: SorterResult<T> | SorterResult<T>[],
		extra: TableCurrentDataSource<T>,
	) => {
		if (Array.isArray(sorter)) {
			return;
		}
		const sorterParsed: ISorterTable = parseSorter(sorter);
		onChange(pagination, sorterParsed, filters, extra);
	};

	const tableColumns = finalColumns();

	const getRowSelection = (): AntTableProps<T>['rowSelection'] => {
		if (!rowSelection) return undefined;

		const isSingleSelection = selectionMode === 'single';

		const lastSingleSelectionKey =
			isSingleSelection &&
				Array.isArray(rowSelection.selectedRowKeys) &&
				rowSelection.selectedRowKeys.length > 0
				? rowSelection.selectedRowKeys[rowSelection.selectedRowKeys.length - 1]
				: undefined;

		const sanitizedSelectedRowKeys =
			isSingleSelection && lastSingleSelectionKey !== undefined
				? [lastSingleSelectionKey]
				: rowSelection.selectedRowKeys;

		const finalRowSelection: NonNullable<AntTableProps<T>['rowSelection']> = {
			...rowSelection,
			selectedRowKeys: sanitizedSelectedRowKeys,
			type: isSingleSelection ? 'radio' : rowSelection.type ?? 'checkbox',
		};

		if (isSingleSelection && rowSelection.onChange) {
			const originalOnChange = rowSelection.onChange;
			finalRowSelection.onChange = (selectedRowKeys, selectedRows, info) => {
				const lastKey = selectedRowKeys[selectedRowKeys.length - 1];
				const lastRow = selectedRows[selectedRows.length - 1];

				if (lastKey === undefined || !lastRow) {
					originalOnChange([], [], info);
					return;
				}

				originalOnChange([lastKey], [lastRow], info);
			};
		}

		return finalRowSelection;
	};

	const resolvedRowSelection = getRowSelection();

	const getRecordKey = (record: T): React.Key | undefined => {
		if (typeof rowKey === 'function') return rowKey(record);
		return (record as Record<string, React.Key | undefined>)[rowKey];
	};

	const isSelectionControlClick = (event: MouseEvent<HTMLElement>) => {
		const target = event.target as HTMLElement | null;
		if (!target) return false;
		return !!target.closest('.ant-checkbox') || !!target.closest('.ant-radio');
	};

	const handleRowClick = (record: T) => (event: MouseEvent<HTMLElement>) => {
		if (!resolvedRowSelection) return;
		if (isSelectionControlClick(event)) return;

		const recordKey = getRecordKey(record);
		if (recordKey === undefined) return;

		const isSingle = selectionMode === 'single';
		const currentKeys = (resolvedRowSelection.selectedRowKeys as React.Key[] | undefined) ?? [];
		const exists = currentKeys.includes(recordKey);

		let nextKeys: React.Key[];
		if (isSingle) {
			nextKeys = exists ? [] : [recordKey];
		} else {
			nextKeys = exists ? currentKeys.filter(k => k !== recordKey) : [...currentKeys, recordKey];
		}

		const nextRows = data.filter(item => {
			const key = getRecordKey(item);
			return key !== undefined && nextKeys.includes(key);
		});

		resolvedRowSelection.onSelect?.(record, !exists, nextRows, event as unknown as Event);
		resolvedRowSelection.onChange?.(nextKeys, nextRows, { type: isSingle ? 'single' : 'multiple' });
	};

	const getMobileEmptyContent = () => {
		const emptyText = locale?.emptyText;
		return typeof emptyText === 'function' ? emptyText() : emptyText;
	};

	if (isMobileTableView) {
		return (
			<TableMobileTypeCollapse<T>
				heightMobile={heightMobile}
				columns={columns}
				data={data}
				rowKey={rowKey}
				loading={loading}
				showColumnActions={showColumnActions}
				columnActions={columnActions}
				getActionsDisabled={getActionsDisabled}
				getActionsTriggerDisabled={getActionsTriggerDisabled}
				emptyContent={getMobileEmptyContent()}
				refreshDataFunction={refreshDataFunction}
				showPagination={showPagination}
				paginationConfig={paginationConfig}
				onChange={onChange}
			/>
		);
	}

	return (
		<>
			<div className={refreshDataFunction ? 'itsa-table-wrapper itsa-table-wrapper--refresh' : 'itsa-table-wrapper'}>
				{refreshDataFunction && (
					<div className="itsa-table-refresh-bar">
						<Button
							style={{ color: 'gray', border: 'none' }}
							type="text"
							onClick={() => refreshDataFunction()}
							className="itsa-table-refresh-button"
						>
							<div className="flex flex-row items-center justify-center gap-1">
								{loading ? <LoadingOutlined spin={loading} style={{ fontSize: 9 }} /> : <ReloadOutlined style={{ fontSize: 12 }} />}
								<span className="text-[11px] leading-none">Refrescar</span>
							</div>
							
						</Button>
					</div>
				)}
				<AntTable<T>
					columns={tableColumns as ColumnsType<T>}
					dataSource={data}
					loading={loading}
					size="small"
					bordered={bordered}
					rowSelection={resolvedRowSelection}
					onChange={handleChangePagination}
					pagination={finalPagination}
					scroll={getFinalScroll(tableColumns)}
					locale={locale}
					className={resolvedRootClassName}
					rootClassName={resolvedRootClassName}
					rowClassName={rowClassName}
					rowKey={rowKey}
					components={{
						header: {
							wrapper: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
								<thead
									{...props}
									style={{
										...props?.style,
										overflow: 'hidden',
										borderTopLeftRadius: refreshDataFunction ? 0 : 8,
										borderTopRightRadius: refreshDataFunction ? 0 : 8,
									}}
								/>
							),
							cell: (props: React.HTMLAttributes<HTMLTableCellElement>) => {
								return (
									<th
										{...props}
										style={{
											...props?.style,
											background: '#EEF1F3',
											color: 'black',
											fontSize: '12px',
											height: '42px',
											padding: '4px 8px',
										}}
									/>
								);
							},
						},
						body: {
							cell: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
								<td
									{...props}
									style={{
										...props?.style,
										color: 'black',
										fontSize: '12px',
										height: '30px',
										lineHeight: '18px',
										padding: '4px 8px',
									}}
								/>
							),
						},
					}}
					onRow={record => ({
						onClick: handleRowClick(record),
					})}
					expandable={expandable}
					rowHoverable={rowHoverable}
					showHeader={showHeader}
				/>
			</div>

			{confirmModalState.open && (
				<Modal
					title={confirmModalState.action?.confirmDelete?.title}
					open={confirmModalState.open}
					onOk={handleConfirmAction}
					onCancel={handleCancelConfirm}
					okText={confirmModalState.action?.confirmDelete?.confirmLabel}
					cancelText={confirmModalState.action?.confirmDelete?.cancelLabel}
					okButtonProps={{ danger: confirmModalState.action?.danger }}
					cancelButtonProps={{ danger: true }}
				>
					{getConfirmContent()}
				</Modal>
			)}
		</>
	);
};
