import { DatePicker, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { Select } from '@/components/Select';
import type { ITableDetailsColumn } from '@/interfaces';
import { MoneyInputCell, NumberInputCell, TextInputCell } from './Cells';

export type TTableDetailsHandleChangeData<T extends object> = (
	record: T,
	dataIndex: keyof T | string | number,
	value: any,
	index: number,
) => void;

interface IRenderTableDetailsCellParams<T extends object> {
	column: ITableDetailsColumn<T>;
	value: any;
	record: T;
	index: number;
	disabledColumnActions?: boolean;
	onChangeData: TTableDetailsHandleChangeData<T>;
}

export const renderTableDetailsCell = <T extends object>({
	column,
	value,
	record,
	index,
	disabledColumnActions = false,
	onChangeData,
}: IRenderTableDetailsCellParams<T>) => {
	if (column.render) {
		return column.render(value, record, index);
	}

	const isDisabled = typeof column.disabled === 'function' ? column.disabled(record, index, column) : !!column.disabled;

	const errorFromAccessor = column.errorAccessor?.(record, column);
	const errorFromKeyObject = (record as any)?.[(column.errorKey as keyof T) || 'keyObjectError']?.[
		column.dataIndex as string
	] as string | undefined;
	const error = errorFromAccessor ?? errorFromKeyObject;

	if (column.type === 'select') {
		const defaultOptionValue = column.options?.[0]?.value;
		const safeValue = typeof value === 'string' || typeof value === 'number' ? value : undefined;
		const rawDefault =
			safeValue === undefined
				? typeof column.defaultValue === 'function'
					? column.defaultValue(record, index, column)
					: column.defaultValue
				: undefined;
		const resolvedValue = safeValue ?? rawDefault ?? defaultOptionValue;

		return (
			<div className="flex flex-col gap-0.5" style={{ width: '100%', minWidth: 0, display: 'flex' }}>
				<Select
					value={resolvedValue}
					options={column.options || []}
					onChange={val => onChangeData(record, column.dataIndex, val, index)}
					placeholder="Seleccione una opción"
					style={{ width: '100%' }}
					disabled={isDisabled || disabledColumnActions}
					status={error && column.type === 'select' ? 'error' : undefined}
				/>
				{error && column.type === 'select' && <small className="text-[9px] text-red-500 italic">{error}</small>}
			</div>
		);
	}

	if (column.type === 'text') {
		return (
			<div className="flex flex-col gap-0.5" style={{ width: '100%', minWidth: 0, display: 'flex' }}>
				<TextInputCell
					value={value}
					onCommit={val => onChangeData(record, column.dataIndex, val, index)}
					disabled={isDisabled || disabledColumnActions}
					status={error ? 'error' : undefined}
					textTransform={column.textTransform}
				/>
				{error && <small className="text-[9px] text-red-500 italic">{error}</small>}
			</div>
		);
	}

	if (column.type === 'number') {
		return (
			<div className="flex flex-col gap-0.5" style={{ width: '100%', minWidth: 0, display: 'flex' }}>
				<NumberInputCell
					value={value}
					onCommit={val => onChangeData(record, column.dataIndex, val, index)}
					min={0}
					disabled={isDisabled || disabledColumnActions}
					maxDigits={column.maxDigits}
					status={error ? 'error' : undefined}
				/>
				{error && <small className="text-[9px] text-red-500 italic">{error}</small>}
			</div>
		);
	}

	if (column.type === 'percentage') {
		return (
			<div className="flex flex-col gap-0.5" style={{ width: '100%', minWidth: 0, display: 'flex' }}>
				<NumberInputCell
					suffix="%"
					value={value}
					onCommit={val => onChangeData(record, column.dataIndex, val, index)}
					min={0}
					max={100}
					disabled={isDisabled || disabledColumnActions}
					maxDigits={column.maxDigits}
					status={error ? 'error' : undefined}
				/>
				{error && <small className="text-[9px] text-red-500 italic">{error}</small>}
			</div>
		);
	}

	if (column.type === 'money') {
		return (
			<div className="flex flex-col gap-0.5" style={{ width: '100%', minWidth: 0, display: 'flex' }}>
				<MoneyInputCell
					value={value}
					onCommit={val => onChangeData(record, column.dataIndex, val, index)}
					min={column.min ?? 0}
					disabled={isDisabled || disabledColumnActions}
					precision={2}
					prefix="$"
					maxDigits={column.maxDigits}
					status={error ? 'error' : undefined}
				/>
				{error && <small className="text-[9px] text-red-500 italic">{error}</small>}
			</div>
		);
	}

	if (column.type === 'date') {
		const format = column.dateFormat ?? (column.includeTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD');
		const dateValue =
			typeof value === 'string' && dayjs(value, format).isValid()
				? dayjs(value, format)
				: value && dayjs(value).isValid()
					? dayjs(value)
					: null;

		return (
			<div className="flex flex-col gap-0.5" style={{ width: '100%', minWidth: 0, display: 'flex' }}>
				<DatePicker
					className="w-full"
					format={{
						format,
						type: 'mask',
					}}
					showTime={column.includeTime ? { format: 'HH:mm' } : false}
					value={dateValue}
					onChange={date => onChangeData(record, column.dataIndex, date ? date.format(format) : '', index)}
					disabled={isDisabled || disabledColumnActions}
					status={error ? 'error' : undefined}
					allowClear
				/>
				{error && <small className="text-[9px] text-red-500 italic">{error}</small>}
			</div>
		);
	}

	const canTooltip = typeof value === 'string' || typeof value === 'number';
	const tooltipValue = canTooltip ? String(value) : undefined;

	return (
		<div className="w-full min-w-0">
			<Tooltip title={tooltipValue} placement="topLeft">
				<span className="block truncate">{value}</span>
			</Tooltip>
		</div>
	);
};
