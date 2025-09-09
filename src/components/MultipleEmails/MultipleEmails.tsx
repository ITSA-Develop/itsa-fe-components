// import { mdiPencil, mdiPlus } from '@mdi/js';
// import Icon from '@mdi/react';
// import clx from 'classnames';
// import { useEffect, useState } from 'react';

// import { Badge } from '@/components/Badge/Badge';
// import { Button } from '@/components/Button/Button';
// import { Divider } from '@/components/Divider/Divider';
// import { Fade } from '@/components/Fade/Fade';
// import { EMAIL_TYPES } from '@/constants/dropdownOptions';
// import { EButtonVariant, EEmailType, ESize, EStatus } from '@/enums';
// import { isEmpty } from '@/helpers';
// import { isValidEmailFormat } from '@/helpers/isEmailValidFormat';
// import { useModalStore, useNotification } from '@/hooks';
// import { IMultipleEmailItem } from '@/interfaces';
// import { INPUT_ERRORS } from '@/utils/errors/errorMessages';
// import { Tag, Typography } from 'antd';
// import { ActionPanel } from '../ActionPanel/ActionPanel';
// import { NewEmailForm } from './components/NewEmailForm/NewEmailForm';

// export interface IMultipleEmailsProps {
// 	label: string;
// 	emails: IMultipleEmailItem[];
// 	isEmptyHighlight?: boolean;
// }

// interface IMultipleEmailWithId extends IMultipleEmailItem {
// 	id: number;
// }

// export const MultipleEmails = ({
// 	label,
// 	emails,
// 	isEmptyHighlight,
// }: IMultipleEmailsProps) => {
// 	const { openModal, closeModal } = useModalStore();
// 	const { openNotification } = useNotification();
// 	const [localEmails, setLocalEmails] = useState(emails);
// 	const [showInput, setShowInput] = useState(false);
// 	const [selectedEmail, setSelectedEmail] = useState<IMultipleEmailWithId | null>(null);
// 	const [errors, setErrors] = useState({
// 		newEmail: '',
// 		newEmailType: '',
// 	});

// 	const { newEmail, newEmailType, isNewPrincipal } = watch();
// 	const principalEmail = localEmails?.find(item => item.isPrincipal);

// 	useEffect(() => {
// 		if (!isEmpty(emails) && isEmpty(localEmails)) {
// 			setLocalEmails(emails);
// 		}
// 	}, [emails]);

// 	const handleEditEmail = (emailToEdit: IMultipleEmailItem, indexElement: number) => {
// 		const { email, emailType, isPrincipal } = emailToEdit;
// 		setValue('newEmail', email);
// 		setValue('newEmailType', emailType);
// 		setValue('isNewPrincipal', isPrincipal);
// 		setSelectedEmail({ id: indexElement, ...emailToEdit });
// 		setShowInput(true);
// 	};

// 	const handleConfirmEdit = () => {
// 		if (selectedEmail === null) return;

// 		const updatedEmails = localEmails.map((item, index) =>
// 			index === selectedEmail.id
// 				? {
// 						...item,
// 						email: newEmail,
// 						emailType: newEmailType,
// 						isPrincipal: isNewPrincipal,
// 					}
// 				: item,
// 		);

// 		let finalEmails = updatedEmails;

// 		if (isNewPrincipal) {
// 			const principal = updatedEmails[selectedEmail.id];

// 			if (principal) {
// 				finalEmails = [principal, ...updatedEmails.filter((_, index) => index !== selectedEmail.id)];
// 			}
// 		}

// 		setLocalEmails(finalEmails);
// 		setValue('emails', finalEmails);
// 		setShowInput(false);
// 		setSelectedEmail(null);
// 		resetField('newEmail');
// 		resetField('newEmailType');
// 		resetField('isNewPrincipal');
// 	};

// 	const handleConfirmDelete = (emailToDelete: string) => {
// 		setLocalEmails(prevLocalEmails => {
// 			return prevLocalEmails.filter(item => item.email !== emailToDelete);
// 		});
// 		closeModal();
// 	};

// 	const handleDeleteEmail = (emailToDelete: string) => {
// 		const actions = {
// 			secondaryAction: {
// 				label: 'Cancelar',
// 				onClick: closeModal,
// 			},
// 			primaryAction: {
// 				label: 'Si',
// 				onClick: () => handleConfirmDelete(emailToDelete),
// 			},
// 		};
// 		openModal(
// 			'Eliminación de dirección de Correo Electrónico',
// 			'sm',
// 			`¿Está seguro que desea eliminar el correo Electrónico ${emailToDelete}?`,
// 			actions,
// 		);
// 	};

// 	const handleAssignAsPrincipal = (emailAssignedAsPrincipal: string) => {
// 		const updatedData = localEmails.map(item => {
// 			if (item.email === emailAssignedAsPrincipal) {
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
// 		setLocalEmails(updatedData);
// 		setValue('emails', updatedData);
// 	};

// 	const handleReset = () => {
// 		setErrors({
// 			newEmail: '',
// 			newEmailType: '',
// 		});
// 		resetField('newEmail');
// 		resetField('newEmailType');
// 		resetField('isNewPrincipal');
// 	};

// 	const handleAddEmail = () => {
// 		const isValidForm = newEmail && newEmailType;
// 		if (!isValidForm) {
// 			setErrors({
// 				newEmail: !newEmail ? 'Requerido' : '',
// 				newEmailType: !newEmailType ? 'Requerido' : '',
// 			});
// 		} else {
// 			const isValidEmail = isValidEmailFormat(newEmail);
// 			if (isValidEmail) {
// 				if (localEmails.find((item: IMultipleEmailItem) => item.email === newEmail)) {
// 					openNotification(EStatus.warning, 'Atención', INPUT_ERRORS.repeatedValue);
// 				} else {
// 					if (isNewPrincipal || !principalEmail) {
// 						const updatedLocalEmails = localEmails.map(item =>
// 							item.isPrincipal ? { ...item, isPrincipal: false } : item,
// 						);

// 						setLocalEmails([...updatedLocalEmails, { emailType: newEmailType, email: newEmail, isPrincipal: true }]);
// 					} else {
// 						setLocalEmails(prevLocalEmails => [
// 							...prevLocalEmails,
// 							{ emailType: newEmailType, email: newEmail, isPrincipal: false },
// 						]);
// 					}
// 					handleCancel();
// 				}
// 			}
// 		}
// 	};

// 	const handleCancel = () => {
// 		setShowInput(false);
// 		setSelectedEmail(null);
// 		handleReset();
// 	};

// 	useEffect(() => {
// 		setValue('emails', localEmails);
// 	}, [localEmails]);

// 	if (!principalEmail) {
// 		return (
// 			<div
// 				className={clx(
// 					'space-y-2 border p-4 rounded-xl w-full',
// 					isEmptyHighlight ? 'border-red-600' : 'border-grey-200',
// 				)}
// 			>
// 				<p className="mb-6">{label}</p>
// 				<Divider />
// 				<NewEmailForm
// 					isEditable={Boolean(selectedEmail)}
// 					emailValue={newEmail}
// 					handleAction={Boolean(selectedEmail) ? handleConfirmEdit : handleAddEmail}
// 					handleCancel={handleCancel}
// 					errors={errors}
// 					isSingleEmail
// 				/>
// 			</div>
// 		);
// 	}
// 	return (
// 		<div className="space-y-2 border border-grey-200 p-4 rounded-xl w-full">
// 			<Typography className="mb-6">{label}</Typography>
// 			<Divider />
// 			<div className="flex justify-between items-center">
// 				<Badge content={principalEmail?.emailType ? EMAIL_TYPES[principalEmail?.emailType as EEmailType] : ''}>
// 					<Typography className="pt-2">{principalEmail?.email}</Typography>
// 				</Badge>
// 				<div className="flex items-center gap-2">
// 					<Tag>Principal</Tag>
// 					{!Boolean(selectedEmail) && (
// 						<Button icon={mdiPencil} onClick={() => handleEditEmail(principalEmail, 0)} size={ESize.small} />
// 					)}
// 				</div>
// 			</div>
// 			{localEmails.length > 1 && <Divider />}
// 			<div className="pb-4">
// 				{localEmails?.map((item, index) => {
// 					if (principalEmail?.email === item.email) {
// 						return null;
// 					}
// 					return (
// 						<div key={`multiple-emails-${item.email}-${index}`} className="flex justify-between items-center">
// 							<Badge content={EMAIL_TYPES[item.emailType as EEmailType]}>
// 								<Typography className="pt-2">{item.email}</Typography>
// 							</Badge>
// 							<ActionPanel
// 								items={[
// 									{
// 										key: 'multiple-email-as-principal',
// 										label: 'Asignar como Principal',
// 										onClick: () => handleAssignAsPrincipal(item.email),
// 									},
// 									{
// 										key: 'multiple-email-edit',
// 										label: 'Editar',
// 										onClick: () => handleEditEmail(item, index),
// 									},
// 									{
// 										key: 'multiple-email-delete',
// 										label: 'Eliminar',
// 										onClick: () => handleDeleteEmail(item.email),
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
// 					<NewEmailForm
// 						isEditable={Boolean(selectedEmail)}
// 						emailValue={newEmail}
// 						handleAction={Boolean(selectedEmail) ? handleConfirmEdit : handleAddEmail}
// 						handleCancel={handleCancel}
// 						errors={errors}
// 						isSingleEmail={selectedEmail?.isPrincipal}
// 					/>
// 				)}
// 			</Fade>
// 		</div>
// 	);
// };

// TODO: refactor
