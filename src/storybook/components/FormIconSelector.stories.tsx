import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Space } from 'antd';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form';
import { FormIconSelector, type IFormIconSelectorProps } from '../../components/FormIconSelector';

const schema = z.object({
	icon: z.string({ error: 'Seleccione un icono' }).min(1, 'Seleccione un icono'),
});
type FormValues = z.infer<typeof schema>;

const BoundFormIconSelector = (props: Omit<IFormIconSelectorProps<FormValues>, 'control'>) => {
	const { control } = useFormContext<FormValues>();
	const icon = useWatch({ control, name: 'icon' });

	return (
		<Space direction="vertical" style={{ width: '100%' }} size="middle">
			<FormIconSelector {...props} control={control} />
			<div className="text-sm text-gray-600">
				Valor guardado: <b>{icon || '—'}</b>
			</div>
		</Space>
	);
};

const RHFForm: React.FC<{
	children: React.ReactNode;
	defaultValues?: Partial<FormValues>;
}> = ({ children, defaultValues }) => {
	const methods = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: { icon: undefined as unknown as string, ...defaultValues },
		mode: 'onSubmit',
	});

	return (
		<FormProvider {...methods}>
			<form
				className="rounded-xl bg-white-100 p-6 text-gray-900"
				onSubmit={methods.handleSubmit(data => {
					// eslint-disable-next-line no-console
					console.log('submit', data);
				})}
				style={{ width: 420 }}
			>
				<Space direction="vertical" style={{ width: '100%' }} size="middle">
					{children}
					<Button htmlType="submit" type="primary">
						Enviar
					</Button>
				</Space>
			</form>
		</FormProvider>
	);
};

const meta: Meta<typeof BoundFormIconSelector> = {
	title: 'components/Form/FormIconSelector',
	component: BoundFormIconSelector,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'Selector de iconos de Lucide ligado a react-hook-form. Cada opción muestra el dibujo y el nombre del icono. El valor que se guarda es el nombre, por ejemplo "settings".',
			},
		},
	},
	argTypes: {
		label: { control: 'text' },
		placeholder: { control: 'text' },
		allowClear: { control: 'boolean' },
		disabled: { control: 'boolean' },
	},
};
export default meta;

type Story = StoryObj<typeof BoundFormIconSelector>;

export const Default: Story = {
	name: 'Vacío',
	args: {
		name: 'icon',
		label: 'Icono del menú',
		placeholder: 'Buscar icono',
		allowClear: true,
	},
	render: args => (
		<RHFForm>
			<BoundFormIconSelector {...args} />
		</RHFForm>
	),
};

export const WithValue: Story = {
	name: 'Con icono seleccionado',
	args: {
		name: 'icon',
		label: 'Icono del menú',
		placeholder: 'Buscar icono',
		allowClear: true,
	},
	render: args => (
		<RHFForm defaultValues={{ icon: 'settings' }}>
			<BoundFormIconSelector {...args} />
		</RHFForm>
	),
};
