// TODO: refactor after design is RTD
// @ts-nocheck
import { mdiClose, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';

import { Button } from '@/components/Button/Button';
import { Checkbox } from '@/components/Checkbox/Checkbox';
// import { InputAddress } from '@/components/InputAddress/InputAddress';
import { EButtonVariant } from '@/enums';
import { ILocationFormData, IManualAddressObject } from '@/interfaces';
import { TInputOptions } from '@/types';

interface INewAddressFormProps {
	addressValue: string;
	// control: Control<any>;
	googleMapsApiKey: string;
	locationOptions: {
		provincesOpts: TInputOptions[];
		cantonsOpts: TInputOptions[];
		parishesOpts: TInputOptions[];
	};
	// watch: UseFormWatch<any>;
	// setValue: UseFormSetValue<any>;
	onLocationChange: (value: any) => void;
	setAddressObject: (addressObject: IManualAddressObject) => void;
	handleAddAddress: () => void;
	handleCancel: () => void;
	defaultManualValue?: IManualAddressObject;
	defaultLocationValues?: ILocationFormData;
	isSingleAddress?: boolean;
	errors?: {
		address: string;
		addressType: string;
	};
}
export const NewAddressForm = ({
	googleMapsApiKey,
	onLocationChange,
	setAddressObject,
	// control,
	locationOptions,
	// setValue,
	// watch,
	handleAddAddress,
	handleCancel,
	isSingleAddress,
	errors,
}: INewAddressFormProps) => {
	return (
		<>
			<div className="w-full">
				<div className="flex justify-end">
					{!isSingleAddress && <Checkbox name="isNewPrincipal">¿Es principal?</Checkbox>}
				</div>
				<div className="flex items-start justify-between gap-4">
					{/* <InputAddress
						defaultValue=""
						name="address"
						label="Dirección"
						control={control}
						googleMapsApiKey={googleMapsApiKey}
						errors={errors}
						onLocationChange={onLocationChange}
						setAddressObject={setAddressObject}
						locationOptions={locationOptions}
					/> */}
				</div>
			</div>
			<div className="flex justify-end gap-4 mt-4">
				<Button onClick={handleAddAddress} icon={<Icon path={mdiPlus} size={1} />}>
					Agregar
				</Button>
				{!isSingleAddress && (
					<Button onClick={handleCancel} variant={EButtonVariant.text} icon={<Icon path={mdiClose} size={1} />}>
						Cancelar
					</Button>
				)}
			</div>
		</>
	);
};
