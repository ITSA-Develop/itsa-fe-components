import { TextAreaProps } from 'antd/es/input';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { FormLabel } from '@/components/FormLabel';
import { FormLabelError } from '@/components/FormLabelError';
import { Textarea } from '@/components/Textarea/Textarea';
import { memo, useId } from 'react';
import { TTextTransform } from '@/types';

const applyTextTransform = (value: string, transform: TTextTransform): string => {
	if (transform === 'uppercase') return value.toUpperCase();
	if (transform === 'lowercase') return value.toLowerCase();
	return value;
};

const restoreTextareaSelection = (textarea: HTMLTextAreaElement, start: number | null, end: number | null) => {
	if (start === null || end === null) return;

	requestAnimationFrame(() => {
		textarea.setSelectionRange(start, end);
	});
};

export interface IFormTextareaProps<TFieldValues extends FieldValues> extends Omit<TextAreaProps, 'form' | 'name'> {
  name: Path<TFieldValues>;
  label: string;
  control: Control<TFieldValues>;
  showCaracteres?: boolean;
  placeholder?: string;
  errorIdentificationExists?: string;
  autoComplete?: string;
  disabled?: boolean;
  textTransform?: TTextTransform;
}

const FormTextareaComponent = <TFieldValues extends FieldValues>({
  name,
  label,
  control,
  placeholder,
  errorIdentificationExists,
  autoComplete = 'off',
  disabled = false,
  textTransform = 'uppercase',
  ...rest
}: IFormTextareaProps<TFieldValues>) => {
  const id = useId();
  const errId = `${id}-error`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const errorMsg = fieldState.error?.message as string | undefined;
        const validatMsg = errorMsg ?? errorIdentificationExists ?? undefined;

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
          const textarea = e.target;
          const { selectionStart, selectionEnd } = textarea;
          const transformedValue = applyTextTransform(textarea.value ?? '', textTransform);

          field.onChange(transformedValue);

          if (textTransform === 'uppercase' || textTransform === 'lowercase') {
            restoreTextareaSelection(textarea, selectionStart, selectionEnd);
          }
        };

        const handleOnBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
          field.onBlur();
          field.onChange(applyTextTransform(e.target.value ?? '', textTransform));
        };

        return (
          <div className="flex flex-col gap-1">
            <FormLabel label={label} htmlFor={id} />
            <Textarea
              id={id as string}
              value={field.value}
              onChange={handleChange}
              onBlur={handleOnBlur}
              name={field.name}
              status={validatMsg !== undefined ? 'error' : undefined}
              aria-invalid={validatMsg !== undefined}
              aria-describedby={validatMsg !== undefined ? errId : undefined}
              placeholder={placeholder}
              autoComplete={autoComplete}
              disabled={disabled}
              style={
                textTransform === 'uppercase' || textTransform === 'lowercase'
                  ? undefined
                  : { textTransform }
              }
              {...rest}
            />
            {validatMsg !== undefined && <FormLabelError label={validatMsg} id={errId} />}
          </div>
        );
      }}
    />
  );
};

export const FormTextarea = memo(FormTextareaComponent) as typeof FormTextareaComponent & {
  displayName?: string;
};

FormTextarea.displayName = 'FormTextarea';
