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
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ImageDefault: Story = {
	args: {
		alt: 'Image',
		width: 300,
		height: 300,
		imgPath:
			'https://raw.githubusercontent.com/tomasfqit/images-server/refs/heads/main/no-image-available-icon-vector.jpg',
	},
};
