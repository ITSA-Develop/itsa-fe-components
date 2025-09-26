import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Space } from 'antd';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { FormSelect, IFormSelectProps } from '../../components/FormSelect';

// ---------- Schema y tipos ----------
const schema = z.object({
	fruit: z.string({ error: 'Seleccione una opción' }).min(1, 'Seleccione una opción'),
});
type FormValues = z.infer<typeof schema>;

// Wrapper que obtiene el control del contexto del formulario
const BoundFormSelect = (props: Omit<IFormSelectProps<FormValues>, 'control'>) => {
	const { control } = useFormContext<FormValues>();
	return <FormSelect {...props} control={control as any} />;
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
		defaultValues: { fruit: undefined as unknown as string, ...defaultValues },
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
const meta: Meta<typeof BoundFormSelect> = {
	title: 'components/Form/FormSelect',
	component: BoundFormSelect,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'Select de formulario integrado con react-hook-form. Incluye búsqueda y muestra un spinner con isLoading.',
			},
		},
	},
	argTypes: {
 		label: { control: 'text' },
 		placeholder: { control: 'text' },
 		allowClear: { control: 'boolean' },
 		mode: { control: 'text' },
 		isLoading: { control: 'boolean' },
 	},
};
export default meta;

type Story = StoryObj<typeof BoundFormSelect>;

const sampleOptions = [
 	{ label: 'Apple', value: 'apple' },
 	{ label: 'Banana', value: 'banana' },
 	{ label: 'Cherry', value: 'cherry' },
 	{ label: 'Date', value: 'date' },
];

// ---------- Historias ----------
export const Default: Story = {
 	name: 'Default',
 	args: {
 		name: 'fruit',
 		label: 'Fruta',
 		placeholder: 'Seleccione una fruta',
 		allowClear: true,
 		options: sampleOptions,
 	},
 	render: args => (
 		<RHFForm defaultValues={{ fruit: undefined as unknown as string }}>
 			<BoundFormSelect {...args} />
 		</RHFForm>
 	),
};

export const Loading: Story = {
 	name: 'Cargando (isLoading)',
 	args: {
 		name: 'fruit',
 		label: 'Fruta',
 		placeholder: 'Cargando opciones...',
 		allowClear: true,
 		options: sampleOptions,
 		isLoading: true,
 	},
 	render: args => (
 		<RHFForm defaultValues={{ fruit: undefined as unknown as string }}>
 			<BoundFormSelect {...args} />
 		</RHFForm>
 	),
};


