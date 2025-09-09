import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Textarea } from '../../components/Textarea/Textarea';

describe('Textarea component', () => {
	it('renders with given props and allows typing', async () => {
		const { container } = render(<Textarea placeholder="Escribe algo..." data-testid="textarea" />);
		const textarea = screen.getByTestId('textarea');

		expect(textarea).toBeInTheDocument();
		expect(textarea).toHaveAttribute('placeholder', 'Escribe algo...');

		await userEvent.type(textarea, 'Hola mundo');
		expect(textarea).toHaveValue('Hola mundo');
		expect(container).toMatchSnapshot();
	});

	it('accepts and passes extra props', () => {
		const { container } = render(<Textarea maxLength={10} data-testid="textarea" />);
		const textarea = screen.getByTestId('textarea');
		expect(textarea).toHaveAttribute('maxlength', '10');
		expect(container).toMatchSnapshot();
	});
});
