import type { DragEndEvent } from '@dnd-kit/core';
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
	arrayMove,
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
	forwardRef,
	useCallback,
	useMemo,
	type CSSProperties,
	type HTMLAttributes,
	type Key,
	type ReactNode,
} from 'react';
import { getRecordKey } from '@/components/Table/Table.helpers';

type RowKey<T extends object> = Extract<keyof T, string> | ((record: T) => Key);

interface RowProps extends HTMLAttributes<HTMLTableRowElement> {
	'data-row-key'?: string;
}

const POINTER_ACTIVATION_DISTANCE = 8;

export const createSortableTableRow = (enabled: boolean) => {
	const SortableRow = forwardRef<HTMLTableRowElement, RowProps>((props, ref) => {
		if (!enabled) {
			return <tr {...props} ref={ref} />;
		}

		const id = props['data-row-key'];
		if (id == null || id === '') {
			return <tr {...props} ref={ref} />;
		}

		const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
			id: String(id),
		});

		const setRefs = (node: HTMLTableRowElement | null) => {
			setNodeRef(node);
			if (typeof ref === 'function') ref(node);
			else if (ref) ref.current = node;
		};

		const style: CSSProperties = {
			...props.style,
			transform: CSS.Translate.toString(transform),
			transition,
			cursor: 'move',
			...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
		};

		return <tr {...props} ref={setRefs} style={style} {...attributes} {...listeners} />;
	});

	SortableRow.displayName = 'SortableTableRow';
	return SortableRow;
};

interface UseTableRowDragParams<T extends object> {
	data: T[];
	rowKey: RowKey<T>;
	enabled: boolean;
	onDataOrderChange?: (data: T[]) => void;
}

export const useTableRowDrag = <T extends object>({
	data,
	rowKey,
	enabled,
	onDataOrderChange,
}: UseTableRowDragParams<T>) => {
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { distance: POINTER_ACTIVATION_DISTANCE },
		}),
	);

	const sortableRowIds = useMemo(
		() =>
			data
				.map(record => getRecordKey(record, rowKey))
				.filter((key): key is Key => key != null)
				.map(key => String(key)),
		[data, rowKey],
	);

	const onDragEnd = useCallback(
		({ active, over }: DragEndEvent) => {
			if (!enabled || !onDataOrderChange || over == null || active.id === over.id) return;

			const activeId = String(active.id);
			const overId = String(over.id);
			const activeIndex = data.findIndex(record => String(getRecordKey(record, rowKey)) === activeId);
			const overIndex = data.findIndex(record => String(getRecordKey(record, rowKey)) === overId);
			if (activeIndex < 0 || overIndex < 0) return;

			onDataOrderChange(arrayMove(data, activeIndex, overIndex));
		},
		[data, rowKey, enabled, onDataOrderChange],
	);

	const SortableRow = useMemo(() => createSortableTableRow(enabled), [enabled]);

	return { sensors, onDragEnd, sortableRowIds, SortableRow };
};

interface TableRowDragProviderProps {
	enabled: boolean;
	sensors: ReturnType<typeof useSensors>;
	sortableRowIds: string[];
	onDragEnd: (event: DragEndEvent) => void;
	children: ReactNode;
}

export const TableRowDragProvider = ({
	enabled,
	sensors,
	sortableRowIds,
	onDragEnd,
	children,
}: TableRowDragProviderProps) => {
	if (!enabled) return <>{children}</>;

	return (
		<DndContext
			sensors={sensors}
			modifiers={[restrictToVerticalAxis]}
			onDragEnd={onDragEnd}
			collisionDetection={closestCenter}
		>
			<SortableContext items={sortableRowIds} strategy={verticalListSortingStrategy}>
				{children}
			</SortableContext>
		</DndContext>
	);
};