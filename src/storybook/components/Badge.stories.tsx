import type { StoryObj } from '@storybook/react';
import { Badge } from '../../components/Badge/Badge';

const meta = {
	title: 'Components/Badge',
	component: Badge,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Component Badge usando Ant Design.\n\n👉 [Ver documentación oficial](https://ant.design/components/Badge)',
			},
		},
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BadgeDefault: Story = {
	args: {
		count: 1,
	},
};
