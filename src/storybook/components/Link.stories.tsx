import type { StoryObj } from '@storybook/react';
import { Link } from '../../components/Link/Link';

const meta = {
	title: 'Components/Link',
	component: Link,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Component Link (parte de Typography) usando Ant Design.\n\n👉 [Ver documentación oficial](https://ant.design/components/typography)',
			},
		},
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		href: 'www.google.com',
		target: '_blank',
		children: 'Click here',
	},
};
