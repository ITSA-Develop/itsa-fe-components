import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Space } from 'antd';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { FormInput, IInputProps as IFormInputProps } from '../../components/FormInput';
import { FormInputNumber, IInputProps as IFormInputNumberProps } from '../../components/FormInputNumber';
import { FormTextarea, IFormTextareaProps } from '../../components/FormTextarea';

// ---------- Schema y tipos ----------
const schema = z.object({
	name: z.string().min(1, 'Ingrese un nombre'),
	description: z.string().optional(),
	amount: z
		.number()
		.min(0, 'Debe ser mayor o igual a 0')
		.nullable()
		.refine(value => value !== null, { message: 'Ingrese un valor' }),
});
type FormValues = z.infer<typeof schema>;

// ---------- Wrappers que obtienen el control del contexto ----------
const BoundFormInput = (props: Omit<IFormInputProps<FormValues>, 'control'>) => {
	const { control } = useFormContext<FormValues>();
	return <FormInput {...props} control={control as any} />;
};

const BoundFormInputNumber = (props: Omit<IFormInputNumberProps<FormValues>, 'control'>) => {
	const { control } = useFormContext<FormValues>();
	return <FormInputNumber {...props} control={control as any} />;
};

const BoundFormTextarea = (props: Omit<IFormTextareaProps<FormValues>, 'control'>) => {
	const { control } = useFormContext<FormValues>();
	return <FormTextarea {...props} control={control as any} />;
};

// ---------- Wrapper con RHF ----------
const RHFForm: React.FC<{
	children: React.ReactNode;
	defaultValues?: Partial<FormValues>;
	mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all';
	onSubmitLogLabel?: string;
}> = ({ children, defaultValues, mode = 'onBlur', onSubmitLogLabel = 'submit' }) => {
	const methods = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: { name: '', description: '', amount: null, ...defaultValues },
		mode,
	});

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(data => {
					// eslint-disable-next-line no-console
					console.log(onSubmitLogLabel, data);
				})}
				style={{ width: 400 }}
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

// ---------- Meta ----------
const meta: Meta = {
	title: 'components/Form/FormInputAndInputNumberAndTextarea',
	parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj;

// ---------- Historias ----------
export const Default: Story = {
	name: 'Default',
	render: () => (
		<RHFForm>
			<BoundFormInput name="name" label="Nombre" placeholder="Ingrese el nombre" />
			<BoundFormTextarea name="description" label="Descripción" placeholder="Descripción opcional" showCaracteres />
			<BoundFormInputNumber name="amount" label="Monto" placeholder="0" prefix="$" />
		</RHFForm>
	),
};

export const WithInitialValues: Story = {
	name: 'Con valores iniciales',
	render: () => (
		<RHFForm
			defaultValues={{
				name: 'Producto demo',
				description: 'Descripción de ejemplo',
				amount: 1250,
			}}
		>
			<BoundFormInput name="name" label="Nombre" placeholder="Ingrese el nombre" />
			<BoundFormTextarea name="description" label="Descripción" placeholder="Descripción de ejemplo" showCaracteres />
			<BoundFormInputNumber name="amount" label="Monto" placeholder="0" prefix="$" suffix="USD" />
		</RHFForm>
	),
};

export const ShowErrorOnSubmit: Story = {
	name: 'Error al enviar (validación Zod)',
	render: () => (
		<RHFForm mode="onSubmit" onSubmitLogLabel="submit-invalid">
			<BoundFormInput name="name" label="Nombre" placeholder="Deje vacío y envíe" />
			<BoundFormTextarea name="description" label="Descripción" placeholder="Opcional" showCaracteres />
			<BoundFormInputNumber name="amount" label="Monto" placeholder="0" />
		</RHFForm>
	),
};

export const Disabled: Story = {
	name: 'Deshabilitado',
	render: () => (
		<RHFForm
			defaultValues={{
				name: 'Producto demo',
				description: 'Solo lectura',
				amount: 500,
			}}
		>
			<BoundFormInput name="name" label="Nombre" disabled />
			<BoundFormTextarea name="description" label="Descripción" disabled />
			<BoundFormInputNumber name="amount" label="Monto" disabled prefix="$" />
		</RHFForm>
	),
};
