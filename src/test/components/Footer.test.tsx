import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Footer, IFooterProps } from '../../components/Footer/Footer';

describe('Footer component', () => {
	const defaultProps: IFooterProps = {
		version: 'v1.2.3',
		text: 'Copyright 2025',
	};

	it('renders the text and version correctly', () => {
		const { container } = render(<Footer {...defaultProps} />);

		expect(screen.getByText(defaultProps.text)).toBeInTheDocument();

		expect(screen.getByText(defaultProps.version)).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});
