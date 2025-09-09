import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { FormLayout } from '../../components/FormLayout/FormLayout';

const meta: Meta = {
	title: 'Components/Layouts/FormLayout',
	component: FormLayout,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
	render: () => {
		const FormLayoutHistory = () => {
			return (
				<div>
					<div className="p-10 bg-gray-100 min-h-[800px]">
						<h1 className="text-3xl font-bold">Contenido Principal</h1>
						<p className="text-gray-700 mt-4">Esto se verá parcialmente en desktop cuando el Drawer esté abierto.</p>
					</div>

					<FormLayout
						size="large"
						header={{ title: 'Nuevo Vehículo', subtitle: 'Crea un nuevo vehículo' }}
						items={[
							{ key: '1', label: 'Settings', children: <div>Content 1</div> },
							{ key: '2', label: 'Other', children: <div>Content 2</div> },
						]}
					/>
				</div>
			);
		};

		return <FormLayoutHistory />;
	},
};
