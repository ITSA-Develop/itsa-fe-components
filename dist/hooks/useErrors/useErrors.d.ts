import { EErrorCodes, EStatus } from '../../enums';
import { default as ApiError } from '../../utils/errors/ApiError';

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
    statusOverrideMessages?: {
        [status: number]: string | false;
    };
    fieldsPrefix?: string;
}
export declare const useErrors: () => {
    handleAndNotify: (errors?: unknown, config?: IConfig) => void;
    tryAndHandle: (tryFunction?: () => void, finallyFunction?: () => void, errorResponse?: boolean, level?: TLevel) => boolean | void;
    parseErrors: (error?: TErrorTypes) => IParseErrors;
    getStatusCodeAndMessage: (errors?: unknown) => {
        code: number;
        message: TResultError;
    } | undefined;
};
export declare const useHandleStoreError: () => (error: unknown, customLevel?: EStatus) => void;
export {};
//# sourceMappingURL=useErrors.d.ts.map