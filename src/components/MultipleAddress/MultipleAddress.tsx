// import { mdiPlus } from '@mdi/js';
// import Icon from '@mdi/react';
// import clx from 'classnames';
// import { useEffect, useState } from 'react';

// import { ActionPanel } from '@/components/ActionPanel/ActionPanel';
// import { Badge } from '@/components/Badge/Badge';
// import { Button } from '@/components/Button/Button';
// import { Divider } from '@/components/Divider/Divider';
// import { Fade } from '@/components/Fade/Fade';
// import { Tag } from '@/components/Tag/Tag';
// import { ADDRESS_TYPES } from '@/constants/dropdownOptions';
// import { EAddressType, EButtonVariant, EStatus } from '@/enums';
// import { getFormattedAddress, isEmpty } from '@/helpers';
// import { useModalStore, useNotification } from '@/hooks';
// import { ILocationFormData, IManualAddressObject, IMultipleAddressItem } from '@/interfaces';
// import { TInputOptions } from '@/types';
// import { GOOGLE_API_KEY } from '@/utils/constants';
// import { INPUT_ERRORS } from '@/utils/errors/errorMessages';
// import { NewAddressForm } from './components/NewAddressForm/NewAddressForm';

// export interface IMultipleAddressProps {
// 	label: string;
// 	addresses: IMultipleAddressItem[];
// 	googleMapsApiKey: string;
// 	control: Control<any>;
// 	locationOptions: {
// 		provincesOpts: TInputOptions[];
// 		cantonsOpts: TInputOptions[];
// 		parishesOpts: TInputOptions[];
// 	};
// 	resetField: UseFormReset<any>;
// 	watch: UseFormWatch<any>;
// 	setValue: UseFormSetValue<any>;
// 	onLocationChange: (value: any) => void;
// 	setAddressObject: (addressObject: IManualAddressObject) => void;
// 	defaultValue?: string;
// 	errors?: any;
// 	showManualByDefault?: boolean;
// 	defaultManualValue?: IManualAddressObject;
// 	defaultLocationValues?: ILocationFormData;
// 	isEmptyHighlight?: boolean;
// }

// export const MultipleAddress = ({
// 	label,
// 	addresses = [],
// 	control,
// 	locationOptions,
// 	watch,
// 	setValue,
// 	resetField,
// 	onLocationChange,
// 	setAddressObject,
// 	isEmptyHighlight,
// }: IMultipleAddressProps) => {
// 	const { openModal, closeModal } = useModalStore();
// 	const { openNotification } = useNotification();
// 	const [localAddresses, setLocalAddresses] = useState(addresses);
// 	const [showInput, setShowInput] = useState(false);
// 	const [errors, setErrors] = useState({
// 		address: '',
// 		addressType: '',
// 		principalStreet: '',
// 		latitude: '',
// 		longitude: '',
// 		addressprovince: '',
// 		addresscanton: '',
// 	});

// 	const {
// 		address,
// 		addressType,
// 		isNewPrincipal,
// 		addressReference,
// 		isManualAddress,
// 		principalStreet,
// 		postalCode,
// 		latitude,
// 		longitude,
// 		addressprovince,
// 		addresscanton,
// 		addressparish,
// 	} = watch();

// 	const principalAddress = localAddresses?.find(item => item.isPrincipal);

// 	useEffect(() => {
// 		if (!isEmpty(addresses) && isEmpty(localAddresses)) {
// 			setLocalAddresses(addresses);
// 		}
// 	}, [addresses]);

// 	const handleConfirmDelete = (addressToDelete: string) => {
// 		setLocalAddresses(prevLocalAddresses => {
// 			return prevLocalAddresses.filter(item => item.fullAddress !== addressToDelete);
// 		});
// 		closeModal();
// 	};

// 	const handleDeleteAddress = (addressToDelete: string) => {
// 		const actions = {
// 			secondaryAction: {
// 				label: 'Cancelar',
// 				onClick: closeModal,
// 			},
// 			primaryAction: {
// 				label: 'Si',
// 				onClick: () => handleConfirmDelete(addressToDelete),
// 			},
// 		};
// 		openModal(
// 			'Eliminación de Dirección',
// 			'sm',
// 			`¿Está seguro que desea eliminar la dirección ${addressToDelete}?`,
// 			actions,
// 		);
// 	};

// 	const handleAssignAsPrincipal = (addressAssignedAsPrincipal: string) => {
// 		const updatedData = localAddresses?.map(item => {
// 			if (item.fullAddress === addressAssignedAsPrincipal) {
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
// 		setLocalAddresses(updatedData);
// 		setValue('address', updatedData);
// 	};

// 	const handleReset = () => {
// 		setErrors({
// 			address: '',
// 			addressType: '',
// 			principalStreet: '',
// 			longitude: '',
// 			latitude: '',
// 			addressprovince: '',
// 			addresscanton: '',
// 		});
// 		setValue('address', '');
// 		resetField('addressType');
// 		resetField('addressReference');
// 		resetField('isNewPrincipal');
// 		resetField('principalStreet');
// 		resetField('secondaryStreet');
// 		resetField('addressNumber');
// 		resetField('latitude');
// 		resetField('longitude');
// 		resetField('postalCode');
// 		resetField('addressprovince');
// 		resetField('addresscanton');
// 		resetField('addressparish');
// 	};

// 	const handleAddAddress = () => {
// 		let isValidForm = false;
// 		if (isManualAddress) {
// 			isValidForm = Boolean(
// 				addressType && principalStreet && longitude && latitude && addressprovince && addresscanton,
// 			);
// 			if (!isValidForm) {
// 				setErrors({
// 					principalStreet: !principalStreet ? INPUT_ERRORS.required : '',
// 					longitude: !longitude ? INPUT_ERRORS.required : '',
// 					latitude: !latitude ? INPUT_ERRORS.required : '',
// 					addressprovince: !addressprovince ? INPUT_ERRORS.required : '',
// 					addresscanton: !addresscanton ? INPUT_ERRORS.required : '',
// 					address: '',
// 					addressType: !addressType ? INPUT_ERRORS.required : '',
// 				});
// 			}
// 		}

// 		if (!isManualAddress) {
// 			isValidForm = Boolean(address && addressType);
// 			if (!isValidForm) {
// 				setErrors({
// 					principalStreet: '',
// 					longitude: '',
// 					latitude: '',
// 					addressprovince: '',
// 					addresscanton: '',
// 					address: INPUT_ERRORS.required,
// 					addressType: INPUT_ERRORS.required,
// 				});
// 			}
// 		}

// 		if (isValidForm) {
// 			if (localAddresses?.find((item: IMultipleAddressItem) => item.address === address)) {
// 				openNotification(EStatus.warning, 'Atención', INPUT_ERRORS.repeatedValue);
// 			} else {
// 				const addPrincipalStreet = address.principalStreet || principalStreet;
// 				const addPostalCode = address.postalCode || postalCode;
// 				address.principalStreet = addPrincipalStreet;
// 				address.postalCode = addPostalCode;
// 				address.provinceId = addressprovince;
// 				address.cantonId = addresscanton;
// 				address.parishId = addressparish;

// 				const commonValues = {
// 					addressType: addressType,
// 					address,
// 					fullAddress: getFormattedAddress(address),
// 					addressReference,
// 				};
// 				if (isNewPrincipal || !principalAddress) {
// 					const updatedLocalAddresses = localAddresses?.map(item =>
// 						item.isPrincipal ? { ...item, isPrincipal: false } : item,
// 					);
// 					setLocalAddresses([
// 						...updatedLocalAddresses,
// 						{
// 							...commonValues,
// 							isPrincipal: true,
// 						},
// 					]);
// 				} else {
// 					setLocalAddresses(prevLocalAddresses => [
// 						...prevLocalAddresses,
// 						{
// 							...commonValues,
// 							isPrincipal: false,
// 						},
// 					]);
// 				}
// 				handleCancel();
// 			}
// 		}
// 	};

// 	const handleCancel = () => {
// 		setShowInput(false);
// 		handleReset();
// 	};

// 	useEffect(() => {
// 		setValue('addresses', localAddresses);
// 	}, [localAddresses]);

// 	if (!principalAddress) {
// 		return (
// 			<div
// 				className={clx(
// 					'space-y-2 border p-4 rounded-xl w-full',
// 					isEmptyHighlight ? 'border-red-600' : 'border-grey-200',
// 				)}
// 			>
// 				<p className="mb-6">{label}</p>
// 				<Divider />
// 				<NewAddressForm
// 					locationOptions={locationOptions}
// 					addressValue={address}
// 					control={control}
// 					watch={watch}
// 					setValue={setValue}
// 					googleMapsApiKey={GOOGLE_API_KEY}
// 					errors={errors}
// 					onLocationChange={onLocationChange}
// 					setAddressObject={setAddressObject}
// 					handleAddAddress={handleAddAddress}
// 					handleCancel={handleCancel}
// 					isSingleAddress
// 				/>
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className="space-y-2 border border-grey-200 p-4 rounded-xl w-full">
// 			<p className="mb-6">{label}</p>
// 			<Divider />
// 			<div className="flex justify-between items-center">
// 				<div className="block">
// 					<Badge
// 						content={principalAddress?.addressType ? ADDRESS_TYPES[principalAddress?.addressType as EAddressType] : ''}
// 					>
// 						<p className="pt-2">{principalAddress?.fullAddress as string}</p>
// 					</Badge>
// 					{!isEmpty(principalAddress.addressReference) && (
// 						<p className="text-sm italic">{`Referencia: ${principalAddress.addressReference}`}</p>
// 					)}
// 				</div>
// 				<Tag>Principal</Tag>
// 			</div>
// 			{localAddresses.length > 1 && <Divider />}
// 			<div className="pb-4">
// 				{localAddresses?.map((item, index) => {
// 					if (principalAddress?.fullAddress === item.fullAddress) {
// 						return null;
// 					}
// 					return (
// 						<div key={`multiple-addresses-${item.fullAddress}-${index}`} className="flex justify-between items-center">
// 							<div className="block">
// 								<Badge content={ADDRESS_TYPES[item.addressType as EAddressType]}>
// 									<p className="pt-2">{item.fullAddress}</p>
// 								</Badge>
// 								{!isEmpty(item.addressReference) && (
// 									<p className="text-sm italic">{`Referencia: ${item.addressReference}`}</p>
// 								)}
// 							</div>
// 							<ActionPanel
// 								items={[
// 									{
// 										key: 'multiple-address-as-principal',
// 										label: 'Asignar como Principal',
// 										onClick: () => handleAssignAsPrincipal(item.fullAddress),
// 									},
// 									{
// 										key: 'multiple-address-delete',
// 										label: 'Eliminar',
// 										onClick: () => handleDeleteAddress(item.fullAddress),
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
// 					<NewAddressForm
// 						locationOptions={locationOptions}
// 						addressValue={address}
// 						control={control}
// 						watch={watch}
// 						setValue={setValue}
// 						googleMapsApiKey={GOOGLE_API_KEY}
// 						errors={errors}
// 						onLocationChange={onLocationChange}
// 						setAddressObject={setAddressObject}
// 						handleAddAddress={handleAddAddress}
// 						handleCancel={handleCancel}
// 					/>
// 				)}
// 			</Fade>
// 		</div>
// 	);
// };
