import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { useForm, FormProvider } from 'react-hook-form';
import { FormSelect } from '../../components/FormSelect';

function RHFWithControl({
    children,
    defaultValues = {},
}: {
    children: (control: any) => React.ReactNode;
    defaultValues?: Record<string, any>;
}) {
    const methods = useForm({ defaultValues });
    return <FormProvider {...methods}>{children(methods.control)}</FormProvider>;
}

describe('FormSelect component', () => {
    const options = [
        { label: 'Rojo', value: 'red' },
        { label: 'Azul', value: 'blue' },
    ];

    it('renders label and selects option', async () => {
        const user = userEvent.setup();
        const { container } = render(
            <RHFWithControl>
                {(control) => (
                    <FormSelect name="color" label="Color" control={control} options={options} allowClear />
                )}
            </RHFWithControl>,
        );

        expect(screen.getByText('Color')).toBeInTheDocument();
        const select = container.querySelector('.ant-select') as HTMLElement;
        await user.click(select);
        await user.click(await screen.findByText('Azul'));
        expect(container).toMatchSnapshot();
    });
});


