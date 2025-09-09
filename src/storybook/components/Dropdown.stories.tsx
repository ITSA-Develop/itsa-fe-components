import type { StoryObj } from '@storybook/react';
import { Dropdown } from '../../components/Dropdown/Dropdown';

const meta = {
	title: 'Components/Dropdown',
	component: Dropdown,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Component Dropdown usando Ant Design.\n\n👉 [Ver documentación oficial](https://ant.design/components/Dropdown)',
			},
		},
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		menu: {
			items: [
				{
					key: '1',
					label: (
						<a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
							1st menu item
						</a>
					),
				},
				{
					key: '2',
					label: (
						<a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
							2nd menu item (disabled)
						</a>
					),
					icon: '@', // TODO: icon here
					disabled: true,
				},
				{
					key: '3',
					label: (
						<a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
							3rd menu item (disabled)
						</a>
					),
					disabled: true,
				},
				{
					key: '4',
					danger: true,
					label: 'a danger item',
				},
			],
		},
		children: 'hover me',
	},
};
