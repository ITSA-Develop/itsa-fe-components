import { EErrorCodes, EStatus } from '@/enums';
import { isArray, isString, isUndefined } from '@/helpers';
import { UNKNOWN_ERROR } from '@/utils/constants';
import ApiError from '@/utils/errors/ApiError';
import { useNotification } from '../useNotification/useNotification';

export type TErrorTypes = string[] | ApiError | Error | string | unknown;
type TLevel = EStatus;

type TResultError = string | string[];

interface IParseErrors {
	error: TResultError;
	overridden?: string;
	code: EErrorCodes;
}

interface IConfig {
	level?: TLevel;
	statusOverrideMessages?: { [status: number]: string | false };
	fieldsPrefix?: string;
}

const getExtErrorCode = (prefix: EErrorCodes, error?: TErrorTypes) => {
	if (isUndefined(error)) {
		return (prefix + '::UNDEFINED') as EErrorCodes;
	}

	if (isString(error)) {
		return (prefix + '::STRING') as EErrorCodes;
	}

	if (isArray(error)) {
		return (prefix + '::ARRAY') as EErrorCodes;
	}

	return (prefix + '::UNKNOWN') as EErrorCodes;
};

export const useErrors = () => {
	const { openNotification } = useNotification();

	let _level: TLevel = EStatus.error;
	let _fieldKey: string;

	const handleAndNotify = (errors?: unknown, config?: IConfig) => {
		_level = config?.level || _level;
		_fieldKey = config?.fieldsPrefix || _fieldKey;

		const result = parseErrors(errors);

		if (errors instanceof ApiError) {
			const possibleMessage = config?.statusOverrideMessages?.[errors.getStatus()];

			if (!isUndefined(possibleMessage)) {
				if (isString(possibleMessage)) {
					openNotification(EStatus.error, 'Error', possibleMessage || 'Error Indefinido');

					result.overridden = possibleMessage;
				}

				return;
			}
		}

		if (isArray(result.error)) {
			result.error.forEach(error => {
				openNotification(EStatus.error, 'Error', error);
			});
		} else {
			openNotification(EStatus.error, 'Error', result.error);
		}
	};

	const checkAndPrepare = (
		error?: TErrorTypes,
		code?: EErrorCodes,
		config?: { noTranslateArrays?: boolean; withThrow?: boolean },
		errorCode?: string,
	): IParseErrors => {
		const localCode = code || EErrorCodes.UNKNOWN;

		const errorCodeToShow = !!errorCode ? ` [${errorCode}]` : '';

		if (isUndefined(error)) {
			return {
				error: `Error Indefinido - ${errorCodeToShow}`,
				code: localCode,
			};
		}

		if (isString(error)) {
			return {
				error: `${error} - ${errorCodeToShow}`,
				code: localCode,
			};
		}

		if (isArray(error)) {
			return {
				error: config?.noTranslateArrays
					? !!errorCode
						? [...(error as string[]), `[${errorCode}]`]
						: (error as string[])
					: `${error} - ${errorCodeToShow}`,
				code: localCode,
			};
		}

		if (config?.withThrow) {
			throw new Error();
		}

		return {
			error: `Error Indefinido - ${errorCodeToShow}`,
			code: EErrorCodes.UNHANDLED,
		};
	};

	const parseErrors = (error?: TErrorTypes): IParseErrors => {
		try {
			return checkAndPrepare(error, getExtErrorCode(EErrorCodes.INITIAL, error), { withThrow: true });
		} catch {
			if (error instanceof ApiError) {
				const apiErrors = error.getError();

				const errorCodeValue = apiErrors?.error_code;

				try {
					return checkAndPrepare(
						apiErrors,
						getExtErrorCode(EErrorCodes.API_ERROR, apiErrors),
						{ withThrow: true },
						errorCodeValue,
					);
				} catch {
					if (apiErrors.hasOwnProperty('message')) {
						const messageValueError = apiErrors.message;

						return checkAndPrepare(messageValueError, EErrorCodes.MESSAGE_ELSE, undefined, errorCodeValue);
					}
				}
			}

			if (error instanceof Error) {
				if (isString(error.message)) {
					return checkAndPrepare(error.message, EErrorCodes.OTHERS);
				}
			}

			return checkAndPrepare('Mensaje Indefinido', EErrorCodes.ELSE);
		}
	};

	const tryAndHandle = (
		tryFunction?: () => void,
		finallyFunction?: () => void,
		errorResponse = false,
		level?: TLevel,
	) => {
		try {
			if (typeof tryFunction === 'function') {
				return tryFunction();
			}
		} catch (error) {
			handleAndNotify(error, { level });

			return errorResponse;
		} finally {
			if (typeof finallyFunction === 'function') {
				finallyFunction();
			}
		}
	};

	const getStatusCodeAndMessage = (errors?: unknown): { code: number; message: TResultError } | undefined => {
		if (errors instanceof ApiError) {
			return {
				code: errors.getStatus(),
				message: errors.getError().message,
			};
		}
		return undefined;
	};

	return { handleAndNotify, tryAndHandle, parseErrors, getStatusCodeAndMessage };
};

type ErrorResponse = {
	response?: {
		data?: {
			error?: {
				message?: string;
				details?: string | string[];
			};
		};
	};
	message?: string;
};

type ErrorDataShape = {
	error?: {
		message?: string;
		details?: string | string[];
	};
	message?: string;
	details?: string | string[];
};

export const useHandleStoreError = () => {
	const { handleAndNotify } = useErrors();

	const handleError = (error: unknown, customLevel: EStatus = EStatus.error): void => {
		let message = '';
		let details = '';
		let finalMessage = UNKNOWN_ERROR;

		if (typeof error === 'object' && error !== null) {
			const typedError = error as ErrorResponse;
			const responseData = typedError.response?.data as ErrorDataShape;

			if (responseData?.error?.message) {
				message = responseData.error.message;
			} else if (responseData?.message) {
				message = responseData.message;
			} else if (typedError.message) {
				message = typedError.message;
			}

			const rawDetails = responseData?.error?.details || responseData?.details;
			if (rawDetails) {
				details = Array.isArray(rawDetails) ? rawDetails.join(' - ') : rawDetails;
			}

			if (message || details) {
				finalMessage = `${message}${details ? `: ${details}` : ''}`;
			}
		}

		handleAndNotify(finalMessage, { level: customLevel });
	};

	return handleError;
};
