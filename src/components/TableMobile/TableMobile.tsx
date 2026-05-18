import { ITableColumnAction, TStrictTableColumnsType } from '@/types';
import type { ReactNode } from 'react';

const BORDER = '1px solid #e5e7eb';

export interface ITableMobileCell {
	label: string;
	value: ReactNode;
}

export interface ITableMobileRow {
	id: string | number;
	cells: ITableMobileCell[];
}

export interface ITableMobileProps<T extends object> {
	className?: string;
	emptyContent?: ReactNode;
	columnActions?: ITableColumnAction<T>[];
	columns: TStrictTableColumnsType<T>;
	data: T[];
}

export const TableMobile = <T extends object>({ className, emptyContent, columns, data }: ITableMobileProps<T>) => {
	if (data.length === 0) {
		return emptyContent ?? null;
	}

	return (
		<div className={['w-full min-w-0 max-w-full', className].filter(Boolean).join(' ')}>
			<div className="w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain pb-1">
				<div className="inline-block min-w-max overflow-hidden rounded-xl border border-gray-200 align-top">
					<table className="w-max table-auto border-separate border-spacing-0">
						<thead>
							<tr>
								{columns.map((column, colIndex) => (
									<th
										key={column.key}
										className="bg-gray-100 p-0 align-center text-center text-xs font-normal text-gray-900"
										style={{
											borderBottom: BORDER,
											borderRight: colIndex === columns.length - 1 ? 'none' : BORDER,
										}}
									>
										<div className="max-w-[100px] break-words px-0.5 py-0.5">
											<small className="text-[9px]">{column.title as string}</small>
										</div>
									</th>
								))}
							</tr>
						</thead>

						<tbody>
							{data.map((row, rowIndex) => (
								<tr key={rowIndex}>
									{columns.map((column, colIndex) => (
										<td
											key={column.key}
											className="bg-white p-0.5 align-center text-xs text-gray-800 text-center"
											style={{
												borderRight: colIndex === columns.length - 1 ? 'none' : BORDER,
												borderBottom: rowIndex === data.length - 1 ? 'none' : BORDER,
											}}
										>
											{row[column.key as keyof T] as ReactNode}										
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};
