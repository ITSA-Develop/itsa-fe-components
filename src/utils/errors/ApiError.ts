import { findLastChild } from '@/helpers';
import { AxiosResponse } from 'axios';

export interface IErrorApiError {
	message?: string;
	response?: {
		message?: string;
		data?: {
			message: unknown;
			error_code?: string;
			status?: number;
		};
	};
}

class ApiError extends Error {
	cause;

	constructor(custom: XMLHttpRequest | IErrorApiError | unknown, ...params: any) {
		super(...params);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ApiError);
		}

		this.cause = custom;
	}

	getStatus(): number {
		return this.getResponse()?.status;
	}

	getError() {
		return this.getResponse()?.data || this.getResponse();
	}

	getResponse(): AxiosResponse {
		const lastCause = findLastChild(this, 'cause');

		return lastCause?.response || lastCause;
	}

	isNotFound(): boolean {
		return this.getStatus() === 404;
	}
}

export default ApiError;
