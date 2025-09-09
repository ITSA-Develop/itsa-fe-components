import { LayoutComponentProps } from '../types';

export const LayoutComponent = ({ component }: LayoutComponentProps) => {
	if (!component) {
		throw new Error('Component is not defined');
	}

	return component;
};
