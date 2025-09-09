import type { StoryObj } from '@storybook/react';
import { Collapse } from '../../components/Collapse/Collapse';

const meta = {
	title: 'Components/Collapse',
	component: Collapse,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Component Collapse usando Ant Design.\n\n👉 [Ver documentación oficial](https://ant.design/components/Collapse)',
			},
		},
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		defaultActiveKey: 1,
		onChange: (key: string | string[]) => {
			console.log(key);
		},
		items: [
			{
				key: '1',
				label: 'This is panel header 1',
				children: <p>text 1</p>,
			},
			{
				key: '2',
				label: 'This is panel header 2',
				children: <p>text 2</p>,
			},
			{
				key: '3',
				label: 'This is panel header 3',
				children: <p>text 3</p>,
			},
		],
	},
};
