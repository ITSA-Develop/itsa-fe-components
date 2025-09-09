export type TFieldType = 'text' | 'number' | 'textarea' | 'checkbox';
export type TFieldDisplayType =
	| TFieldType
	| 'dropdown'
	| 'currency'
	| 'radio'
	| 'date'
	| 'dateRange'
	| 'file'
	| 'phone'
	| 'switch';

export interface IFieldSchema {
	type: TFieldDisplayType;
	label?: string;
	rules?: { required: string };
	isDisabled?: boolean;
	hidden?: boolean;
	sorted?: boolean;
	excludeFromFields?: boolean;
	excludeFromColumns?: boolean;
}

export interface IEntitySchema {
	fields: {
		[key: string]: IFieldSchema;
	};
}
