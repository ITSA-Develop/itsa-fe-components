import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button as AntButton, Space } from 'antd';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ButtonOpenModalSelector, IButtonOpenModalSelectorProps } from '../../components/FormButtonSelector';
import { ResponsiveModalProvider } from '../../HOC/ResponsiveModalProvider';
import { useModalResponsive } from '../../hooks/useModalResponsive';

// ---------- Schema y tipos ----------
const schema = z.object({
	selection: z.string({ error: 'Seleccione una opción' }).min(1, 'Seleccione una opción'),
});
type FormValues = z.infer<typeof schema>;

// ---------- Wrapper que obtiene el control del contexto del formulario ----------
const BoundButtonSelector = (props: Omit<IButtonOpenModalSelectorProps<FormValues>, 'control'>) => {
	const { control } = useFormContext<FormValues>();
	return <ButtonOpenModalSelector {...props} control={control as any} />;
};

// ---------- Contenido del modal (selección) ----------
const ModalContent: React.FC<{ name: keyof FormValues }> = ({ name }) => {
	const { setValue, trigger } = useFormContext<FormValues>();
	const { closeModal } = useModalResponsive();

	const handlePick = async (value: string) => {
		setValue(name as any, value, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
		await trigger(name as any);
		closeModal();
	};

	return (
		<Space direction="vertical" style={{ width: '100%' }}>
			<AntButton block onClick={() => handlePick('Opción A')}>
				Opción A
			</AntButton>
			<AntButton block onClick={() => handlePick('Opción B')}>
				Opción B
			</AntButton>
			<AntButton block onClick={() => handlePick('Opción C')}>
				Opción C
			</AntButton>
		</Space>
	);
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
		defaultValues: { selection: '' as string, ...defaultValues },
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
					<AntButton htmlType="submit" type="primary">
						Enviar
					</AntButton>
				</Space>
			</form>
		</FormProvider>
	);
};

// ---------- Meta ----------
const meta: Meta<typeof BoundButtonSelector> = {
	title: 'components/Form/FormButtonSelector',
	component: BoundButtonSelector,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'Botón que abre un modal para seleccionar un valor y lo integra con react-hook-form.',
			},
		},
	},
	argTypes: {
		label: { control: 'text' },
		placeholder: { control: 'text' },
		name: { control: 'text' },
	},
};

export default meta;

type Story = StoryObj<typeof BoundButtonSelector>;

// ---------- Historias ----------
export const Default: Story = {
	name: 'Default',
	args: {
		name: 'selection',
		label: 'Selector',
		placeholder: 'Seleccionar',
		closable: true,
	},
	render: args => (
		<RHFForm defaultValues={{ selection: '' }}>
			<ResponsiveModalProvider>
				<BoundButtonSelector {...args}>
					<ModalContent name={args.name as keyof FormValues} />
				</BoundButtonSelector>
			</ResponsiveModalProvider>
		</RHFForm>
	),
};


