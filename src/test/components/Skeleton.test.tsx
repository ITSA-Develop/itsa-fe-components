import { render } from '@testing-library/react';
import { Skeleton } from '../../components/Skeleton/Skeleton';

describe('Skeleton component', () => {
	it('renders the Skeleton with active class by default', () => {
		const { container } = render(<Skeleton />);
		const skeletonDiv = container.querySelector('.ant-skeleton');
		expect(skeletonDiv).toBeInTheDocument();
		expect(skeletonDiv).toHaveClass('ant-skeleton-active');
		expect(container).toMatchSnapshot();
	});

	it('passes extra props to AntSkeleton', () => {
		const { container } = render(<Skeleton paragraph={{ rows: 3 }} />);
		const paragraphs = container.querySelectorAll('.ant-skeleton-paragraph > li');
		expect(paragraphs.length).toBe(3);
		expect(container).toMatchSnapshot();
	});
});
