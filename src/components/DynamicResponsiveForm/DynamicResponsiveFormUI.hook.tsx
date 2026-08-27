import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Control,
	FieldValues,
	UseFormReturn,
	useForm,
} from "react-hook-form";
import type { IDynamicResponsiveFormUIProps } from "./DynamicResponsiveFormUI.controller";

type DynamicSchema = z.ZodType<FieldValues, FieldValues>;

export interface IDynamicResponsiveFormUIHookReturn<TSchema extends DynamicSchema> {
	control: Control<z.input<TSchema>, unknown, z.output<TSchema>>;
	form: UseFormReturn<z.input<TSchema>, unknown, z.output<TSchema>>;
}

export const useDynamicResponsiveFormUI = <TSchema extends DynamicSchema>(
	props: IDynamicResponsiveFormUIProps<TSchema>,
): IDynamicResponsiveFormUIHookReturn<TSchema> => {
	const { validationSchema, defaultValues, mode = "onBlur" } = props;

	const form = useForm<z.input<TSchema>, unknown, z.output<TSchema>>({
		resolver: zodResolver(validationSchema),
		defaultValues,
		mode,
	});

	return {
		control: form.control,
		form,
	};
};
