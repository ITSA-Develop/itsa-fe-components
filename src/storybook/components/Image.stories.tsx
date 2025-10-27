import type { StoryObj } from '@storybook/react';
import { Image } from '../../components/Image';

const meta = {
	title: 'Components/Image',
	component: Image,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Component Image usando Ant Design.\n\n👉 [Ver documentación oficial](https://ant.design/components/Image)',
			},
		},
	},
	argTypes: {
		width: {
			control: 'text',
			description: 'Ancho. Puede ser número (px) o string CSS',
		},
		height: {
			control: 'text',
			description: 'Alto. Puede ser número (px) o string CSS',
		},
		src: {
			control: 'text',
			description: 'URL de la imagen (alias moderno)',
		},
		imgPath: {
			control: 'text',
			description: 'URL de la imagen (compatibilidad previa)',
		},
		errorLabel: {
			control: 'text',
			description: 'Contenido a mostrar si falla la carga',
		},
		onClick: { action: 'clicked' },
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ImageDefault: Story = {
	args: {
		alt: 'Image',
		width: 100,
		height: 100,
		src: 'https://raw.githubusercontent.com/tomasfqit/images-server/refs/heads/main/no-image-available-icon-vector.jpg',
	},
};

export const ImageWithStringSizes: Story = {
	args: {
		alt: 'Banner',
		width: '100%',
		height: 'auto',
		src: 'https://images.unsplash.com/photo-1506765515384-028b60a970df?q=80&w=1200',
		onClick: () => {
			console.log('clicked');
		},
		hover: true,
		hoverScale: 1.08,
	},
};

export const ImageWithOnClick: Story = {
	args: {
		alt: 'Clickable',
		width: 240,
		height: 160,
		src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800',
		hover: true,
	},
};

export const ImageErrorFallback: Story = {
	args: {
		alt: 'Error fallback',
		width: 300,
		height: 200,
		src: '',
		errorLabel: 'No image available',
	},
};
