// import { mdiPencil, mdiPlus } from '@mdi/js';
// import Icon from '@mdi/react';
// import clx from 'classnames';
// import { useEffect, useState } from 'react';
// import { Control, UseFormReset, UseFormSetValue, UseFormWatch } from 'react-hook-form';

// import { ActionPanel } from '@/components/ActionPanel/ActionPanel';
// import { Badge } from '@/components/Badge/Badge';
// import { Button } from '@/components/Button/Button';
// import { Divider } from '@/components/Divider/Divider';
// import { Fade } from '@/components/Fade/Fade';
// import { PHONE_TYPES } from '@/constants/dropdownOptions';
// import { EButtonVariant, EPhoneConnectionType, EPhoneType, ESize, EStatus } from '@/enums';
// import { getMaskValidFormat, isEmpty } from '@/helpers';
// import { useModalStore, useNotification } from '@/hooks';
// import { IMultiplePhoneItem } from '@/interfaces';
// import { INPUT_ERRORS } from '@/utils/errors/errorMessages';
// import { Tag } from '../Tag/Tag';
// import { NewPhoneForm } from './components/NewPhoneForm/NewPhoneForm';

// export interface IMultiplePhonesProps {
// 	label: string;
// 	control: Control<any>;
// 	watch: UseFormWatch<any>;
// 	setValue: UseFormSetValue<any>;
// 	resetField: UseFormReset<any>;
// 	phones: IMultiplePhoneItem[];
// 	isEmptyHighlight?: boolean;
// }

// interface IMultiplePhoneWithId extends IMultiplePhoneItem {
// 	id: number;
// }

// export const MultiplePhones = ({
// 	label,
// 	phones,
// 	control,
// 	watch,
// 	setValue,
// 	resetField,
// 	isEmptyHighlight,
// }: IMultiplePhonesProps) => {
// 	const { openModal, closeModal } = useModalStore();
// 	const { openNotification } = useNotification();
// 	const [localPhones, setLocalPhones] = useState(phones);
// 	const [showInput, setShowInput] = useState(false);
// 	const [selectedPhone, setSelectedPhone] = useState<IMultiplePhoneWithId | null>(null);
// 	const [errors, setErrors] = useState({
// 		newPhone: '',
// 		newPhoneType: '',
// 	});

// 	const { newPhoneConnectionType, newPhone, newPhoneType, isNewPrincipal, newPhoneAreaCode } = watch();

// 	const principalPhone = localPhones?.find(item => item.isPrincipal);

// 	const isMobile = newPhoneConnectionType === EPhoneConnectionType.mobile || !newPhoneConnectionType;

// 	useEffect(() => {
// 		if (!isEmpty(phones) && isEmpty(localPhones)) {
// 			setLocalPhones(phones);
// 		}
// 	}, [phones]);

// 	useEffect(() => {
// 		if (isMobile && !newPhoneAreaCode) {
// 			setValue('newPhoneAreaCode', '+593');
// 		}
// 	}, [newPhoneAreaCode]);

// 	const handleEditPhone = (phoneToEdit: IMultiplePhoneItem, indexElement: number) => {
// 		const { phone, phoneType, isPrincipal, phoneConnectionType, phoneAreaCode } = phoneToEdit;
// 		setValue('newPhoneConnectionType', phoneConnectionType ?? EPhoneConnectionType.mobile);
// 		setValue('newPhoneAreaCode', phoneAreaCode);
// 		setValue('newPhone', phone);
// 		setValue('newPhoneType', phoneType);
// 		setValue('isNewPrincipal', isPrincipal);
// 		setSelectedPhone({ id: indexElement, ...phoneToEdit });
// 		setShowInput(true);
// 	};

// 	const handleConfirmEdit = () => {
// 		if (selectedPhone === null) return;

// 		const updatedPhones = localPhones?.map((item, index) =>
// 			index === selectedPhone.id
// 				? {
// 						...item,
// 						phone: newPhone,
// 						phoneType: newPhoneType,
// 						phoneAreaCode: newPhoneAreaCode,
// 						isPrincipal: isNewPrincipal,
// 					}
// 				: item,
// 		);

// 		let finalPhones = updatedPhones;

// 		if (isNewPrincipal) {
// 			const principal = updatedPhones[selectedPhone.id];

// 			if (principal) {
// 				finalPhones = [principal, ...updatedPhones.filter((_, index) => index !== selectedPhone.id)];
// 			}
// 		}

// 		setLocalPhones(finalPhones);
// 		setValue('phones', finalPhones);
// 		setShowInput(false);
// 		setSelectedPhone(null);
// 		resetField('newPhoneConnectionType');
// 		resetField('newPhoneAreaCode');
// 		resetField('newPhone');
// 		resetField('newPhoneType');
// 		resetField('isNewPrincipal');
// 	};

// 	const handleConfirmDelete = (phoneToDelete: string) => {
// 		setLocalPhones(prevLocalPhones => {
// 			return prevLocalPhones.filter(item => item.phone !== phoneToDelete);
// 		});
// 		closeModal();
// 	};

// 	const handleDeletePhone = (phoneToDelete: string) => {
// 		const actions = {
// 			secondaryAction: {
// 				label: 'Cancelar',
// 				onClick: closeModal,
// 			},
// 			primaryAction: {
// 				label: 'Si',
// 				onClick: () => handleConfirmDelete(phoneToDelete),
// 			},
// 		};
// 		openModal(
// 			'Eliminación de número de teléfono',
// 			'sm',
// 			`¿Está seguro que desea eliminar el número de teléfono ${phoneToDelete}?`,
// 			actions,
// 		);
// 	};

// 	const handleAssignAsPrincipal = (phoneAssignedAsPrincipal: string) => {
// 		const updatedData = localPhones?.map(item => {
// 			if (item.phone === phoneAssignedAsPrincipal) {
// 				return {
// 					...item,
// 					isPrincipal: true,
// 				};
// 			}
// 			return {
// 				...item,
// 				isPrincipal: false,
// 			};
// 		});
// 		setLocalPhones(updatedData);
// 		setValue('phones', updatedData);
// 	};

// 	const handleReset = () => {
// 		setErrors({
// 			newPhone: '',
// 			newPhoneType: '',
// 		});
// 		resetField('newPhone');
// 		resetField('newPhone');
// 		resetField('newPhoneType');
// 		resetField('isNewPrincipal');
// 		resetField('newPhoneConnectionType');
// 		resetField('newPhoneAreaCode');
// 	};

// 	const handleAddPhone = () => {
// 		const isValidForm = newPhone && newPhoneType;
// 		if (!isValidForm) {
// 			setErrors({
// 				newPhone: INPUT_ERRORS.required,
// 				newPhoneType: INPUT_ERRORS.required,
// 			});
// 		} else {
// 			const isValidPhone = getMaskValidFormat(newPhone);
// 			if (!isValidPhone) {
// 				setErrors({
// 					newPhone: INPUT_ERRORS.invalidFormat,
// 					newPhoneType: '',
// 				});
// 			} else {
// 				if (localPhones?.find((item: IMultiplePhoneItem) => item.phone === newPhone)) {
// 					openNotification(EStatus.warning, 'Atención', INPUT_ERRORS.repeatedValue);
// 				} else {
// 					if (isNewPrincipal || !principalPhone) {
// 						const updatedLocalPhones = localPhones?.map(item =>
// 							item.isPrincipal ? { ...item, isPrincipal: false } : item,
// 						);

// 						setLocalPhones([
// 							...updatedLocalPhones,
// 							{
// 								phoneConnectionType: newPhoneConnectionType,
// 								phoneAreaCode: newPhoneAreaCode,
// 								phoneType: newPhoneType,
// 								phone: `${newPhoneConnectionType === EPhoneConnectionType.mobile || !newPhoneConnectionType ? newPhoneAreaCode : ''}${newPhone}`,
// 								isPrincipal: true,
// 							},
// 						]);
// 					} else {
// 						setLocalPhones([
// 							...localPhones,
// 							{
// 								phoneConnectionType: newPhoneConnectionType,
// 								phoneAreaCode: newPhoneAreaCode,
// 								phoneType: newPhoneType,
// 								phone: `${newPhoneConnectionType === EPhoneConnectionType.mobile || !newPhoneConnectionType ? newPhoneAreaCode : ''}${newPhone}`,
// 								isPrincipal: false,
// 							},
// 						]);
// 					}
// 					handleCancel();
// 				}
// 			}
// 		}
// 	};

// 	const handleCancel = () => {
// 		setShowInput(false);
// 		setSelectedPhone(null);
// 		handleReset();
// 	};

// 	useEffect(() => {
// 		setValue('phones', localPhones);
// 	}, [localPhones]);

// 	if (!principalPhone) {
// 		return (
// 			<div
// 				className={clx(
// 					'space-y-2 border p-4 rounded-xl w-full',
// 					isEmptyHighlight ? 'border-red-600' : 'border-grey-200',
// 				)}
// 			>
// 				<p className="mb-6">{label}</p>
// 				<Divider />
// 				<NewPhoneForm
// 					newPhoneAreaCode={newPhoneAreaCode}
// 					isEditable={Boolean(selectedPhone)}
// 					control={control}
// 					handleAction={Boolean(selectedPhone) ? handleConfirmEdit : handleAddPhone}
// 					handleCancel={handleCancel}
// 					errors={errors}
// 					isMobile={isMobile}
// 					isSinglePhone
// 					defaultValue={newPhoneConnectionType}
// 				/>
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className="space-y-2 border border-grey-200 p-4 rounded-xl w-full">
// 			<p className="mb-6">{label}</p>
// 			<Divider />
// 			<div className="flex justify-between items-center">
// 				<Badge content={principalPhone?.phoneType ? PHONE_TYPES[principalPhone?.phoneType as EPhoneType] : ''}>
// 					<p className="pt-2">{principalPhone?.phone}</p>
// 				</Badge>
// 				<div className="flex items-center gap-2">
// 					<Tag>Principal</Tag>
// 					{!Boolean(selectedPhone) && (
// 						<Button icon={mdiPencil} onClick={() => handleEditPhone(principalPhone, 0)} size={ESize.small} />
// 					)}
// 				</div>
// 			</div>
// 			{localPhones.length > 1 && <Divider />}
// 			<div className="pb-4">
// 				{localPhones?.map((item, index) => {
// 					if (principalPhone?.phone === item.phone) {
// 						return null;
// 					}
// 					return (
// 						<div key={`multiple-phones-${item.phone}-${index}`} className="flex justify-between items-center">
// 							<Badge content={PHONE_TYPES[item.phoneType as EPhoneType]}>
// 								<p className="pt-2">{item?.phone}</p>
// 							</Badge>
// 							<ActionPanel
// 								items={[
// 									{
// 										key: 'multiple-phone-as-principal',
// 										label: 'Asignar como Principal',
// 										onClick: () => handleAssignAsPrincipal(item.phone),
// 									},
// 									{
// 										key: 'multiple-phone-edit',
// 										label: 'Editar',
// 										onClick: () => handleEditPhone(item, index),
// 									},
// 									{
// 										key: 'multiple-phone-delete',
// 										label: 'Eliminar',
// 										onClick: () => handleDeletePhone(item.phone),
// 									},
// 								]}
// 							/>
// 						</div>
// 					);
// 				})}
// 			</div>

// 			<Fade
// 				showTransition={!showInput}
// 				duration={500}
// 				transitionChildren={
// 					<div className="flex justify-end">
// 						<Button
// 							onClick={() => setShowInput(true)}
// 							variant={EButtonVariant.text}
// 							icon={<Icon path={mdiPlus} size={1} />}
// 						>
// 							Agregar
// 						</Button>
// 					</div>
// 				}
// 			>
// 				{showInput && (
// 					<NewPhoneForm
// 						newPhoneAreaCode={newPhoneAreaCode}
// 						isEditable={Boolean(selectedPhone)}
// 						control={control}
// 						handleAction={Boolean(selectedPhone) ? handleConfirmEdit : handleAddPhone}
// 						handleCancel={handleCancel}
// 						errors={errors}
// 						isSinglePhone={selectedPhone?.isPrincipal}
// 						isMobile={isMobile}
// 						defaultValue={newPhoneConnectionType}
// 					/>
// 				)}
// 			</Fade>
// 		</div>
// 	);
// };
