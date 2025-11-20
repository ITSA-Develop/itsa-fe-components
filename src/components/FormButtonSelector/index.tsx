import { useModalResponsive } from '@/hooks';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { ReactNode } from 'react';
import { FormLabel } from '../FormLabel';
import { FormLabelError } from '../FormLabelError';
import { Controller, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { Control } from 'react-hook-form';
export interface IFormButtonSelectorProps<TFieldValues extends FieldValues> {
	title: string;
	name: Path<TFieldValues>;
	placeholder?: string;
	children: ReactNode;
	control: Control<TFieldValues>;
	value?: string;
	closable?: boolean;
}

export const FormButtonSelector = <TFieldValues extends FieldValues>({
	title,
	value,
	placeholder = 'Seleccionar',
	children,
	control,
	name,
	closable = false,
}: IFormButtonSelectorProps<TFieldValues>) => {
	const { openModal } = useModalResponsive();

	const handleOpenModal = () => {
		openModal({
			title: 'Selector',
			content: children,
			height: 'auto',
		});
	};

	const normalizedValue = (field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>) => {
		if (value) {
			return value;
		}
		return field.value ? field.value : placeholder;
	};
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				const errorMsg = fieldState.error?.message as string | undefined;
				return (
					<div className="flex flex-col gap-1">
						<FormLabel label={title} />
						<div className={`${closable ? 'flex items-center' : ''}`}>
							<Button
								variant="outlined"
								color={errorMsg ? 'danger' : undefined}
								block={!closable}
								onClick={handleOpenModal}
								className={`${field.value ? 'flex justify-start' : 'flex justify-start text-gray-400'} ${closable ? `${field.value ? 'flex-1 rounded-r-none' : 'flex-1'}` : ''} hover:!text-primary-600 hover:!border-primary-600 transition-colors`}
							>
								{normalizedValue(field)}
							</Button>
							{closable && field.value && (
								<Button
									onClick={() => field.onChange(undefined)}
									type="default"
									aria-label="Limpiar selección"
									icon={<CloseOutlined />}
									className="rounded-l-none border-l-0 hover:!text-primary-600 hover:!border-primary-600 transition-colors"
								/>
							)}
						</div>
						{errorMsg && <FormLabelError label={errorMsg} />}
					</div>
				);
			}}
		/>
	);
};
