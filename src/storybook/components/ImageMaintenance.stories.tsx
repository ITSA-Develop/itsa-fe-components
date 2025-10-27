import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../components/Button';
import { ResponsiveModalProvider } from '../../HOC/ResponsiveModalProvider';
import { useModalResponsive } from '../../hooks/useModalResponsive';
import { ImageMaintenance } from '../../components/ImageMaintenance';

const meta: Meta = {
    title: 'Components/ImageMaintenance',
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Gestor de imagen para cargar, actualizar o eliminar una imagen. Este ejemplo usa el hook useModalResponsive para abrirlo dentro de un modal responsivo.',
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

const Demo = () => {
    const { openModal } = useModalResponsive();

    const handleOpen = () =>
        openModal({
            title: 'Gestión de Imagen',
            height: 'auto',
            content: (
                <div className="p-4">
                    <ImageMaintenance
                        imageUrl={null}
                        onUpload={(file) => console.log('upload', file)}
                        onUpdate={(file) => console.log('update', file)}
                        onDelete={() => console.log('delete')}
                    />
                </div>
            ),
        });

    return (
        <div style={{ padding: 16 }}>
            <Button label="Abrir gestor de imagen" onClick={handleOpen} />
        </div>
    );
};

export const Default: Story = {
    render: () => (
        <ResponsiveModalProvider>
            <Demo />
        </ResponsiveModalProvider>
    ),
};


