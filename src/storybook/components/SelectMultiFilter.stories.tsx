import React, { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
    IFieldConfig,
    IFiltersSelectMultiFilter,
    SelectMultiFilterProps,
} from "../../interfaces";
import { SelectMultiFilter } from "../../components/SelectMultiFilter";

interface Product {
    code: string;
    description: string;
    value: string;
}

interface Customer {
    identification: string | null;
    names: string | null;
    lastNames: string | null;
}

interface Company {
    identification: string | null;
    socialReason: string | null;
}

const productFields: IFieldConfig<Product>[] = [
    { key: "code", label: "Código", placeholder: "Ingrese el código" },
    {
        key: "description",
        label: "Descripción",
        placeholder: "Ingrese la descripción",
    },
    { key: "value", label: "Valor", placeholder: "Ingrese el valor" },
];

const sampleProducts: Product[] = [
    { code: "001", description: "Producto alimenticio", value: "ALM-001" },
    { code: "002", description: "Producto de limpieza", value: "LIM-002" },
    { code: "003", description: "Producto electrónico", value: "ELE-003" },
    { code: "004", description: "Producto textil", value: "TEX-004" },
    { code: "005", description: "Producto farmacéutico", value: "FAR-005" },
];

const sampleCustomers: Customer[] = [
    {
        identification: "0102030405",
        names: "Ana María",
        lastNames: "Paredes López",
    },
    {
        identification: "0912345678",
        names: "Carlos",
        lastNames: "Mendoza Ruiz",
    },
];

const sampleCompanies: Company[] = [
    {
        identification: "1790012345001",
        socialReason: "Servicios Andinos S.A.",
    },
    {
        identification: "0991234567001",
        socialReason: "Comercial del Pacífico Cía. Ltda.",
    },
];

const filterData = <T extends object>(
    data: T[],
    fields: IFieldConfig<T>[],
    filters: IFiltersSelectMultiFilter,
) =>
    data.filter((item) =>
        fields
            .filter((field) => field.visible !== false)
            .every((field) =>
                String(item[field.key] ?? "")
                    .toLowerCase()
                    .includes((filters[field.key] ?? "").toLowerCase()),
            ),
    );

const SelectMultiFilterDemo = <T extends object>({
    data,
    fields,
    valueKey,
    ...rest
}: SelectMultiFilterProps<T>) => {
    const [filters, setFilters] = useState<IFiltersSelectMultiFilter>({});
    const [selected, setSelected] = useState<T | null>(null);

    const filteredData = useMemo(
        () => filterData(data, fields, filters),
        [data, fields, filters],
    );

    return (
        <div style={{ width: 600, minHeight: 320 }}>
            <SelectMultiFilter
                {...rest}
                data={filteredData}
                fields={fields}
                valueKey={valueKey}
                value={selected}
                onFiltersChange={setFilters}
                onSelect={setSelected}
                onClear={() => setSelected(null)}
            />
            <div
                style={{
                    marginTop: 24,
                    padding: 12,
                    backgroundColor: "#f5f5f5",
                    borderRadius: 4,
                    fontSize: 12,
                }}
            >
                <div>
                    <strong>Filtros:</strong> {JSON.stringify(filters)}
                </div>
                <div style={{ marginTop: 4 }}>
                    <strong>Seleccionado:</strong>{" "}
                    {selected ? JSON.stringify(selected) : "Ninguno"}
                </div>
            </div>
        </div>
    );
};

const meta = {
    title: "components/SelectMultiFilter",
    component: SelectMultiFilter,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "Selector genérico cuyas columnas y filtros se configuran mediante fields.",
            },
        },
    },
    argTypes: {
        loading: { control: "boolean" },
        allowClear: { control: "boolean" },
        filtersDebounceMs: { control: "number" },
        placeholder: { control: "text" },
    },
} satisfies Meta<typeof SelectMultiFilter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Products: Story = {
    name: "Productos",
    render: () => (
        <SelectMultiFilterDemo
            data={sampleProducts}
            fields={productFields}
            valueKey="code"
        />
    ),
};

export const Customers: Story = {
    name: "Personas",
    render: () => (
        <SelectMultiFilterDemo
            data={sampleCustomers}
            valueKey="identification"
            fields={[
                {
                    key: "identification",
                    label: "Identificación",
                    placeholder: "Ingrese identificación",
                },
                {
                    key: "names",
                    label: "Nombres",
                    placeholder: "Ingrese nombres",
                },
                {
                    key: "lastNames",
                    label: "Apellidos",
                    placeholder: "Ingrese apellidos",
                },
            ]}
        />
    ),
};

export const Companies: Story = {
    name: "Empresas",
    render: () => (
        <SelectMultiFilterDemo
            data={sampleCompanies}
            valueKey="identification"
            fields={[
                {
                    key: "identification",
                    label: "RUC",
                    placeholder: "Ingrese RUC",
                },
                {
                    key: "socialReason",
                    label: "Razón social",
                    placeholder: "Ingrese razón social",
                },
            ]}
        />
    ),
};

export const Loading: Story = {
    name: "Cargando",
    render: () => (
        <SelectMultiFilterDemo
            data={sampleProducts}
            fields={productFields}
            valueKey="code"
            loading
        />
    ),
};

export const EmptyResults: Story = {
    name: "Sin resultados",
    render: () => (
        <SelectMultiFilterDemo
            data={[] as Product[]}
            fields={productFields}
            valueKey="code"
        />
    ),
};
