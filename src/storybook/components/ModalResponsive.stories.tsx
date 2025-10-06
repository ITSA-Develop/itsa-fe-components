import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ModalResponsive } from '../../components/ModalResponsive';
import { Button } from '../../components/Button';
import { CustomFooterModal } from '../../components/CustomFooterModal';
import { FormLabelError } from '../../components/FormLabelError';
import { Input } from 'antd';

const meta: Meta = {
	title: 'Components/ModalResponsive',
	component: ModalResponsive,
	tags: ['autodocs'],
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


