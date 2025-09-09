import type { StoryObj } from '@storybook/react';
import { Tag } from '../../components/Tag/Tag';

const meta = {
	title: 'Components/Tag',
	component: Tag,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Component Tag usando Ant Design.\n\n👉 [Ver documentación oficial](https://ant.design/components/Tag)',
			},
		},
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const TagDefault: Story = {
	args: {
		children: 'tag 1',
	},
};
