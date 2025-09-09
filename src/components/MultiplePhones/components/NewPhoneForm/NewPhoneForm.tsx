// import { mdiClose, mdiPlus } from '@mdi/js';
// import Icon from '@mdi/react';
// import { Control } from 'react-hook-form';

// import { Button } from '@/components/Button/Button';
// import { Checkbox } from '@/components/Checkbox/Checkbox';
// import { EButtonVariant, EInputMaskFormat, EPhoneConnectionType } from '@/enums';
// import { Radio } from '../../../Radio/Radio';

// interface INewPhoneFormProps {
// 	control: Control<any>;
// 	isEditable: boolean;
// 	newPhoneAreaCode: string;
// 	handleAction: () => void;
// 	handleCancel: () => void;
// 	isMobile: boolean;
// 	isSinglePhone?: boolean;
// 	errors?: {
// 		newPhone: string;
// 		newPhoneType: string;
// 	};
// 	defaultValue?: string;
// }

// export const NewPhoneForm = ({
// 	isEditable,
// 	newPhoneAreaCode,
// 	handleAction,
// 	handleCancel,
// 	isMobile,
// 	isSinglePhone,
// 	defaultValue = EPhoneConnectionType.mobile,
// }: INewPhoneFormProps) => {
// 	let phoneFormat =
// 		newPhoneAreaCode === '+593'
// 			? EInputMaskFormat.mobile
// 			: isMobile
// 				? EInputMaskFormat.internationalMobile
// 				: EInputMaskFormat.landline;
// 	return (
// 		<>
// 			<div className="w-full">
// 				<div className="flex justify-between items-end">
// 					<Radio
// 						name="newPhoneConnectionType"
// 						label="Tipo de Conexión"
// 						defaultValue={defaultValue}
// 						options={[
// 							{
// 								label: 'Móvil',
// 								value: EPhoneConnectionType.mobile,
// 							},
// 							{
// 								label: 'Fijo',
// 								value: EPhoneConnectionType.landline,
// 							},
// 						]}
// 					/>
// 					{!isSinglePhone && <Checkbox name="isNewPrincipal">¿Es principal?</Checkbox>}
// 				</div>
// 				<div className="flex items-start justify-between gap-4 ">
// 					{/* <InputMask
// 						name="newPhone"
// 						format={phoneFormat}
// 						label="Número de teléfono"
// 						control={control}
// 						rules={REQUIRED}
// 						error={errors?.newPhone || ''}
// 						type={isMobile ? EInput.phone : undefined}
// 						isDisabled={isEmpty(newPhoneAreaCode)}
// 					/> */}

// 					{/* <InputDropdown
// 						name="newPhoneType"
// 						label="Tipo de número de teléfono"
// 						options={getDropdownFormattedOptions(PHONE_TYPES)}
// 						rules={REQUIRED}
// 						control={control}
// 						error={errors?.newPhoneType}
// 					/> */}
// 				</div>
// 				{!isMobile && (
// 					<p className="text-primary-300">Los primeros 2 dígitos corresponden a la región. (02,03,04,05,06,07)</p>
// 				)}
// 				<p className="text-grey-600">{`Ejemplo: ${isMobile ? '978880000' : '072880000'}`}</p>
// 			</div>
// 			<div className="flex justify-end gap-4 mt-4">
// 				<Button onClick={handleAction} icon={<Icon path={mdiPlus} size={1} />}>
// 					{isEditable ? 'Editar' : 'Agregar'}
// 				</Button>
// 				{(!isSinglePhone || (isSinglePhone && isEditable)) && (
// 					<Button onClick={handleCancel} variant={EButtonVariant.text} icon={<Icon path={mdiClose} size={1} />}>
// 						Cancelar
// 					</Button>
// 				)}
// 			</div>
// 		</>
// 	);
// };
