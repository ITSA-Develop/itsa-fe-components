import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { useForm, FormProvider } from 'react-hook-form';
import { FormCheckBox } from '../../components/FormCheckBox';

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

describe('FormCheckBox component', () => {
    it('renders label and toggles value', async () => {
        const user = userEvent.setup();
        render(
            <RHFWithControl defaultValues={{ accept: false }}>
                {(control) => <FormCheckBox name="accept" label="Aceptar" control={control} />}
            </RHFWithControl>,
        );

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked();
        await user.click(checkbox);
        expect(checkbox).toBeChecked();
    });
});


