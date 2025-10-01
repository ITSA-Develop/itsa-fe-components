import { useState } from "react";
import { GoogleAutoComplete } from "./components/GoogleAutoComplete";
import { LocationForm } from "./components/LocationForm";
import {
  IBaseInputProps,
  ILocationFormData,
  IManualAddressObject,
} from "@/interfaces";
import { TInputOptions, TInputRules } from "@/types";

export interface ILocationFormProps {
  locationOptions: {
    countriesOpts: TInputOptions[];
    provincesOpts: TInputOptions[];
    cantonsOpts: TInputOptions[];
    parishesOpts: TInputOptions[];
  };
  isLoadingCountries: boolean;
  isLoadingProvinces: boolean;
  isLoadingCantons: boolean;
  isLoadingParishes: boolean;
  onChangeCountry: (value: number) => void;
  onChangeProvince: (value: number) => void;
  onChangeCanton: (value: number) => void;
  onChangeParish: (value: number) => void;
  valueCountryCode?: string;
  valueCountryId?: number;
  valueProvinceId?: number;
  valueCantonId?: number;
  valueParishId?: number;
  onChangeOtherCountryDescription: (value: string) => void;
  otherCountryDescription: string;
  showParish?: boolean;
}

export interface IGoogleAutoCompleteProps extends IBaseInputProps {
  googleMapsApiKey: string;
  defaultValue: string;
  onLocationChange: (value: any) => void;
  setAddressObject: (addressObject: IManualAddressObject) => void;
  errors?: any;
  showManualByDefault?: boolean;
  defaultManualValue?: IManualAddressObject;
  defaultLocationValues?: ILocationFormData;
  isRequired?: TInputRules | null;
  setShowManualEntry: (opt: boolean) => void;
  watch: () => { address: any };
  setValue: (field: string, value: any) => void;
}

export interface IInputAddressProps {
  locationFormProps: ILocationFormProps;
  googleAutoCompleteProps: IGoogleAutoCompleteProps;
}

export const InputAddress = ({
  locationFormProps,
  googleAutoCompleteProps,
}: IInputAddressProps) => {
  const [address, setAddress] = useState("");
  const [showManualEntry, setShowManualEntry] = useState(
    googleAutoCompleteProps?.showManualByDefault || false
  );

  const { setValue } = googleAutoCompleteProps || {};

  const localWatch = () => ({ address });
  const localSetValue = (field: string, value: any) => {
    if (field === "address") {
      setAddress(value);
    }
    setValue?.(field, value);
  };

  // Sync with parent component's showManualEntry state
  const handleSetShowManualEntry = (value: boolean) => {
    setShowManualEntry(value);
    googleAutoCompleteProps?.setShowManualEntry?.(value);
  };

  const primaryContent = showManualEntry ? (
    <LocationForm
      locationOptions={locationFormProps.locationOptions}
      isLoadingCountries={locationFormProps.isLoadingCountries}
      isLoadingProvinces={locationFormProps.isLoadingProvinces}
      isLoadingCantons={locationFormProps.isLoadingCantons}
      isLoadingParishes={locationFormProps.isLoadingParishes}
      onChangeCountry={locationFormProps.onChangeCountry}
      onChangeProvince={locationFormProps.onChangeProvince}
      onChangeCanton={locationFormProps.onChangeCanton}
      onChangeParish={locationFormProps.onChangeParish}
      valueCountryId={locationFormProps.valueCountryId}
      valueCountryCode={locationFormProps.valueCountryCode}
      valueProvinceId={locationFormProps.valueProvinceId}
      valueCantonId={locationFormProps.valueCantonId}
      valueParishId={locationFormProps.valueParishId}
      onChangeOtherCountryDescription={
        locationFormProps.onChangeOtherCountryDescription
      }
      otherCountryDescription={locationFormProps.otherCountryDescription}
      showParish={locationFormProps.showParish}
    />
  ) : (
    <GoogleAutoComplete
      name={googleAutoCompleteProps?.name}
      label={googleAutoCompleteProps?.label}
      googleMapsApiKey={googleAutoCompleteProps?.googleMapsApiKey}
      onLocationChange={googleAutoCompleteProps?.onLocationChange}
      setShowManualEntry={handleSetShowManualEntry}
      setAddressObject={googleAutoCompleteProps?.setAddressObject}
      defaultValue={googleAutoCompleteProps?.defaultValue}
      error={googleAutoCompleteProps?.errors?.address}
      watch={localWatch}
      setValue={localSetValue}
    />
  );

  return primaryContent;
};
