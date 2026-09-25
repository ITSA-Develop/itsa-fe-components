import { describe, expect, it } from 'vitest';
import {
	applyColumnWidthConstraints,
	getColumnWidthPx,
	getColumnsWidthSum,
	resolveTableScrollX,
	TABLE_EXPAND_COLUMN_WIDTH,
	TABLE_FALLBACK_COLUMN_WIDTH,
	TABLE_SELECTION_COLUMN_WIDTH,
} from '../../components/Table/Table.helpers';

describe('Table.helpers column widths', () => {
	it('parses numeric and px widths and ignores percentages', () => {
		expect(getColumnWidthPx(180)).toBe(180);
		expect(getColumnWidthPx('140px')).toBe(140);
		expect(getColumnWidthPx('20%')).toBeUndefined();
		expect(getColumnWidthPx(0)).toBeUndefined();
		expect(getColumnWidthPx(undefined)).toBeUndefined();
	});

	it('sums explicit column widths and extras', () => {
		expect(
			getColumnsWidthSum([{ width: 90 }, { width: '140px' }, { width: 100 }], {
				hasRowSelection: true,
				hasExpandable: true,
			}),
		).toBe(90 + 140 + 100 + TABLE_SELECTION_COLUMN_WIDTH + TABLE_EXPAND_COLUMN_WIDTH);
	});

	it('uses a fallback width when a column has no explicit size', () => {
		expect(getColumnsWidthSum([{ width: 80 }, {}])).toBe(80 + TABLE_FALLBACK_COLUMN_WIDTH);
	});

	it('keeps max-content when there is data', () => {
		expect(
			resolveTableScrollX({
				scrollX: 'max-content',
				columnsWidthSum: 900,
				hasData: true,
			}),
		).toBe('max-content');
	});

	it('uses the columns sum when the table is empty', () => {
		expect(
			resolveTableScrollX({
				scrollX: 'max-content',
				columnsWidthSum: 920,
				hasData: false,
			}),
		).toBe(920);
	});

	it('does not shrink a numeric scroll.x below the columns sum when empty', () => {
		expect(
			resolveTableScrollX({
				scrollX: 400,
				columnsWidthSum: 920,
				hasData: false,
			}),
		).toBe(920);
		expect(
			resolveTableScrollX({
				scrollX: 2200,
				columnsWidthSum: 920,
				hasData: false,
			}),
		).toBe(2200);
	});

	it('applies minWidth and width on header and body cells', () => {
		const [column] = applyColumnWidthConstraints([{ title: 'Agencia', dataIndex: 'agency', width: 160 }]);

		expect(column?.onHeaderCell?.({}, 0)).toEqual({
			style: { width: 160, minWidth: 160 },
		});
		expect(column?.onCell?.({ agency: 'Quito' }, 0)).toEqual({
			style: { width: 160, minWidth: 160 },
		});
	});
});
