import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from '../../components/Carousel';
import { SAMPLE_CAROUSEL_IMAGES } from '../../constants';
import { useState } from 'react';

const meta: Meta<typeof Carousel.Root> = {
	title: 'Components/Carousel',
	component: Carousel.Root,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'Componente Carousel para mostrar imágenes en un carrusel con navegación, indicadores y auto-play opcional.',
			},
		},
	},
	argTypes: {
		autoPlay: {
			control: 'boolean',
			description: 'Activa el auto-play del carrusel',
			defaultValue: false,
		},
		autoPlayInterval: {
			control: 'number',
			description: 'Intervalo en milisegundos para el auto-play',
			defaultValue: 3000,
		},
		loop: {
			control: 'boolean',
			description: 'Permite loop infinito del carrusel',
			defaultValue: true,
		},
		defaultIndex: {
			control: 'number',
			description: 'Índice inicial del carrusel',
			defaultValue: 0,
		},
	},
};

export default meta;
type Story = StoryObj<typeof Carousel.Root>;

export const Default: Story = {
	render: () => (
		<div className="w-[800px]">
			<Carousel.Root>
				<Carousel.Content aspectRatio="16/9">
					{SAMPLE_CAROUSEL_IMAGES.map((image, index) => (
						<Carousel.Item key={index}>
							<Carousel.Image src={image.src} alt={image.alt} objectFit="cover" />
						</Carousel.Item>
					))}
				</Carousel.Content>
				<Carousel.PrevButton variant="overlay" />
				<Carousel.NextButton variant="overlay" />
				<Carousel.Indicators variant="dots" position="bottom" />
			</Carousel.Root>
		</div>
	),
};

export const WithAutoPlay: Story = {
	render: () => (
		<div className="w-[800px]">
			<Carousel.Root autoPlay autoPlayInterval={3000} loop>
				<Carousel.Content aspectRatio="16/9">
					{SAMPLE_CAROUSEL_IMAGES.map((image, index) => (
						<Carousel.Item key={index}>
							<Carousel.Image src={image.src} alt={image.alt} objectFit="cover" />
						</Carousel.Item>
					))}
				</Carousel.Content>
				<Carousel.PrevButton variant="overlay" />
				<Carousel.NextButton variant="overlay" />
				<Carousel.Indicators variant="dots" position="bottom" />
			</Carousel.Root>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Carrusel con auto-play activado cada 3 segundos.',
			},
		},
	},
};

export const WithLineIndicators: Story = {
	render: () => (
		<div className="w-[800px]">
			<Carousel.Root>
				<Carousel.Content aspectRatio="16/9">
					{SAMPLE_CAROUSEL_IMAGES.map((image, index) => (
						<Carousel.Item key={index}>
							<Carousel.Image src={image.src} alt={image.alt} objectFit="cover" />
						</Carousel.Item>
					))}
				</Carousel.Content>
				<Carousel.PrevButton variant="overlay" />
				<Carousel.NextButton variant="overlay" />
				<Carousel.Indicators variant="lines" position="bottom" />
			</Carousel.Root>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Carrusel con indicadores en forma de líneas en lugar de puntos.',
			},
		},
	},
};

export const NoLoop: Story = {
	render: () => (
		<div className="w-[800px]">
			<Carousel.Root loop={false}>
				<Carousel.Content aspectRatio="16/9">
					{SAMPLE_CAROUSEL_IMAGES.map((image, index) => (
						<Carousel.Item key={index}>
							<Carousel.Image src={image.src} alt={image.alt} objectFit="cover" />
						</Carousel.Item>
					))}
				</Carousel.Content>
				<Carousel.PrevButton variant="overlay" />
				<Carousel.NextButton variant="overlay" />
				<Carousel.Indicators variant="dots" position="bottom" />
			</Carousel.Root>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Carrusel sin loop - los botones se deshabilitan al llegar al inicio/final.',
			},
		},
	},
};

export const CustomAspectRatio: Story = {
	render: () => (
		<div className="w-[600px]">
			<Carousel.Root>
				<Carousel.Content aspectRatio="4/3">
					{SAMPLE_CAROUSEL_IMAGES.map((image, index) => (
						<Carousel.Item key={index}>
							<Carousel.Image src={image.src} alt={image.alt} objectFit="cover" />
						</Carousel.Item>
					))}
				</Carousel.Content>
				<Carousel.PrevButton variant="overlay" />
				<Carousel.NextButton variant="overlay" />
				<Carousel.Indicators variant="dots" position="bottom" />
			</Carousel.Root>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Carrusel con aspect ratio 4:3 personalizado.',
			},
		},
	},
};

export const WithOnChange: Story = {
	render: () => {
		const [current, setCurrent] = useState(0);
		return (
			<div className="w-[800px]">
				<div className="mb-4 text-center">
					<span className="text-gray-700 font-medium">
						Imagen actual: {current + 1} de {SAMPLE_CAROUSEL_IMAGES.length}
					</span>
				</div>
				<Carousel.Root onChange={setCurrent}>
					<Carousel.Content aspectRatio="16/9">
						{SAMPLE_CAROUSEL_IMAGES.map((image, index) => (
							<Carousel.Item key={index}>
								<Carousel.Image src={image.src} alt={image.alt} objectFit="cover" />
							</Carousel.Item>
						))}
					</Carousel.Content>
					<Carousel.PrevButton variant="overlay" />
					<Carousel.NextButton variant="overlay" />
					<Carousel.Indicators variant="dots" position="bottom" />
				</Carousel.Root>
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story: 'Carrusel con callback onChange para controlar el índice actual externamente.',
			},
		},
	},
};

export const ObjectFitContain: Story = {
	render: () => (
		<div className="w-[800px]">
			<Carousel.Root>
				<Carousel.Content aspectRatio="16/9">
					{SAMPLE_CAROUSEL_IMAGES.map((image, index) => (
						<Carousel.Item key={index}>
							<div className="bg-gray-100 w-full h-full">
								<Carousel.Image src={image.src} alt={image.alt} objectFit="contain" />
							</div>
						</Carousel.Item>
					))}
				</Carousel.Content>
				<Carousel.PrevButton variant="overlay" />
				<Carousel.NextButton variant="overlay" />
				<Carousel.Indicators variant="dots" position="bottom" />
			</Carousel.Root>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Carrusel con objectFit="contain" para mostrar la imagen completa sin recortar.',
			},
		},
	},
};

export const MinimalControls: Story = {
	render: () => (
		<div className="w-[800px]">
			<Carousel.Root autoPlay loop>
				<Carousel.Content aspectRatio="16/9">
					{SAMPLE_CAROUSEL_IMAGES.map((image, index) => (
						<Carousel.Item key={index}>
							<Carousel.Image src={image.src} alt={image.alt} objectFit="cover" />
						</Carousel.Item>
					))}
				</Carousel.Content>
				<Carousel.Indicators variant="dots" position="bottom" />
			</Carousel.Root>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Carrusel minimalista sin botones de navegación, solo indicadores y auto-play.',
			},
		},
	},
};

export const CustomImageStyles: Story = {
	render: () => (
		<div className="w-[800px]">
			<Carousel.Root>
				<Carousel.Content aspectRatio="16/9" className="overflow-hidden">
					{SAMPLE_CAROUSEL_IMAGES.map((image, index) => (
						<Carousel.Item key={index} className="flex">
								<Carousel.Image
									src={image.src}
									alt={image.alt}
									className="object-cover shadow-2xl border-4 border-white  rounded-2xl "
								/>
						</Carousel.Item>
					))}
				</Carousel.Content>

				<Carousel.PrevButton variant="overlay" />
				<Carousel.NextButton variant="overlay" />
				<Carousel.Indicators variant="dots" position="bottom" />
			</Carousel.Root>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Carrusel con estilos personalizados en las imágenes, incluyendo sombras y bordes redondeados.',
			},
		},
	},
};
