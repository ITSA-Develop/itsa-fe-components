// import { Fade } from '@/components/Fade/Fade';
// import { InputDropdown } from '@/components/InputDropdown/InputDropdown';
// import { Textarea } from '@/components/Textarea/Textarea';
// import { ADDRESS_TYPES } from '@/constants/dropdownOptions';
// import { getDropdownFormattedOptions } from '@/helpers';
// import { IBaseInputProps, ILocationFormData, IManualAddressObject } from '@/interfaces';
// import { TInputOptions, TInputRules } from '@/types';
// import { REQUIRED } from '@/utils/constants';
// import { useEffect, useState } from 'react';
// import { GoogleAutoComplete } from './components/GoogleAutoComplete';

// export interface IInputAddressProps extends IBaseInputProps {
// 	googleMapsApiKey: string;
// 	defaultValue: string;
// 	locationOptions: {
// 		provincesOpts: TInputOptions[];
// 		cantonsOpts: TInputOptions[];
// 		parishesOpts: TInputOptions[];
// 	};
// 	onLocationChange: (value: any) => void;
// 	setAddressObject: (addressObject: IManualAddressObject) => void;
// 	errors?: any;
// 	showManualByDefault?: boolean;
// 	defaultManualValue?: IManualAddressObject;
// 	defaultLocationValues?: ILocationFormData;
// 	isRequired?: TInputRules | null;
// }

// export const InputAddress = ({
// 	name,
// 	label,
// 	googleMapsApiKey,
// 	locationOptions,
// 	onLocationChange,
// 	setAddressObject,
// 	showManualByDefault,
// 	defaultValue,
// 	control,
// 	errors,
// 	isRequired,
// }: IInputAddressProps) => {
// 	const [showManualEntry, setShowManualEntry] = useState(false);

// 	useEffect(() => {
// 		if (showManualByDefault) {
// 			setShowManualEntry(true);
// 		}
// 	}, [showManualByDefault]);

// 	const primaryContent = showManualEntry ? (
// 		// <ManualAddress
// 		// 	name={name}
// 		// 	control={control}
// 		// 	setShowManualEntry={setShowManualEntry}
// 		// 	setAddressObject={setAddressObject}
// 		// 	errors={showManualEntry ? errors : null}
// 		// 	defaultManualValue={defaultManualValue}
// 		// 	defaultLocationValues={defaultLocationValues}
// 		// 	locationOptions={locationOptions}
// 		// />

// 		'Manual Input'
// 	) : (
// 		<GoogleAutoComplete
// 			name={name}
// 			label={label}
// 			locationOptions={locationOptions}
// 			googleMapsApiKey={googleMapsApiKey}
// 			onLocationChange={onLocationChange}
// 			setShowManualEntry={setShowManualEntry}
// 			setAddressObject={setAddressObject}
// 			defaultValue={defaultValue}
// 			error={errors?.address}
// 		/>
// 	);

// 	const contentToRender = (
// 		<div className="!space-y-4">
// 			{primaryContent}
// 			<InputDropdown
// 				name="addressType"
// 				label="Tipo de Dirección"
// 				options={getDropdownFormattedOptions(ADDRESS_TYPES)}
// 				rules={isRequired ? REQUIRED : undefined}
// 				control={control}
// 				error={errors?.addressType ? errors.addressType.message || errors.addressType : undefined}
// 			/>
// 			<Textarea name="addressReference" />
// 		</div>
// 	);

// 	return (
// 		<Fade showTransition={!showManualEntry} duration={500} transitionChildren={contentToRender}>
// 			{contentToRender}
// 		</Fade>
// 	);
// };
