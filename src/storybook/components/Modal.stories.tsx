import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal/Modal';
import { useModalResponsive } from '../../hooks/useModalResponsive';

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

