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
		status: true,
	},
};

export const Examples: Story = {
	args: { status: true, labelTrue: 'Si', labelFalse: 'No' },
	render: args => {
		return (
			<div className="flex flex-col gap-4 p-4">
				<TagStatus status={false} labelTrue="Si" labelFalse="No" />
				<TagStatus status={true} labelTrue="Si" labelFalse="No" />
				<TagStatus status={false} labelTrue="Si" labelFalse="No" />
			</div>
		);
	},
};
