import type { Meta, StoryObj } from '@storybook/react';
import { DesignSystemPage } from './DesignSystemPage';

const meta: Meta<typeof DesignSystemPage> = {
	title: 'Design System/UI Components',
	component: DesignSystemPage,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Catálogo visual del Design System a partir de la implementación real de @itsa-develop/itsa-fe-components. No introduce componentes nuevos de producto; documenta tokens, layouts y wrappers existentes.',
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof DesignSystemPage>;

export const CatalogoVisual: Story = {
	name: 'Catálogo visual',
	render: () => <DesignSystemPage />,
};
