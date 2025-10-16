import { useErrors } from '../hooks';

type TUseErrorsInstance = ReturnType<typeof useErrors> | undefined;
export declare class Errors {
    private static _useErrorsInstance;
    static get useErrors(): TUseErrorsInstance;
    static set useErrors(instance: TUseErrorsInstance);
}
export {};
//# sourceMappingURL=Errors.d.ts.map