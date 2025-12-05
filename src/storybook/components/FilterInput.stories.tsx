import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FilterInput, type IFilterInputProps } from '../../components/FilterInput';

const meta: Meta<IFilterInputProps> = {
	title: 'components/FilterInput',
	component: FilterInput,
	parameters: { layout: 'padded' },
	argTypes: {
		placeholder: { control: 'text' },
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	name: 'Default',
	args: {
		title: 'Filtrar',
		placeholder: 'Filtrar...',
	},
		render: (args) => (
		<div style={{ width: 360 }}>
				<FilterInput {...(args as IFilterInputProps)} />
		</div>
	),
};

export const WithoutPlaceholder: Story = {
	name: 'Sin placeholder',
	render: () => (
		<div style={{ width: 360 }}>
			<FilterInput title="Filtrar" value="" onChange={() => {}} />
		</div>
	),
};


