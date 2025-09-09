// TODO: refactor after design is RTD
// @ts-nocheck
import { mdiClose, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';

import { Button } from '@/components/Button/Button';
import { Checkbox } from '@/components/Checkbox/Checkbox';
import { EButtonVariant } from '@/enums';

interface INewEmailFormProps {
	emailValue: string;
	isEditable: boolean;
	handleAction: () => void;
	handleCancel: () => void;
	isSingleEmail?: boolean;
	errors?: {
		newEmail: string;
		newEmailType: string;
	};
}
export const NewEmailForm = ({
	emailValue,
	isEditable,
	handleAction,
	handleCancel,
	isSingleEmail,
	errors,
}: INewEmailFormProps) => {
	return (
		<>
			<div className="w-full">
				<div className="flex justify-end">
					{!isSingleEmail && <Checkbox name="isNewPrincipal">¿Es principal?</Checkbox>}
				</div>
				<div className="flex items-start justify-between gap-4 ">
					{/* <InputEmail
						name="newEmail"
						label="Correo Electrónico"
						rules={REQUIRED}
						defaultValue={emailValue}
						error={
							errors?.newEmail || (emailValue && !isValidEmailFormat(emailValue)) ? INPUT_ERRORS.invalidFormat : ''
						}
					/> */}
					{/* <InputDropdown
						name="newEmailType"
						label="Tipo de Correo Electrónico"
						options={getDropdownFormattedOptions(EMAIL_TYPES)}
						rules={REQUIRED}
						control={control}
						error={errors?.newEmailType}
					/> */}
				</div>
			</div>
			<div className="flex justify-end gap-4 mt-4">
				<Button onClick={handleAction} icon={<Icon path={mdiPlus} size={1} />}>
					{isEditable ? 'Editar' : 'Agregar'}
				</Button>
				{!isSingleEmail && (
					<Button onClick={handleCancel} variant={EButtonVariant.text} icon={<Icon path={mdiClose} size={1} />}>
						Cancelar
					</Button>
				)}
			</div>
		</>
	);
};
