// FormInput.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Space } from 'antd';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { FormInput, IInputProps } from '../../components/FormInput';
// ---------- Schema y tipos para cerrar los genéricos ----------
const schema = z.object({
	email: z.string().email('Email inválido'),
	password: z.string().min(6, 'Mínimo 6 caracteres').optional(),
});
type FormValues = z.infer<typeof schema>;

// Wrapper que obtiene el control del contexto del formulario
const BoundInput = (props: Omit<IInputProps<FormValues>, 'control'>) => {
	const { control } = useFormContext<FormValues>();
	return <FormInput {...props} control={control as any} />;
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
		defaultValues: { email: '', password: '', ...defaultValues },
		mode,
	});

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(data => {
					// Útil para ver el resultado en la consola de Storybook
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
const meta: Meta<typeof BoundInput> = {
	title: 'components/Form/FormInput',
	component: BoundInput,
	parameters: { layout: 'centered' },
	argTypes: {
		label: { control: 'text' },
		placeholder: { control: 'text' },
		disabled: { control: 'boolean' },
		type: {
			control: 'select',
			options: ['text', 'email', 'password'],
			mapping: { text: 'text', email: 'email', password: 'password' },
		},
	},
};
export default meta;

type Story = StoryObj<typeof BoundInput>;

// ---------- Historias ----------
export const Default: Story = {
	name: 'Default',
	args: {
		name: 'email',
		label: 'Email',
		placeholder: 'tu@email...',
		type: 'email',
	},
	render: args => (
		<RHFForm defaultValues={{ email: '' }}>
			<BoundInput {...args} />
		</RHFForm>
	),
};

export const WithDefaultValue: Story = {
	name: 'Con valor inicial',
	args: {
		name: 'email',
		label: 'Email',
		placeholder: 'usuario@empresa.com',
		type: 'email',
	},
	render: args => (
		<RHFForm defaultValues={{ email: 'usuario@empresa.com' }}>
			<BoundInput {...args} />
		</RHFForm>
	),
};

export const Password: Story = {
	name: 'Password',
	args: {
		name: 'password',
		label: 'Contraseña',
		placeholder: '••••••',
		type: 'password',
	},
	render: args => (
		<RHFForm defaultValues={{ password: '' }}>
			<BoundInput {...args} />
		</RHFForm>
	),
};

export const Disabled: Story = {
	name: 'Deshabilitado',
	args: {
		name: 'email',
		label: 'Email',
		placeholder: 'no editable',
		disabled: true,
	},
	render: args => (
		<RHFForm defaultValues={{ email: 'readonly@empresa.com' }}>
			<BoundInput {...args} />
		</RHFForm>
	),
};

export const ShowErrorOnSubmit: Story = {
	name: 'Error al enviar (validación Zod)',
	args: {
		name: 'email',
		label: 'Email',
		placeholder: 'deja vacío y haz click en Enviar',
		type: 'email',
	},
	render: args => (
		<RHFForm mode="onSubmit" onSubmitLogLabel="submit-invalid">
			<BoundInput {...args} />
		</RHFForm>
	),
};

// Extra: muestra dos inputs compartiendo el mismo contexto
export const TwoFields: Story = {
	name: 'Dos campos en el mismo formulario',
	render: () => (
		<RHFForm defaultValues={{ email: '', password: '' }}>
			<BoundInput name="email" label="Usuario" placeholder="tu@email..." showCaracteres />
			<BoundInput name="password" label="Contraseña" type="password" placeholder="••••••" showCaracteres />
		</RHFForm>
	),
};
