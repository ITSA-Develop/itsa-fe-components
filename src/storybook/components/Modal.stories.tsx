import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../../components/Button';
import { ButtonAntd } from '../../components/ButtonAntd';
import { Modal } from '../../components/Modal/Modal';
import { useModalResponsive } from '../../hooks/useModalResponsive';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const meta: Meta = {
	title: 'Components/Modal',
	component: Modal,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Component Modal usando Ant Design.\n\n👉 [Ver documentación oficial](https://ant.design/components/Modal)',
			},
		},
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
	render: () => {
		const { openModal, closeModal } = useModalResponsive();

		const showModal = () => {
			openModal({
				title: 'Title',
				content: <div>Content height 50vh</div>,
				height: '50vh',
			});
		};



		const ModalHistory = () => {
			return (
				<div>
					<Button type="primary" label="Open Modal with async logic" onClick={showModal}/>
				</div>
			);
		};

		return <ModalHistory />;
	},
};


export const WithDocumentation: Story = {
	args: {},
	parameters: {
		docs: {
			description: {
				story:
					'Aquí puedes colocar la documentación específica de este caso de uso del Modal. Explica props, comportamiento y consideraciones.',
			},
		},
	},
	render: () => {
		const { openModal } = useModalResponsive();

		const showAnotherModal = () => {
			openModal({
				title: 'Otro título',
				content: <div style={{ padding: 16 }}>Contenido height 70vh</div>,
				height: '70vh',
				
			});
		};

		const ModalDocsExample = () => {
			return (
				<div className="flex justify-center items-center h-[50vh]">
					<Button type="secondary" label="Abrir otro modal" onClick={showAnotherModal} />
				</div>
			);
		};

		return <ModalDocsExample />;
	},
};

export const WithExtraHeaderButtons: Story = {
	args: {},
	parameters: {
		docs: {
			description: {
				story:
					'Modal con botones adicionales en el header usando la prop `extraHeaderButtons`. Puedes añadir botones de impresión, descarga u otras acciones.',
			},
		},
	},
	render: () => {
		const { openModal } = useModalResponsive();

		const showModalWithHeaderButtons = () => {
			openModal({
				title: 'Modal con botones en header esto es una prueb para ver ',
				content: (
					<div style={{ padding: 16 }}>
						<h3>Contenido del modal</h3>
						<p>Este modal tiene botones adicionales en el header.</p>
						<p>Puedes usar estos botones para acciones rápidas como cerrar, editar, eliminar, etc.</p>
					</div>
				),
				height: '60vh',
				extraHeaderButtons: [
					{
						icon: <DeleteOutlined />,
						onClick: () => console.log('Imprimir'),
					},
					{
						icon: <EditOutlined />,
						onClick: () => console.log('Descargar'),
					}
				],
			});
		};

		const ModalWithButtonsExample = () => {
			return (
				<div className="flex justify-center items-center h-[50vh]">
					<Button type="primary" label="Abrir modal con botones en header" onClick={showModalWithHeaderButtons} />
				</div>
			);
		};

		return <ModalWithButtonsExample />;
	},
};

