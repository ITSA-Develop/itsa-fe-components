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
	const { openModal,closeModal, beforeClose } = useModalResponsive();

	const handleCloseModal = () => {
		beforeClose?.(()=>{
			console.log('afterClose callback');
		});
		closeModal();
	};

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
								<Button label="Cerrar modal" onClick={handleCloseModal} />
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

const DemoContentWithAfterClose = () => {
    const { openModal, setBeforeClose } = useModalResponsive();
    return (
        <div style={{ display: 'flex', gap: 12 }}>
            <Button
                label="Abrir modal (X dispara callback)"
                onClick={() => {
                    setBeforeClose(() => () => alert('Close icon callback'));
                    openModal({
                        title: 'Modal con callback',
                        content: (
                            <div style={{ padding: 16 }}>
                                <FormLabelError label="Haz clic en la X para ejecutar callback" />
                            </div>
                        ),
                    });
                }}
            />
        </div>
    );
};

export const WithAfterClose: Story = {
    render: () => (
        <ResponsiveModalProvider>
            <DemoContentWithAfterClose />
        </ResponsiveModalProvider>
    ),
};