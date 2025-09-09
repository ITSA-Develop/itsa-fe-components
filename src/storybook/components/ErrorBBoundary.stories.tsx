import { ErrorBoundary } from '../../components/ErrorBoundary/ErrorBoundary';

const meta = {
	title: 'Components/ErrorBoundary',
	component: ErrorBoundary,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
};

export default meta;

export const Default = () => {
	return (
		<ErrorBoundary>
			<div>childs</div>
		</ErrorBoundary>
	);
};
