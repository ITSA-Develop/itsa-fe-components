import {
	createContext,
	forwardRef,
	useContext,
	useMemo,
	useState,
	type CSSProperties,
	type HTMLAttributes,
	type ReactNode,
} from 'react';
import type { DragEndEvent, DragOverEvent, UniqueIdentifier } from '@dnd-kit/core';
import {
	closestCenter,
	DndContext,
	DragOverlay,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import {
	arrayMove,
	horizontalListSortingStrategy,
	SortableContext,
	useSortable,
} from '@dnd-kit/sortable';
import { TStrictColumnType, TStrictTableColumnsType } from '@/types';

export interface DragIndexState {
	active: UniqueIdentifier;
	over: UniqueIdentifier | undefined;
	direction?: 'left' | 'right';
}

interface DragCellProps extends HTMLAttributes<HTMLTableCellElement> {
	id?: string;
	draggable?: boolean;
}

interface UseTableColumnDragParams<T extends object> {
	columns: TStrictTableColumnsType<T>;
	enabled: boolean;
	onColumnsOrderChange?: (columns: TStrictTableColumnsType<T>) => void;
}

const DragIndexContext = createContext<DragIndexState>({ active: -1, over: -1 });
const ACTIONS_COLUMN_KEY = 'actions';

const getColumnDragId = <T extends object>(column: TStrictColumnType<T>, index: number): string => {
	if (column.key != null) return String(column.key);

	const dataIndex = column.dataIndex;
	if (Array.isArray(dataIndex)) return dataIndex.join('.');
	if (dataIndex != null) return String(dataIndex);

	return `column-${index}`;
};

const isColumnDraggable = <T extends object>(column: TStrictColumnType<T>): boolean => {
	if (column.key === ACTIONS_COLUMN_KEY) return false;
	if (column.fixed === 'left' || column.fixed === 'right') return false;
	return true;
};

const partitionColumns = <T extends object>(columns: TStrictTableColumnsType<T>) => {
	const leftFixed: TStrictTableColumnsType<T> = [];
	const draggable: TStrictTableColumnsType<T> = [];
	const rightFixed: TStrictTableColumnsType<T> = [];

	columns.forEach(column => {
		if (column.key === ACTIONS_COLUMN_KEY || column.fixed === 'right') {
			rightFixed.push(column);
			return;
		}

		if (column.fixed === 'left') {
			leftFixed.push(column);
			return;
		}

		draggable.push(column);
	});

	return { leftFixed, draggable, rightFixed };
};

const mergeColumns = <T extends object>(
	leftFixed: TStrictTableColumnsType<T>,
	draggable: TStrictTableColumnsType<T>,
	rightFixed: TStrictTableColumnsType<T>,
) => [...leftFixed, ...draggable, ...rightFixed];

const attachDragMeta = <T extends object>(
	columns: TStrictTableColumnsType<T>,
	enabled: boolean,
): TStrictTableColumnsType<T> =>
	columns.map((column, index) => {
		const id = getColumnDragId(column, index);
		const draggable = enabled && isColumnDraggable(column);

		return {
			...column,
			key: column.key ?? id,
			onHeaderCell: () => ({ id, draggable }),
			onCell: () => ({ id, draggable }),
		};
	});

const dragActiveStyle = (dragState: DragIndexState, id?: string): CSSProperties => {
	if (!id) return {};

	const { active, over, direction } = dragState;

	if (active !== -1 && active === id) {
		return { backgroundColor: '#eef1f3', opacity: 0.65 };
	}

	if (over && id === over && active !== over) {
		return direction === 'right'
			? { borderInlineEnd: '2px dashed var(--itsa-primary, #ea3b48)' }
			: { borderInlineStart: '2px dashed var(--itsa-primary, #ea3b48)' };
	}

	return {};
};

export const useTableColumnDrag = <T extends object>({
	columns,
	enabled,
	onColumnsOrderChange,
}: UseTableColumnDragParams<T>) => {
	const [dragIndex, setDragIndex] = useState<DragIndexState>({ active: -1, over: -1 });
	const columnEntries = useMemo(
		() =>
			columns.map((column, index) => ({
				id: getColumnDragId(column, index),
				column,
			})),
		[columns],
	);
	const [columnOrder, setColumnOrder] = useState<string[]>(() => columnEntries.map(entry => entry.id));

	const resolvedColumnOrder = useMemo(() => {
		const incomingIds = columnEntries.map(entry => entry.id);
		const retainedIds = columnOrder.filter(id => incomingIds.includes(id));
		const addedIds = incomingIds.filter(id => !retainedIds.includes(id));
		return [...retainedIds, ...addedIds];
	}, [columnEntries, columnOrder]);

	const orderedColumns = useMemo(() => {
		const columnsById = new Map(columnEntries.map(entry => [entry.id, entry.column]));
		return resolvedColumnOrder
			.map(id => columnsById.get(id))
			.filter((column): column is TStrictColumnType<T> => column !== undefined);
	}, [columnEntries, resolvedColumnOrder]);

	const columnsWithDragMeta = useMemo(
		() => attachDragMeta(orderedColumns, enabled),
		[orderedColumns, enabled],
	);

	const draggableColumnIds = useMemo(() => {
		const { draggable } = partitionColumns(orderedColumns);
		return draggable.map((column, index) => getColumnDragId(column, index));
	}, [orderedColumns]);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { distance: 1 },
		}),
	);

	const handleDragOver = ({ active, over }: DragOverEvent) => {
		const { draggable } = partitionColumns(orderedColumns);
		const draggableWithIds = draggable.map((column, index) => ({
			id: getColumnDragId(column, index),
		}));
		const activeIndex = draggableWithIds.findIndex(item => item.id === active.id);
		const overIndex = draggableWithIds.findIndex(item => item.id === over?.id);

		setDragIndex({
			active: active.id,
			over: over?.id,
			direction: overIndex > activeIndex ? 'right' : 'left',
		});
	};

	const handleDragEnd = ({ active, over }: DragEndEvent) => {
		if (over && active.id !== over.id) {
			const { leftFixed, draggable, rightFixed } = partitionColumns(orderedColumns);
			const draggableWithIds = draggable.map((column, index) => ({
				column,
				id: getColumnDragId(column, index),
			}));
			const activeIndex = draggableWithIds.findIndex(item => item.id === active.id);
			const overIndex = draggableWithIds.findIndex(item => item.id === over.id);

			if (activeIndex !== -1 && overIndex !== -1) {
				const nextDraggable = arrayMove(draggable, activeIndex, overIndex);
				const nextColumns = mergeColumns(leftFixed, nextDraggable, rightFixed);
				setColumnOrder(nextColumns.map((column, index) => getColumnDragId(column, index)));
				onColumnsOrderChange?.(nextColumns);
			}
		}

		setDragIndex({ active: -1, over: -1 });
	};

	const activeColumnTitle = useMemo((): ReactNode => {
		if (dragIndex.active === -1) return null;

		const matchedColumn = columnsWithDragMeta.find(
			(column, index) => getColumnDragId(column, index) === dragIndex.active,
		);

		if (!matchedColumn) return null;

		const { title } = matchedColumn;
		if (typeof title === 'function') {
			return String(matchedColumn.key ?? dragIndex.active);
		}

		return title ?? (matchedColumn.key != null ? String(matchedColumn.key) : null);
	}, [columnsWithDragMeta, dragIndex.active]);

	return {
		columnsWithDragMeta,
		dragIndex,
		draggableColumnIds,
		sensors,
		handleDragOver,
		handleDragEnd,
		activeColumnTitle,
	};
};

export const createBaseHeaderCell = () =>
	forwardRef<HTMLTableCellElement, HTMLAttributes<HTMLTableCellElement>>((props, ref) => (
		<th
			ref={ref}
			{...props}
			style={{
				...props.style,
				background: '#EEF1F3',
				color: 'black',
				fontSize: '12px',
				height: '42px',
				padding: '4px 8px',
			}}
		/>
	));

export const createBaseBodyCell = () =>
	forwardRef<HTMLTableCellElement, HTMLAttributes<HTMLTableCellElement>>((props, ref) => (
		<td
			ref={ref}
			{...props}
			style={{
				...props.style,
				color: 'black',
				fontSize: '12px',
				height: '30px',
				lineHeight: '18px',
				padding: '4px 8px',
			}}
		/>
	));

export const createDragTableHeaderCell = (
	BaseHeaderCell: ReturnType<typeof createBaseHeaderCell>,
) => {
	const DragHeaderCell = forwardRef<HTMLTableCellElement, DragCellProps>((props, ref) => {
		const dragState = useContext(DragIndexContext);
		const { id, draggable, style, ...rest } = props;

		if (!draggable || !id) {
			return <BaseHeaderCell ref={ref} {...rest} style={style} />;
		}

		const { attributes, listeners, setNodeRef, isDragging } = useSortable({ id });
		const mergedRef = (node: HTMLTableCellElement | null) => {
			setNodeRef(node);
			if (typeof ref === 'function') ref(node);
			else if (ref) ref.current = node;
		};

		return (
			<BaseHeaderCell
				ref={mergedRef}
				{...rest}
				{...attributes}
				{...listeners}
				style={{
					...style,
					cursor: 'move',
					...(isDragging ? { position: 'relative', zIndex: 9999, userSelect: 'none' } : {}),
					...dragActiveStyle(dragState, id),
				}}
			/>
		);
	});

	DragHeaderCell.displayName = 'DragHeaderCell';
	return DragHeaderCell;
};

export const createDragTableBodyCell = (BaseBodyCell: ReturnType<typeof createBaseBodyCell>) => {
	const DragBodyCell = forwardRef<HTMLTableCellElement, DragCellProps>((props, ref) => {
		const dragState = useContext(DragIndexContext);
		const { id, style, ...rest } = props;

		return (
			<BaseBodyCell
				ref={ref}
				{...rest}
				style={{
					...style,
					...dragActiveStyle(dragState, id),
				}}
			/>
		);
	});

	DragBodyCell.displayName = 'DragBodyCell';
	return DragBodyCell;
};

interface TableColumnDragProviderProps {
	enabled: boolean;
	dragIndex: DragIndexState;
	draggableColumnIds: string[];
	sensors: ReturnType<typeof useSensors>;
	onDragEnd: (event: DragEndEvent) => void;
	onDragOver: (event: DragOverEvent) => void;
	activeColumnTitle: ReactNode;
	children: ReactNode;
}

export const TableColumnDragProvider = ({
	enabled,
	dragIndex,
	draggableColumnIds,
	sensors,
	onDragEnd,
	onDragOver,
	activeColumnTitle,
	children,
}: TableColumnDragProviderProps) => {
	if (!enabled) return <>{children}</>;

	return (
		<DndContext
			sensors={sensors}
			modifiers={[restrictToHorizontalAxis]}
			onDragEnd={onDragEnd}
			onDragOver={onDragOver}
			collisionDetection={closestCenter}
		>
			<SortableContext items={draggableColumnIds} strategy={horizontalListSortingStrategy}>
				<DragIndexContext.Provider value={dragIndex}>{children}</DragIndexContext.Provider>
			</SortableContext>
			<DragOverlay dropAnimation={null}>
				{dragIndex.active !== -1 ? (
					<div className="itsa-table-column-drag-overlay">{activeColumnTitle}</div>
				) : null}
			</DragOverlay>
		</DndContext>
	);
};
