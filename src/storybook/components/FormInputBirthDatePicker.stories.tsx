import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Space } from 'antd';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import {
	FormInputBirthDatePicker,
	type IFormInputBirthDatePickerProps,
} from '@/components/FormInputBirthDatePicker';
import { EDateMaskFormat } from '@/enums';

const schema = z.object({
	birthDate: z.string({ required_error: 'Seleccione una fecha de nacimiento' }).min(1, 'Seleccione una fecha de nacimiento'),
});
type FormValues = z.infer<typeof schema>;

const BoundFormInputBirthDatePicker = (
	props: Omit<IFormInputBirthDatePickerProps<FormValues>, 'control'>,
) => {
	const { control } = useFormContext<FormValues>();
	return <FormInputBirthDatePicker<FormValues> {...props} control={control} />;
};

const RHFForm: React.FC<{
	children: React.ReactNode;
	defaultValues?: Partial<FormValues>;
	mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all';
}> = ({ children, defaultValues, mode = 'onBlur' }) => {
	const methods = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: { birthDate: undefined, ...defaultValues },
		mode,
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(() => {})} style={{ width: 360 }}>
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

const meta: Meta<typeof BoundFormInputBirthDatePicker> = {
	title: 'components/Form/FormInputBirthDatePicker',
	component: BoundFormInputBirthDatePicker,
	parameters: { layout: 'centered' },
	argTypes: {
		label: { control: 'text' },
		disabled: { control: 'boolean' },
		placeholder: { control: 'text' },
	},
};
export default meta;

type Story = StoryObj<typeof BoundFormInputBirthDatePicker>;

export const Default: Story = {
	args: {
		name: 'birthDate',
		label: 'Fecha de nacimiento',
		placeholder: 'YYYY-MM-DD',
		format: EDateMaskFormat.YYYYMMDD,
	},
	render: args => (
		<RHFForm defaultValues={{ birthDate: undefined }}>
			<BoundFormInputBirthDatePicker {...args} optional />
		</RHFForm>
	),
};

export const WithInitialValue: Story = {
	name: 'Con valor inicial',
	args: {
		name: 'birthDate',
		label: 'Fecha de nacimiento',
		placeholder: 'YYYY-MM-DD',
		format: EDateMaskFormat.YYYYMMDD,
	},
	render: args => (
		<RHFForm defaultValues={{ birthDate: '1990-05-15' }}>
			<BoundFormInputBirthDatePicker {...args} />
		</RHFForm>
	),
};

export const Disabled: Story = {
	name: 'Deshabilitado',
	args: {
		name: 'birthDate',
		label: 'Fecha de nacimiento',
		disabled: true,
	},
	render: args => (
		<RHFForm defaultValues={{ birthDate: undefined }}>
			<BoundFormInputBirthDatePicker {...args} />
		</RHFForm>
	),
};

export const ShowErrorOnSubmit: Story = {
	name: 'Error al enviar (validación Zod)',
	args: {
		name: 'birthDate',
		label: 'Fecha de nacimiento',
	},
	render: args => (
		<RHFForm mode="onSubmit">
			<BoundFormInputBirthDatePicker {...args} />
		</RHFForm>
	),
};
