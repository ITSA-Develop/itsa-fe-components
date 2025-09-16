import React from 'react';
import type { StoryObj } from '@storybook/react';
import { TagCustom } from '../../components/TagCustom';
import { COLOR_TAGS } from '../../constants';
import { Tag } from 'antd';

const meta = {
	id: 'components-tag',
	title: 'Components/TagsCustom',
	component: TagCustom,
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
		color: 'magenta',
	},
};

export const Examples: Story = {
	args: { color: 'magenta' },
	render: (args) => {
		const colors = Object.keys(COLOR_TAGS) as Array<keyof typeof COLOR_TAGS>;
		return (
			<div className="flex flex-col gap-4 p-4">
				<Tag color='magenta'>Tag 1</Tag>
				<Tag color='warning'>Tag 1</Tag>
				<Tag color='success'>Tag 1</Tag>
				<Tag color='error'>Tag 1</Tag>
				<Tag color='cyan'>Tag 1</Tag>
				<Tag color='blue'>Tag 1</Tag>
				<div className="flex items-center gap-2">
					<span className="text-sm text-gray-600 min-w-[80px]">Single:</span>
					<TagCustom {...args} color="magenta">Tag 1</TagCustom>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-sm text-gray-600 min-w-[80px]">Array:</span>
					<div className="flex flex-wrap gap-2">
						{colors.map((color) => (
							<TagCustom key={color} {...args} color={color}>
								{color}
							</TagCustom>
						))}
					</div>
				</div>
			</div>
		);
	},
};
