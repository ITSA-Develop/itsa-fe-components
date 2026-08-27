import { Control, FieldValues, UseFormReturn } from "react-hook-form";
import type { TFormSchemaBase } from "./constant-test";

export interface IDynamicResponsiveFormUIViewProps<
	TInput extends FieldValues,
	TOutput extends FieldValues,
> {
	schema: TFormSchemaBase[];
	control: Control<TInput, unknown, TOutput>;
	form: UseFormReturn<TInput, unknown, TOutput>;
}

export const DynamicResponsiveFormUIView = <
	TInput extends FieldValues,
	TOutput extends FieldValues,
>({
	schema: _schema,
	control: _control,
	form,
}: IDynamicResponsiveFormUIViewProps<TInput, TOutput>) => {
	return (
		<div>
			<h1>DynamicResponsiveFormUI</h1>
			<p>Campos registrados: {Object.keys(form.getValues()).length}</p>
		</div>
	);
};
