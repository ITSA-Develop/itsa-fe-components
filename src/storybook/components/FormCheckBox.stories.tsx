import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Space } from 'antd';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { FormCheckBox, IInputProps } from '../../components/FormCheckBox';

// ---------- Schema y tipos para cerrar los genéricos ----------
const schema = z.object({
	accept: z.boolean().refine(v => v === true, { message: 'Debes aceptar los términos' }),
});
type FormValues = z.infer<typeof schema>;

// Wrapper que obtiene el control del contexto del formulario
const BoundCheckBox = (props: Omit<IInputProps<FormValues>, 'control'>) => {
	const { control } = useFormContext<FormValues>();
	return <FormCheckBox {...props} control={control as any} />;
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
		defaultValues: { accept: false, ...defaultValues },
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

// ---------- Meta ----------
const meta: Meta<typeof BoundCheckBox> = {
	title: 'components/Form/FormCheckBox',
	component: BoundCheckBox,
	parameters: { layout: 'centered' },
	argTypes: {
		label: { control: 'text' },
		disabled: { control: 'boolean' },
	},
};
export default meta;

type Story = StoryObj<typeof BoundCheckBox>;

// ---------- Historias ----------
export const Default: Story = {
	name: 'Default',
	args: {
		name: 'accept',
		label: 'Acepto los términos y condiciones',
	},
	render: args => (
		<RHFForm defaultValues={{ accept: false }}>
			<BoundCheckBox {...args} />
		</RHFForm>
	),
};

export const CheckedByDefault: Story = {
	name: 'Con valor inicial',
	args: {
		name: 'accept',
		label: 'Acepto los términos y condiciones',
	},
	render: args => (
		<RHFForm defaultValues={{ accept: true }}>
			<BoundCheckBox {...args} />
		</RHFForm>
	),
};

export const Disabled: Story = {
	name: 'Deshabilitado',
	args: {
		name: 'accept',
		label: 'Acepto los términos y condiciones',
		disabled: true,
	},
	render: args => (
		<RHFForm defaultValues={{ accept: false }}>
			<BoundCheckBox {...args} />
		</RHFForm>
	),
};

export const ShowErrorOnSubmit: Story = {
	name: 'Error al enviar (validación Zod)',
	args: {
		name: 'accept',
		label: 'Debes aceptar para continuar',
	},
	render: args => (
		<RHFForm mode="onSubmit" onSubmitLogLabel="submit-invalid">
			<BoundCheckBox {...args} />
		</RHFForm>
	),
};


