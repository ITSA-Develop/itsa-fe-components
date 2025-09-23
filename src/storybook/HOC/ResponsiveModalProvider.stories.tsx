import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../components/Button';
import { ResponsiveModalProvider } from '../../HOC/ResponsiveModalProvider';
import { useModalResponsive } from '../../hooks/useModalResponsive';
import { FormLabelError } from '../../components/FormLabelError';

const meta: Meta = {
	title: 'HOC/ResponsiveModalProvider',
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'Provider que expone un modal responsivo vía contexto. Usa el hook useModalResponsive para abrir/cerrar.',
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

const DemoContent = () => {
	const { openModal } = useModalResponsive();
	return (
		<div style={{ display: 'flex', gap: 12 }}>
			<Button
				label="Abrir modal"
				onClick={() =>
					openModal({
						title: 'Título del modal',
						content: (
							<div style={{ padding: 16 }}>
								<FormLabelError label="Contenido del modal" />
							</div>
						),
						footer: undefined,
						height: '80vh',
					})
				}
			/>
		</div>
	);
};

export const Default: Story = {
	render: () => (
		<ResponsiveModalProvider>
			<DemoContent />
		</ResponsiveModalProvider>
	),
};
