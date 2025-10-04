import React from 'react';
import type { StoryObj } from '@storybook/react';
import { TagStatus } from '../../components/TagStatus';

const meta = {
	id: 'components-tag',
	title: 'Components/TagsStatus',
	component: TagStatus,
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
		status: 'magenta',
		label: 'tag 1',
	},
};

export const Examples: Story = {
	args: { status: 'magenta', label: 'tag 1' },
	render: args => {
		return (
			<div className="flex flex-col gap-4 p-4">
				<TagStatus status="warning" label="tag 1" />
				<TagStatus status="success" label="tag 1" />
				<TagStatus status="error" label="tag 1" />
			</div>
		);
	},
};
