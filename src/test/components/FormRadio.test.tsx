import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { useForm, FormProvider } from 'react-hook-form';
import { FormRadio } from '../../components/FormRadio';

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

describe('FormRadio component', () => {
    it('renders label and selects radio option', async () => {
        const user = userEvent.setup();
        render(
            <RHFWithControl defaultValues={{ option: '1' }}>
                {(control) => (
                    <FormRadio name="option" label="Opción" control={control} options={[{ label: 'Uno', value: '1' }, { label: 'Dos', value: '2' }]} />
                )}
            </RHFWithControl>,
        );

        const radioTwo = screen.getByLabelText('Dos') as HTMLInputElement;
        await user.click(radioTwo);
        expect(radioTwo.checked).toBe(true);
    });
});


