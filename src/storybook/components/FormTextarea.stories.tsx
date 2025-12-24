
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Space } from 'antd';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { FormTextarea, IFormTextareaProps } from '../../components/FormTextarea';

const schema = z.object({
  description: z.string().min(10, 'Mínimo 10 caracteres'),
  notes: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

const BoundTextarea = (props: Omit<IFormTextareaProps<FormValues>, 'control'>) => {
  const { control } = useFormContext<FormValues>();
  return <FormTextarea {...props} control={control as any} />;
};

const RHFForm: React.FC<{
  children: React.ReactNode;
  defaultValues?: Partial<FormValues>;
  mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all';
  onSubmitLogLabel?: string;
}> = ({ children, defaultValues, mode = 'onBlur', onSubmitLogLabel = 'submit' }) => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { description: '', notes: '', ...defaultValues },
    mode,
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(data => {
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

const meta: Meta<typeof BoundTextarea> = {
  title: 'components/Form/FormTextarea',
  component: BoundTextarea,
  parameters: { layout: 'centered' },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    showCaracteres: { control: 'boolean' },
    textTransform: {
      control: 'select',
      options: ['none', 'uppercase', 'lowercase'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof BoundTextarea>;

export const Default: Story = {
  name: 'Default',
  args: {
    name: 'description',
    label: 'Descripción',
    placeholder: 'Escribe una descripción...',
    showCaracteres: true,
  },
  render: args => (
    <RHFForm defaultValues={{ description: '' }}>
      <BoundTextarea {...args} />
    </RHFForm>
  ),
};

export const WithDefaultValue: Story = {
  name: 'Con valor inicial',
  args: {
    name: 'description',
    label: 'Descripción',
    placeholder: 'Texto inicial',
    showCaracteres: true,
  },
  render: args => (
    <RHFForm defaultValues={{ description: 'Texto inicial de ejemplo' }}>
      <BoundTextarea {...args} />
    </RHFForm>
  ),
};

export const Disabled: Story = {
  name: 'Deshabilitado',
  args: {
    name: 'description',
    label: 'Descripción',
    placeholder: 'No editable',
    disabled: true,
  },
  render: args => (
    <RHFForm defaultValues={{ description: 'Solo lectura' }}>
      <BoundTextarea {...args} />
    </RHFForm>
  ),
};

export const ShowErrorOnSubmit: Story = {
  name: 'Error al enviar (validación Zod)',
  args: {
    name: 'description',
    label: 'Descripción',
    placeholder: 'Mínimo 10 caracteres',
  },
  render: args => (
    <RHFForm mode="onSubmit" onSubmitLogLabel="submit-invalid">
      <BoundTextarea {...args} />
    </RHFForm>
  ),
};

export const TwoFields: Story = {
  name: 'Dos campos en el mismo formulario',
  render: () => (
    <RHFForm defaultValues={{ description: '', notes: '' }}>
      <BoundTextarea name="description" label="Descripción" placeholder="Texto principal..." showCaracteres />
      <BoundTextarea name="notes" label="Notas" placeholder="Notas adicionales..." textTransform="uppercase" />
    </RHFForm>
  ),
};
