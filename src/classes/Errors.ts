import { useErrors } from '../hooks';

type TUseErrorsInstance = ReturnType<typeof useErrors> | undefined;

export class Errors {
	private static _useErrorsInstance: TUseErrorsInstance;

	static get useErrors(): TUseErrorsInstance {
		return this._useErrorsInstance;
	}

	static set useErrors(instance: TUseErrorsInstance) {
		if (!this._useErrorsInstance && !!instance) {
			this._useErrorsInstance = instance;
		}
	}
}
