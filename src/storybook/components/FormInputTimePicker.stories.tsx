import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Space } from 'antd';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { FormInputTimePicker, IInputProps } from '../../components/FormInputTimePicker';

// ---------- Schema y tipos ----------
const schema = z.object({
	time: z.union([z.string(), z.undefined()]).refine(v => !!v, { message: 'Seleccione una hora' }),
});
type FormValues = z.infer<typeof schema>;

// Wrapper que obtiene el control del contexto del formulario
const BoundFormInputTimePicker = (props: Omit<IInputProps<FormValues>, 'control'>) => {
	const { control, watch } = useFormContext<FormValues>();
	const time = watch('time');
	console.log('TOMAS ===> time =>', JSON.stringify(structuredClone(time)));
	return <FormInputTimePicker {...props} control={control as any} />;
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
		defaultValues: { time: undefined, ...defaultValues },
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
const meta: Meta<typeof BoundFormInputTimePicker> = {
	title: 'components/Form/FormInputTimePicker',
	component: BoundFormInputTimePicker,
	parameters: { layout: 'centered' },
	argTypes: {
		label: { control: 'text' },
		disabled: { control: 'boolean' },
		placeholder: { control: 'text' },
	},
};
export default meta;

type Story = StoryObj<typeof BoundFormInputTimePicker>;

// ---------- Historias ----------
export const Default: Story = {
	name: 'Default',
	args: {
		name: 'time',
		label: 'Hora',
		placeholder: 'HH:mm',
	},
	render: args => (
		<RHFForm defaultValues={{ time: undefined }}>
			<BoundFormInputTimePicker {...args} optional />
		</RHFForm>
	),
};

export const WithInitialValue: Story = {
	name: 'Con valor inicial',
	args: {
		name: 'time',
		label: 'Hora',
		placeholder: 'HH:mm',
	},
	render: args => (
		<RHFForm defaultValues={{ time: '14:30' }}>
			<BoundFormInputTimePicker {...args} />
		</RHFForm>
	),
};

export const Disabled: Story = {
	name: 'Deshabilitado',
	args: {
		name: 'time',
		label: 'Hora',
		disabled: true,
	},
	render: args => (
		<RHFForm defaultValues={{ time: undefined }}>
			<BoundFormInputTimePicker {...args} />
		</RHFForm>
	),
};

export const ShowErrorOnSubmit: Story = {
	name: 'Error al enviar (validación Zod)',
	args: {
		name: 'time',
		label: 'Seleccione una hora',
	},
	render: args => (
		<RHFForm mode="onSubmit" onSubmitLogLabel="submit-invalid">
			<BoundFormInputTimePicker {...args} />
		</RHFForm>
	),
};



