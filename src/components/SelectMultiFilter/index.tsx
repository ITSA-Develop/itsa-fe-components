import { IFiltersSelectMultiFilter, SelectMultiFilterProps } from "@/interfaces";
import { useDebouncedCallback } from "@/hooks";
import { CloseCircleFilled } from "@ant-design/icons";
import { Input, Spin, Empty } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";

const inputCompactStyle: React.CSSProperties = {
    height: "27px",
    lineHeight: "18px",
    padding: "4px 8px",
    fontSize: "13px",
};

const getListGridClass = (showColumnValue: boolean) =>
    showColumnValue
        ? "grid-cols-[minmax(140px,38%)_minmax(0,1fr)_72px]"
        : "grid-cols-[minmax(140px,45%)_minmax(0,1fr)]";

const getFilterGridClass = (visibleFilters: number) => {
    if (visibleFilters <= 1) return "grid-cols-1";
    if (visibleFilters === 2) return "grid-cols-2";
    return "grid-cols-1 sm:grid-cols-3";
};

const FilterField = ({
    label,
    placeholder,
    value,
    onChange,
}: {
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}) => (
    <div className="flex min-w-0 flex-col gap-0.5">
        <small className="truncate text-[11px] font-bold text-gray-600">
            {label}
        </small>
        <Input
            size="small"
            value={value}
            placeholder={placeholder}
            style={inputCompactStyle}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);

export const SelectMultiFilter = ({
    data,
    loading = false,
    value,

    labelInputCode = "Código",
    placeholderInputCode = "Ingrese el código",

    labelInputDescription = "Descripción",
    placeholderInputDescription = "Ingrese la descripción",

    labelInputName = "Valor",
    placeholderInputName = "Ingrese el valor",

    showFilterCode = true,
    showFilterDescription = true,
    showFilterValue = false,
    showColumnValue = false,

    allowClear = true,
    filtersDebounceMs = 500,

    onFiltersChange,
    onSelect,
    onClear,
}: SelectMultiFilterProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState(false);

    const [filters, setFilters] = useState<IFiltersSelectMultiFilter>({
        code: "",
        description: "",
        value: "",
    });

    const { debouncedCallback: notifyFiltersChange } = useDebouncedCallback(
        (nextFilters: IFiltersSelectMultiFilter) => {
            onFiltersChange?.(nextFilters);
        },
        filtersDebounceMs,
    );

    const listGridClass = getListGridClass(showColumnValue);
    const visibleFilters = [
        showFilterCode,
        showFilterDescription,
        showFilterValue,
    ].filter(Boolean).length;
    const filterGridClass = getFilterGridClass(visibleFilters);

    type FilterFieldConfig = {
        key: keyof IFiltersSelectMultiFilter;
        label: string;
        placeholder: string;
        value: string;
    };

    const filterFields = useMemo(() => {
        const fields: FilterFieldConfig[] = [];

        if (showFilterCode) {
            fields.push({
                key: "code",
                label: labelInputCode,
                placeholder: placeholderInputCode,
                value: filters.code,
            });
        }

        if (showFilterDescription) {
            fields.push({
                key: "description",
                label: labelInputDescription,
                placeholder: placeholderInputDescription,
                value: filters.description,
            });
        }

        if (showFilterValue) {
            fields.push({
                key: "value",
                label: labelInputName,
                placeholder: placeholderInputName,
                value: filters.value,
            });
        }

        return fields;
    }, [
        showFilterCode,
        showFilterDescription,
        showFilterValue,
        labelInputCode,
        placeholderInputCode,
        labelInputDescription,
        placeholderInputDescription,
        labelInputName,
        placeholderInputName,
        filters,
    ]);

    const updateFilter = (
        field: keyof IFiltersSelectMultiFilter,
        nextValue: string,
    ) => {
        const newFilters = {
            ...filters,
            [field]: nextValue,
        };

        setFilters(newFilters);
        notifyFiltersChange(newFilters);
    };

    const handleClear = (event: React.MouseEvent) => {
        event.stopPropagation();
        onClear?.();
    };

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", listener);

        return () => document.removeEventListener("mousedown", listener);
    }, []);

    return (
        <div ref={containerRef} className="relative w-full text-sm">
            <div
                className="flex min-h-[32px] cursor-pointer items-center rounded-md border border-gray-300 bg-white px-2.5 py-1 transition-colors hover:border-primary-400"
                onClick={() => setOpen((prev) => !prev)}
            >
                {value ? (
                    <div className="flex min-w-0 flex-1 items-center gap-2 text-[13px]">
                        <span className="shrink-0 font-medium text-gray-900">
                            {value.code}
                        </span>
                        <span className="hidden h-3 w-px shrink-0 bg-gray-300 sm:block" />
                        <span className="min-w-0 truncate text-gray-500">
                            {value.description}
                        </span>
                        {showColumnValue && (
                            <span className="ml-auto hidden shrink-0 text-[11px] text-gray-400 md:inline">
                                {value.value}
                            </span>
                        )}
                    </div>
                ) : (
                    <span className="text-[13px] text-gray-400">
                        Seleccione un registro...
                    </span>
                )}

                {allowClear && value && (
                    <button
                        type="button"
                        aria-label="Limpiar selección"
                        className="ml-2 flex shrink-0 items-center text-gray-400 transition-colors hover:text-gray-600"
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={handleClear}
                    >
                        <CloseCircleFilled className="text-xs" />
                    </button>
                )}
            </div>

            {open && (
                <div
                    className="absolute z-50 mt-1 w-full overflow-hidden rounded-md border border-gray-300 bg-white shadow-lg"
                    onMouseDown={(e) => e.stopPropagation()}
                >
                    {visibleFilters > 0 && (
                        <div
                            className={`grid ${filterGridClass} gap-2 border-b border-gray-200 bg-gray-50 p-2`}
                        >
                            {filterFields.map((field) => (
                                <FilterField
                                    key={field.key}
                                    label={field.label}
                                    placeholder={field.placeholder}
                                    value={field.value}
                                    onChange={(nextValue) =>
                                        updateFilter(field.key, nextValue)
                                    }
                                />
                            ))}
                        </div>
                    )}

                    <div
                        className={`grid ${listGridClass} gap-2 border-b border-gray-200 bg-gray-100 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-gray-500`}
                    >
                        <span>{labelInputCode}</span>
                        <span>{labelInputDescription}</span>
                        {showColumnValue && (
                            <span className="text-right">{labelInputName}</span>
                        )}
                    </div>

                    <div className="max-h-44 overflow-y-auto">
                        {loading && (
                            <div className="flex justify-center py-4">
                                <Spin size="small" />
                            </div>
                        )}

                        {!loading && data.length === 0 && (
                            <div className="py-3">
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    description={
                                        <span className="text-xs text-gray-400">
                                            Sin resultados
                                        </span>
                                    }
                                />
                            </div>
                        )}

                        {!loading &&
                            data.map((item) => {
                                const isSelected = value?.value === item.value;

                                return (
                                    <div
                                        key={item.value}
                                        className={`grid cursor-pointer ${listGridClass} gap-2 border-b border-gray-100 px-2.5 py-1.5 text-[13px] transition-colors last:border-b-0 hover:bg-blue-50 ${
                                            isSelected
                                                ? "bg-blue-50/70"
                                                : "bg-white"
                                        }`}
                                        onClick={() => {
                                            onSelect?.(item);
                                            setOpen(false);
                                        }}
                                    >
                                        <span className="truncate font-bold text-gray-900">
                                            {item.code}
                                        </span>
                                        <span className="truncate font-bold text-gray-600">
                                            {item.description}
                                        </span>
                                        {showColumnValue && (
                                            <span className="truncate text-right text-[11px] text-gray-400">
                                                {item.value}
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                </div>
            )}
        </div>
    );
};
