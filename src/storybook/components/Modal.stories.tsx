import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';

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
		const [open, setOpen] = useState(false);
		const [confirmLoading, setConfirmLoading] = useState(false);

		const showModal = () => {
			setOpen(true);
		};

		const handleOk = () => {
			setConfirmLoading(true);
			setTimeout(() => {
				setOpen(false);
				setConfirmLoading(false);
			}, 2000);
		};

		const handleCancel = () => {
			console.log('Clicked cancel button');
			setOpen(false);
		};
		const ModalHistory = () => {
			return (
				<div>
					<Button type="primary" onClick={showModal}>
						Open Modal with async logic
					</Button>
					<Modal
						title="Title"
						open={open}
						confirmLoading={confirmLoading}
						onOk={handleOk}
						onCancel={handleCancel}
					></Modal>
				</div>
			);
		};

		return <ModalHistory />;
	},
};
