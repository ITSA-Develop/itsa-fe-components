import { DynamicResponsiveFormUIView } from "./DynamicResponsiveFormUI.view";
import {
	useDynamicResponsiveFormUI,
} from "./DynamicResponsiveFormUI.hook";
import { DefaultValues, FieldValues } from "react-hook-form";
import { z } from "zod";
import type { TFormSchemaBase } from "./constant-test";

type DynamicSchema = z.ZodType<FieldValues, FieldValues>;

export interface IDynamicResponsiveFormUIProps<TSchema extends DynamicSchema> {
	schema: TFormSchemaBase[];
	validationSchema: TSchema;
	defaultValues?: DefaultValues<z.input<TSchema>>;
	mode?: "onChange" | "onBlur" | "onSubmit" | "onTouched" | "all";
}

export const DynamicResponsiveFormUI = <TSchema extends DynamicSchema>(
	props: IDynamicResponsiveFormUIProps<TSchema>,
) => {
	const hook = useDynamicResponsiveFormUI(props);
	return <DynamicResponsiveFormUIView {...hook} schema={props.schema} />;
};




