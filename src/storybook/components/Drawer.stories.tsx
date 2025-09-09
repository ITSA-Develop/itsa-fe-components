import type { StoryObj } from '@storybook/react';
import { Drawer } from '../../components/Drawer/Drawer';
import { Link } from '../../components/Link/Link';

const meta = {
	title: 'Components/Drawer',
	component: Drawer,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Component Drawer usando Ant Design.\n\n👉 [Ver documentación oficial](https://ant.design/components/Drawer)',
			},
		},
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DrawerDefault: Story = {
	args: {
		title: 'Basic Drawer',
		closable: { 'aria-label': 'Close Button' },
		onClose: () => console.log('on close'),
		open: true,
		children: (
			<div>
				<p>Component Drawer usando Ant Design.</p>
				<p>
					<Link href={'https://ant.design/components/Drawer'}>👉 Ver documentación oficial</Link>
				</p>
			</div>
		),
	},
};
