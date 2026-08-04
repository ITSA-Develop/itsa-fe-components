import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Space } from 'antd';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { FormSelectTree, IFormSelectTreeProps } from '../../components/FormTreeSelect/FormSelectTree';

const schema = z.object({
	category: z
		.union([z.string(), z.number()], { error: 'Seleccione una opción' })
		.refine(value => value !== undefined && value !== '', 'Seleccione una opción'),
});
type FormValues = z.infer<typeof schema>;

const BoundFormSelectTree = (props: Omit<IFormSelectTreeProps<FormValues>, 'control'>) => {
	const { control } = useFormContext<FormValues>();
	return <FormSelectTree {...props} control={control as any} />;
};

const RHFForm: React.FC<{
	children: React.ReactNode;
	defaultValues?: Partial<FormValues>;
	mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all';
	onSubmitLogLabel?: string;
}> = ({ children, defaultValues, mode = 'onBlur', onSubmitLogLabel = 'submit' }) => {
	const methods = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: { category: undefined as unknown as string, ...defaultValues },
		mode,
	});

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(data => {
					// eslint-disable-next-line no-console
					console.log(onSubmitLogLabel, data);
				})}
				style={{ width: 360 }}
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

const meta: Meta<typeof BoundFormSelectTree> = {
	title: 'components/Form/FormSelectTree',
	component: BoundFormSelectTree,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'Select en árbol integrado con react-hook-form. Solo permite seleccionar nodos hoja; los nodos con hijos solo se expanden.',
			},
		},
	},
	argTypes: {
		label: { control: 'text' },
		placeholder: { control: 'text' },
		allowClear: { control: 'boolean' },
		isLoading: { control: 'boolean' },
		disabled: { control: 'boolean' },
	},
};
export default meta;

type Story = StoryObj<typeof BoundFormSelectTree>;

const sampleOptions = [
	{
		label: 'Electrónica',
		value: 'electronics',
		children: [
			{
				label: 'Celulares',
				value: 'phones',
				children: [
					{ label: 'Smartphones', value: 'smartphones' },
					{ label: 'Accesorios', value: 'phone-accessories' },
				],
			},
			{ label: 'Laptops', value: 'laptops' },
		],
	},
	{
		label: 'Hogar',
		value: 'home',
		children: [
			{ label: 'Cocina', value: 'kitchen' },
			{ label: 'Decoración', value: 'decoration' },
		],
	},
	{ label: 'Ropa', value: 'clothing' },
];

export const Default: Story = {
	name: 'Default',
	args: {
		name: 'category',
		label: 'Categoría',
		placeholder: 'Seleccione una categoría',
		allowClear: true,
		options: sampleOptions,
	},
	render: args => (
		<RHFForm defaultValues={{ category: undefined as unknown as string }}>
			<BoundFormSelectTree {...args} />
		</RHFForm>
	),
};

export const Loading: Story = {
	name: 'Cargando (isLoading)',
	args: {
		name: 'category',
		label: 'Categoría',
		placeholder: 'Cargando opciones...',
		allowClear: true,
		options: sampleOptions,
		isLoading: true,
	},
	render: args => (
		<RHFForm defaultValues={{ category: undefined as unknown as string }}>
			<BoundFormSelectTree {...args} />
		</RHFForm>
	),
};

export const WithDefaultValue: Story = {
	name: 'Con valor inicial',
	args: {
		name: 'category',
		label: 'Categoría',
		placeholder: 'Seleccione una categoría',
		allowClear: true,
		options: sampleOptions,
	},
	render: args => (
		<RHFForm defaultValues={{ category: 'laptops' }}>
			<BoundFormSelectTree {...args} />
		</RHFForm>
	),
};

export const Disabled: Story = {
	name: 'Deshabilitado',
	args: {
		name: 'category',
		label: 'Categoría',
		placeholder: 'Seleccione una categoría',
		allowClear: true,
		options: sampleOptions,
		disabled: true,
	},
	render: args => (
		<RHFForm defaultValues={{ category: 'clothing' }}>
			<BoundFormSelectTree {...args} />
		</RHFForm>
	),
};
