import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { useForm, FormProvider } from 'react-hook-form';
import { FormInput } from '../../components/FormInput';

// Test wrapper component that provides form context
function TestFormWrapper({
	children,
	defaultValues = {},
}: {
	children: React.ReactNode;
	defaultValues?: Record<string, any>;
}) {
	const methods = useForm({
		defaultValues,
		mode: 'onBlur',
		reValidateMode: 'onBlur',
	});

	return <FormProvider {...methods}>{children}</FormProvider>;
}

describe('FormInput component', () => {
	it('renders with label and input field', () => {
		render(
			<TestFormWrapper>
				<FormInput name="testField" label="Test Label" />
			</TestFormWrapper>,
		);

		expect(screen.getByText('Test Label')).toBeInTheDocument();
		expect(screen.getByRole('textbox')).toBeInTheDocument();
	});

	it('displays initial value from form context', () => {
		render(
			<TestFormWrapper defaultValues={{ testField: 'Initial value' }}>
				<FormInput name="testField" label="Test Label" />
			</TestFormWrapper>,
		);

		const input = screen.getByRole('textbox') as HTMLInputElement;
		expect(input.value).toBe('Initial value');
	});

	it('allows user to type and updates value', async () => {
		const user = userEvent.setup();
		render(
			<TestFormWrapper>
				<FormInput name="testField" label="Test Label" />
			</TestFormWrapper>,
		);

		const input = screen.getByRole('textbox');
		await user.type(input, 'Hello World');

		expect(input).toHaveValue('Hello World');
	});

	it('has correct form attributes', () => {
		render(
			<TestFormWrapper>
				<FormInput name="testField" label="Test Label" />
			</TestFormWrapper>,
		);

		const input = screen.getByRole('textbox');
		expect(input).toHaveAttribute('name', 'testField');
		expect(input).toHaveAttribute('aria-invalid', 'false');
		expect(input).toHaveAttribute('type', 'text');
		expect(input).toHaveClass('ant-input');
	});

	it('connects label with input using htmlFor and id', () => {
		render(
			<TestFormWrapper>
				<FormInput name="testField" label="Test Label" />
			</TestFormWrapper>,
		);

		const label = screen.getByText('Test Label');
		const input = screen.getByRole('textbox');

		expect(label).toHaveAttribute('for');
		expect(input).toHaveAttribute('id');
		expect(label.getAttribute('for')).toBe(input.getAttribute('id'));
	});

	it('does not have aria-describedby when there is no error', () => {
		render(
			<TestFormWrapper>
				<FormInput name="testField" label="Test Label" />
			</TestFormWrapper>,
		);

		const input = screen.getByRole('textbox');
		expect(input).not.toHaveAttribute('aria-describedby');
	});

	it('passes additional props to the underlying Input component', () => {
		render(
			<TestFormWrapper>
				<FormInput name="testField" label="Test Label" placeholder="Enter text..." maxLength={50} disabled />
			</TestFormWrapper>,
		);

		const input = screen.getByRole('textbox');
		expect(input).toHaveAttribute('placeholder', 'Enter text...');
		expect(input).toHaveAttribute('maxlength', '50');
		expect(input).toBeDisabled();
	});

	it('supports showCaracteres prop', () => {
		render(
			<TestFormWrapper defaultValues={{ testField: 'Test' }}>
				<FormInput name="testField" label="Test Label" showCaracteres />
			</TestFormWrapper>,
		);

		const input = screen.getByRole('textbox');
		expect(input).toBeInTheDocument();
		// Note: Character count functionality is handled by Ant Design's Input component
	});
});
