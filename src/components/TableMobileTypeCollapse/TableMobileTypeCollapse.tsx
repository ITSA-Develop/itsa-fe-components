import { EActionType } from '@/enums';
import { disabledActionButton } from '@/helpers/functions';
import { useControlActions } from '@/hooks';
import { useActionsUser, useAppLayoutStore } from '@/store';
import { ITableColumnAction, TStrictTableColumnsType } from '@/types';
import { Collapse, Empty, Modal } from 'antd';
import { useCallback, useState } from 'react';
import type { ReactNode } from 'react';
import { CollapseLabel } from './components/CollapseLabel';
import { DetailRowDataCollapse } from './components/DetailRowDataCollapse';
import { RowActionsDropdown } from './components/RowActionsDropdown';
import { getCellValue } from './utils/getCellValue';

export interface ITableMobileTypeCollapseProps<T extends object> {
	emptyContent?: ReactNode;
	columns: TStrictTableColumnsType<T>;
	data: T[];
	showColumnActions?: boolean;
	columnActions?: ITableColumnAction<T>[];
	getActionsDisabled?: (record: T) => boolean;
	getActionsTriggerDisabled?: (record: T) => boolean;
}

export const TableMobileTypeCollapse = <T extends object>({
	columns,
	data,
	showColumnActions = false,
	columnActions,
	getActionsDisabled,
	getActionsTriggerDisabled,
}: ITableMobileTypeCollapseProps<T>) => {
	const { programId, fnApiValidatePermissionAction } = useControlActions();
	const currentAgency = useAppLayoutStore(state => state.currentAgency);
	const { actionsUser } = useActionsUser();
	const leadingColumns = columns.slice(0, 2);

	const [confirmModalState, setConfirmModalState] = useState<{
		open: boolean;
		action: ITableColumnAction<T> | null;
		record: T | null;
	}>({
		open: false,
		action: null,
		record: null,
	});

	const clickAction = useCallback(
		async (action: ITableColumnAction<T>, record: T) => {
			const isPermitted = disabledActionButton(action.actionType, actionsUser);
			if (isPermitted) return;
			const isDisabled = typeof action.disabled === 'function' ? action.disabled(record) : action.disabled ?? false;
			if (isDisabled) return;

			if (action.confirmDelete) {
				setConfirmModalState({ open: true, action, record });
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

	const getConfirmContent = () => {
		if (!confirmModalState.action?.confirmDelete || !confirmModalState.record) return '';
		const { content } = confirmModalState.action.confirmDelete;
		if (typeof content === 'function') {
			return content(confirmModalState.record);
		}
		return content;
	};

	const shouldShowActions =
		!!columnActions && columnActions.length > 0 && (showColumnActions ?? true);

	if (data.length === 0) {
		return <Empty description="No hay datos disponibles" />;
	}

	return (
		<>
			<div className="w-full min-w-0 max-w-full itsa-table-mobile-collapse">
				<Collapse
					size="small"
					expandIconPosition="end"
					className="itsa-table-mobile-collapse__panel"
					items={data.map((row, rowIndex) => {
						const values = leadingColumns.map(column => getCellValue(column, row, rowIndex));

						return {
							key: String(rowIndex),
							label: (
								<CollapseLabel
									title={values[0]}
									value={values[1]}
									actions={
										shouldShowActions ? (
											<RowActionsDropdown
												record={row}
												columnActions={columnActions}
												onActionClick={clickAction}
												getActionsDisabled={getActionsDisabled}
												getActionsTriggerDisabled={getActionsTriggerDisabled}
											/>
										) : undefined
									}
								/>
							),
							children: (
								<DetailRowDataCollapse columns={columns} row={row} rowIndex={rowIndex} />
							),
						};
					})}
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

/** @deprecated Usar ITableMobileTypeCollapseProps */
export type ITableMobileProps<T extends object> = ITableMobileTypeCollapseProps<T>;
