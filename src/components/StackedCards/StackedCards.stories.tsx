import type { Meta, StoryObj } from '@storybook/react';
import { StackedCards } from '.';

const meta: Meta<typeof StackedCards> = {
	title: 'Components/StackedCards',
	component: StackedCards,
	parameters: {
		layout: 'fullscreen',
	},
};

export default meta;
type Story = StoryObj<typeof StackedCards>;

export const Default: Story = {};

export const CustomCards: Story = {
	render: () => (
		<div className="p-8">
			<StackedCards
				className="w-full"
				height={120}
				maxWidth={340}
				showFooterControls
				stackDirection="upLeft"
				maxVisible={3}
				cards={[
					{
						id: 1,
						title: 'Primera tarjeta',
						buttonTitle: 'Acción',
						onButtonClick: () => alert('Acción en tarjeta 1'),
						typeButton: 'secondary',
						removeButtonAriaLabel: 'Quitar orden de compra',
						onRemoveClick: () => alert('Quitar orden de compra (tarjeta 1)'),
						line1: 'Primera tarjeta con contenido',
						line2: 'Link de ejemplo (texto)',
						line3: 'Detalle adicional opcional',
					},
					{
						id: 2,
						title: 'Segunda tarjeta',
						line1: 'Segunda tarjeta con contenido',
						line2: 'Segunda línea opcional',
					},
					{
						id: 3,
						title: 'Tercera tarjeta',
						line1: 'Tercera tarjeta con contenido',
						line2: 'Puedes renderizar solo texto aquí.',
					},
					{
						id: 4,
						title: 'Cuarta tarjeta',
						line1: 'Cuarta tarjeta con contenido',
						line2: 'Segunda línea',
						line3: 'Tercera línea',
					},
					{
						id: 5,
						title: 'Quinta tarjeta',
						line1: 'Quinta tarjeta con contenido',
						line2: 'Segunda línea',
					},
					{
						id: 6,
						title: 'Sexta tarjeta',
						line1: 'Sexta tarjeta con contenido',
						line2: 'Segunda línea',
						line3: 'Tercera línea',
					},
				]}
			/>
		</div>
	),
};

