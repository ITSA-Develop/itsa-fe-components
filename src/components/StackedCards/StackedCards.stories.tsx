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
						children: (
							<div className="flex flex-col">
								<p className="text-blue-600 font-medium text-sm">Primera tarjeta con contenido</p>
								<a className="text-blue-700 underline text-sm" href="#" onClick={e => e.preventDefault()}>
									Link de ejemplo
								</a>
							</div>
						),
					},
					{
						id: 2,
						title: 'Segunda tarjeta',
						children: (
							<div className="flex flex-col">
								<p className="text-blue-600 font-medium text-sm">Segunda tarjeta con contenido</p>
								<div className="h-2 bg-gray-200 rounded-full w-4/6" />
							</div>
						),
					},
					{
						id: 3,
						title: 'Tercera tarjeta',
						children: (
							<div className="flex flex-col gap-0">
								<span className="text-blue-600 font-medium text-sm">Tercera tarjeta con contenido</span>
								<span className="text-gray-500 text-sm">Puedes renderizar cualquier JSX aquí.</span>
							</div>
						),
					},
					{
						id: 4,
						title: 'Cuarta tarjeta',
						children: (
							<div className="flex flex-col">
								<p className="text-blue-600 font-medium text-sm">Cuarta tarjeta con contenido</p>
								<a className="text-blue-700 underline text-sm" href="#" onClick={e => e.preventDefault()}>
									Link de ejemplo
								</a>
							</div>
						),
					},
					{
						id: 5,
						title: 'Quinta tarjeta',
						children: (
							<div className="flex flex-col">
								<p className="text-blue-600 font-medium text-sm">Quinta tarjeta con contenido</p>
								<div className="h-2 bg-gray-200 rounded-full w-4/6" />
							</div>
						),
					},
					{
						id: 6,
						title: 'Sexta tarjeta',
						children: (
							<div className="flex flex-col gap-0">
								<span className="text-blue-600 font-medium text-sm">Sexta tarjeta con contenido</span>
								<span className="text-gray-500 text-sm">Puedes renderizar cualquier JSX aquí.</span>
							</div>
						),
					},
				]}
			/>
		</div>
	),
};

