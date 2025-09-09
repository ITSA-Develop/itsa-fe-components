import { render } from '@testing-library/react';
import { Redirect } from '../../components/Redirect/Redirect';

beforeAll(() => {
	globalThis.location = {
		...window.location,
		assign: vi.fn(),
	};
});

describe('Redirect Component', () => {
	const redirectUrl = 'https://example.com';
	it('renders footer snapshot', () => {
		const { container } = render(<Redirect redirect={redirectUrl} />);
		expect(container).toMatchSnapshot();
	});

	it('should not redirect if no URL is provided', () => {
		render(<Redirect redirect="" />);
		expect(globalThis.location.assign).not.toHaveBeenCalled();
	});
});

afterEach(() => {
	vi.clearAllMocks();
});
