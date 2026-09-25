import { DEFAULT_PAGINATION_CONFIG } from '@/constants';
import { EActionType } from '@/enums';
import { disabledActionButton, getTableHeight, parseSorter } from '@/helpers/functions';
import { useControlActions } from '@/hooks';
import { useActionsUser, useAppLayoutStore, useLegacyAppLayoutStore } from '@/store';
import { ITableColumnAction, TStrictColumnType, TStrictTableColumnsType } from '@/types';
import { InfoCircleOutlined, LoadingOutlined, MoreOutlined, ReloadOutlined } from '@ant-design/icons';
import {
	Table as AntTable,
	TableProps as AntTableProps,
	Button,
	Dropdown,
	TablePaginationConfig,
	Modal,
	TableProps,
} from 'antd';
import { ColumnsType, FilterValue, SorterResult, TableCurrentDataSource, TableLocale } from 'antd/es/table/interface';
import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { ISorterTable } from '@/interfaces';
import { BusinessLineSelect } from '@/components/BusinessLineSelect';
import { TableMobileTypeCollapse } from '@/components/TableMobileTypeCollapse/TableMobileTypeCollapse';
import { useScreenViewport } from '@/hooks/useScreenViewport';
import {
	createBaseBodyCell,
	createBaseHeaderCell,
	createDragTableBodyCell,
	createDragTableHeaderCell,
	TableColumnDragProvider,
	useTableColumnDrag,
} from '@/components/Table/TableColumnDrag';
import {
	applyColumnWidthConstraints,
	getColumnsWidthSum,
	getIsMobileTableView,
	getNextRowSelection,
	getTableEmptyContent,
	isSelectionControlClick,
	MOBILE_TABLE_MEDIA_QUERY,
	resolveRowSelection,
	resolveTableRootClassName,
	resolveTableScrollX,
} from '@/components/Table/Table.helpers';

const BaseHeaderCell = createBaseHeaderCell();
const BaseBodyCell = createBaseBodyCell();
const DragHeaderCell = createDragTableHeaderCell(BaseHeaderCell);
const DragBodyCell = createDragTableBodyCell(BaseBodyCell);

const ACTIONS_COLUMN_WIDTH = 64;

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
	refreshDataFunction?: () => void;
	bordered?: boolean;
	rowSelection?: AntTableProps<T>['rowSelection'];
	paginationConfig?: TablePaginationConfig;
	selectionMode?: 'single' | 'multiple';
	columnActions?: ITableColumnAction<T>[];
	getActionsDisabled?: (record: T) => boolean;
	getActionsTriggerDisabled?: (record: T) => boolean;
	className?: string;
	rootClassName?: string;
	rowClassName?: AntTableProps<T>['rowClassName'];
	locale?: TableLocale;
	rowHoverable?: boolean;
	expandable?: TableProps<T>['expandable'];
	showHeader?: boolean;
	heightMobile?: number | string;
	enableColumnDrag?: boolean;
	onColumnsOrderChange?: (columns: TStrictTableColumnsType<T>) => void;
	scroll?: AntTableProps<T>['scroll'];
	// onChangeBusinessLine?: (businessLineId: number) => void;
}

export const Table = <T extends object>({
	columns,
	data,
	rowKey,
	loading,
	onChange,
	bordered = true,
	className,
	rowSelection,
	selectionMode = 'multiple',
	paginationConfig = DEFAULT_PAGINATION_CONFIG,
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
	heightMobile = '50vh',
	enableColumnDrag = false,
	scroll,
	onColumnsOrderChange,
	// onChangeBusinessLine,
}: ITableProps<T>) => {
	const { userInformation } = useAppLayoutStore();
	const { height: viewportHeight } = useScreenViewport();
	const { programId, fnApiValidatePermissionAction } = useControlActions();
	const currentAgency = useLegacyAppLayoutStore(state => state.currentAgency);
	const { actionsUser } = useActionsUser();
	const businessLines = userInformation?.businessLines ?? [];
	const [isMobileTableView, setIsMobileTableView] = useState(getIsMobileTableView);
	const finalPagination = paginationConfig ? paginationConfig : false;
	const showColumnActions = columnActions && columnActions.length > 0;
	const showPagination = paginationConfig ? true : false;
	const userWithMultipleBusinessLines = businessLines.length > 1;
	const resolvedRootClassName = resolveTableRootClassName({
		enableColumnDrag,
		hasRefresh: Boolean(refreshDataFunction || userWithMultipleBusinessLines),
		rootClassName,
		className,
	});

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

	const clickAction = useCallback(
		async (action: ITableColumnAction<T>, record: T) => {
			const isPermitted = disabledActionButton(action.actionType, actionsUser);
			if (isPermitted) return;
			const isDisabled = typeof action.disabled === 'function' ? action.disabled(record) : (action.disabled ?? false);
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
		},
		[currentAgency, programId, fnApiValidatePermissionAction, actionsUser],
	);

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

	const itemsDropdown = useCallback(
		(record: T) => {
			const resultActionsItems = (columnActions || [])
				.filter(action => {
					const isDisabled = disabledActionButton(action.actionType, actionsUser);
					if (isDisabled === true) {
						return false;
					}
					const actionDisabled =
						typeof action.disabled === 'function' ? action.disabled(record) : (action.disabled ?? false);
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
		},
		[columnActions, actionsUser, clickAction],
	);

	const baseTableColumns = useMemo<TStrictTableColumnsType<T>>(() => {
		if (!showColumnActions) return columns;

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
	}, [columns, getActionsDisabled, getActionsTriggerDisabled, itemsDropdown, showColumnActions]);

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

	const columnDrag = useTableColumnDrag({
		columns: baseTableColumns,
		enabled: enableColumnDrag,
		onColumnsOrderChange,
	});

	const tableColumns = useMemo(
		() => applyColumnWidthConstraints(enableColumnDrag ? columnDrag.columnsWithDragMeta : baseTableColumns),
		[enableColumnDrag, columnDrag.columnsWithDragMeta, baseTableColumns],
	);

	const tableComponents = useMemo(
		() => ({
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
				cell: enableColumnDrag
					? (props: React.HTMLAttributes<HTMLTableCellElement> & { id?: string; draggable?: boolean }) => (
							<DragHeaderCell {...props} />
						)
					: (props: React.HTMLAttributes<HTMLTableCellElement>) => <BaseHeaderCell {...props} />,
			},
			body: {
				cell: enableColumnDrag
					? (props: React.HTMLAttributes<HTMLTableCellElement> & { id?: string; draggable?: boolean }) => (
							<DragBodyCell {...props} />
						)
					: (props: React.HTMLAttributes<HTMLTableCellElement>) => <BaseBodyCell {...props} />,
			},
		}),
		[enableColumnDrag, refreshDataFunction],
	);

	const resolvedRowSelection = resolveRowSelection({ rowSelection, selectionMode });

	const columnsWidthSum = useMemo(
		() =>
			getColumnsWidthSum(tableColumns, {
				hasRowSelection: Boolean(resolvedRowSelection),
				hasExpandable: Boolean(expandable),
			}),
		[tableColumns, resolvedRowSelection, expandable],
	);

	const normalizedScroll = useMemo(() => {
		const baseScroll = scroll ?? { x: 'max-content' as const, y: getTableHeight(viewportHeight) };
		return {
			...baseScroll,
			x: resolveTableScrollX({
				scrollX: baseScroll.x,
				columnsWidthSum,
				hasData: data.length > 0,
			}),
		};
	}, [scroll, viewportHeight, columnsWidthSum, data.length]);

	const handleRowClick = (record: T) => (event: MouseEvent<HTMLElement>) => {
		if (!resolvedRowSelection) return;
		if (isSelectionControlClick(event)) return;

		const nextSelection = getNextRowSelection({
			record,
			data,
			rowKey,
			selectedRowKeys: resolvedRowSelection.selectedRowKeys,
			selectionMode,
		});
		if (!nextSelection) return;

		const { exists, isSingle, nextKeys, nextRows } = nextSelection;
		resolvedRowSelection.onSelect?.(record, !exists, nextRows, event as unknown as Event);
		resolvedRowSelection.onChange?.(nextKeys, nextRows, { type: isSingle ? 'single' : 'multiple' });
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
				emptyContent={getTableEmptyContent(locale)}
				refreshDataFunction={refreshDataFunction}
				showPagination={showPagination}
				paginationConfig={paginationConfig}
				onChange={onChange}
				rowSelection={resolvedRowSelection}
				selectionMode={selectionMode}
			/>
		);
	}

	return (
		<>
			<TableColumnDragProvider
				enabled={enableColumnDrag}
				dragIndex={columnDrag.dragIndex}
				draggableColumnIds={columnDrag.draggableColumnIds}
				sensors={columnDrag.sensors}
				onDragEnd={columnDrag.handleDragEnd}
				onDragOver={columnDrag.handleDragOver}
				activeColumnTitle={columnDrag.activeColumnTitle}
			>
				<div
					className={
						refreshDataFunction || userWithMultipleBusinessLines
							? 'itsa-table-wrapper itsa-table-wrapper--refresh w-full min-w-0 max-w-full overflow-hidden'
							: 'itsa-table-wrapper w-full min-w-0 max-w-full overflow-hidden'
					}
				>
					{(userWithMultipleBusinessLines || refreshDataFunction) && (
						<div className="itsa-table-refresh-bar" style={{ gap: 8 }}>
							{userWithMultipleBusinessLines && <BusinessLineSelect />}
							{refreshDataFunction && (
								<Button
									// type="primary"
									className="rounded-lg"
									size="small"
									color='gold'
									onClick={() => refreshDataFunction()}
									// className="itsa-table-refresh-button"
								>
									<div className="flex flex-row items-center justify-center gap-1">
										{loading ? (
											<LoadingOutlined spin={loading} style={{ fontSize: 9 }} />
										) : (
											<ReloadOutlined style={{ fontSize: 12 }} />
										)}
										<span className="text-[11px] leading-none">Refrescar</span>
									</div>
								</Button>
							)}
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
						scroll={normalizedScroll}
						tableLayout={data.length === 0 && columnsWidthSum > 0 ? 'fixed' : undefined}
						locale={locale}
						className={resolvedRootClassName}
						rootClassName={resolvedRootClassName}
						rowClassName={rowClassName}
						rowKey={rowKey}
						components={tableComponents}
						onRow={record => ({
							onClick: handleRowClick(record),
						})}
						expandable={expandable}
						rowHoverable={rowHoverable}
						showHeader={showHeader}
					/>
				</div>
			</TableColumnDragProvider>

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
