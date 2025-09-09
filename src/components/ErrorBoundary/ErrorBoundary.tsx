import React, { ReactNode } from 'react';
import { Redirect } from '../Redirect/Redirect';

// Note: this needs to be a class
// TODO: implement this class later on
interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error('Error Boundary Hit:\n', error, errorInfo);
	}

	// Note: To Avoid infinite loop: redirect just once
	redirectOnce = false;

	render() {
		const { hasError } = this.state;
		const { children } = this.props;

		if (hasError && process.env.REACT_APP_ENV !== 'development' && !this.redirectOnce) {
			this.redirectOnce = true; // Note: making sure we redirect just once
			return <Redirect redirect="/error" />;
		}

		return children;
	}
}
