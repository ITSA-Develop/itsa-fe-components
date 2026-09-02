import React, { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ModalResponsive } from '../../components/ModalResponsive';
import { Button } from '../../components/Button';
import { CustomFooterModal } from '../../components/CustomFooterModal';
import { FormLabelError } from '../../components/FormLabelError';
import { Input } from 'antd';
import { ControlActionsProvider } from '../../HOC/ControlActions';
import { Table } from '../../components/Table';
import { FilterInput } from '../../components/FilterInput';
import { useTable } from '../../hooks/useTable/useTable';
import { TStrictTableColumnsType } from '../../types';

const meta: Meta = {
	title: 'Components/ModalResponsive',
	component: ModalResponsive,
	tags: ['autodocs'],
	decorators: [
		Story => (
			<ControlActionsProvider fnApiValidatePermissionAction={async () => true}>
				<Story />
			</ControlActionsProvider>
		),
	],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Modal responsivo basado en Ant Design con cálculo automático de ancho por breakpoint.',
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		const [open, setOpen] = useState(false);

		const handleOk = () => setOpen(false);
		const handleCancel = () => setOpen(false);

		return (
			<div style={{ padding: 16 }}>
				<Button label="Abrir modal" onClick={() => setOpen(true)} />
				<ModalResponsive
					title="Título"
					open={open}
					onOk={handleOk}
					onCancel={handleCancel}
					content={
						<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
							<FormLabelError label="Contenido del modal" />
							<Input placeholder="Ingrese su nombre" />
						</div>
					}
					footer={
						<CustomFooterModal onConfirm={handleOk} onCancel={handleCancel} />
					}
				/>
			</div>
		);
	},
};

export const WithCustomFooter: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Ejemplo con footer personalizado, alineado al centro y tamaño small.',
			},
		},
	},
	render: () => {
		const [open, setOpen] = useState(false);

		const handleOk = () => setOpen(false);
		const handleCancel = () => setOpen(false);

		return (
			<div style={{ padding: 16 }}>
				<Button label="Abrir modal (footer personalizado)" onClick={() => setOpen(true)} />
				<ModalResponsive
					title="Modal con Footer Personalizado"
					open={open}
					onOk={handleOk}
					onCancel={handleCancel}
					content={<div style={{ padding: 16 }}>Contenido</div>}
					footer={
						<CustomFooterModal
							align="center"
							size="small"
							confirmWidthPercent={40}
							onConfirm={handleOk}
							onCancel={handleCancel}
						/>
					}
				/>
			</div>
		);
	},
};

type IProformaItem = {
	id: number;
	code: string;
	description: string;
	brand: string;
	className: string;
};

const proformaItems: IProformaItem[] = Array.from({ length: 28 }, (_, index) => ({
	id: index + 1,
	code: `COD-${78234 + index}`,
	description: index % 2 === 0 ? 'ITEM LPH' : 'ITEM MAYORISTA',
	brand: index % 3 === 0 ? 'SAMSUNG' : 'LG',
	className: index % 2 === 0 ? 'ELECTRODOMESTICOS' : 'LINEA BLANCA',
}));

const proformaColumns: TStrictTableColumnsType<IProformaItem> = [
	{ title: 'Código', dataIndex: 'code', width: 120 },
	{ title: 'Descripción', dataIndex: 'description', width: 180 },
	{ title: 'Marca', dataIndex: 'brand', width: 120 },
	{ title: 'Clase', dataIndex: 'className', width: 180 },
	{
		title: 'Detalle',
		key: 'detail',
		width: 120,
		align: 'center',
		render: () => <Button type="secondary" label="Detalles" size="small" onClick={() => undefined} />,
	},
];

export const WithTableExample: Story = {
	parameters: {
		docs: {
			description: {
				story:
					'Ejemplo de modal con filtros y tabla. Útil para validar el alto automático de `Table` dentro de `ModalResponsive`.',
			},
		},
	},
	render: () => {
		const [open, setOpen] = useState(false);
		const [codeFilter, setCodeFilter] = useState('');
		const [descriptionFilter, setDescriptionFilter] = useState('');
		const { pagination, onChangePagination } = useTable<IProformaItem>();

		const filteredData = useMemo(
			() =>
				proformaItems.filter(item => {
					const matchesCode = item.code.toLowerCase().includes(codeFilter.toLowerCase());
					const matchesDescription = item.description.toLowerCase().includes(descriptionFilter.toLowerCase());
					return matchesCode && matchesDescription;
				}),
			[codeFilter, descriptionFilter],
		);

		const handleClose = () => setOpen(false);

		return (
			<div style={{ padding: 16 }}>
				<Button label="Abrir modal con tabla" onClick={() => setOpen(true)} />
				<ModalResponsive
					title="Detalle de Proforma"
					open={open}
					onOk={handleClose}
					onCancel={handleClose}
					height="75vh"
					hideScroll
					content={
						<div className="flex min-h-0 flex-1 flex-col gap-3">
							<div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4">
								<FilterInput title="Código" placeholder="Código" value={codeFilter} onChange={event => setCodeFilter(event.target.value)} />
								<FilterInput
									title="Descripción"
									placeholder="Descripción"
									value={descriptionFilter}
									onChange={event => setDescriptionFilter(event.target.value)}
								/>
								<FilterInput title="Marca" placeholder="Marca" />
								<FilterInput title="Clase" placeholder="Clase" />
							</div>
							<div className="min-h-0 flex-1">
								<Table<IProformaItem>
									columns={proformaColumns}
									data={filteredData}
									rowKey="id"
									loading={false}
									onChange={onChangePagination}
									paginationConfig={pagination}
									scroll={{ x: 'max-content', y: '45vh' }}
								/>
							</div>
						</div>
					}
					footer={<CustomFooterModal onConfirm={handleClose} onCancel={handleClose} confirmLabel="Guardar" />}
				/>
			</div>
		);
	},
};


