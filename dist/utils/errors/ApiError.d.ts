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
declare class ApiError extends Error {
    cause: unknown;
    constructor(custom: XMLHttpRequest | IErrorApiError | unknown, ...params: any);
    getStatus(): number;
    getError(): any;
    getResponse(): AxiosResponse;
    isNotFound(): boolean;
}
export default ApiError;
//# sourceMappingURL=ApiError.d.ts.map