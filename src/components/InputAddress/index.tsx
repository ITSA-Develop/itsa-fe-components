import { useState } from "react";
import { GoogleAutoComplete } from "./components/GoogleAutoComplete";
//import { LocationSelector } from "../LocationSelector";
import {
  IBaseInputProps,
  ILocationFormData,
 // ILocationSelectorProps,
  IManualAddressObject,
} from "@/interfaces";
import { TInputRules } from "@/types";

/*export interface ILocationFormProps {
  optionsCountries: TInputOptions[];
  optionsProvinces: TInputOptions[];
  optionsCantons: TInputOptions[];
  optionsParishes: TInputOptions[];
  isLoadingCountries: boolean;
  isLoadingProvinces: boolean;
  isLoadingCantons: boolean;
  isLoadingParishes: boolean;
  onChangeCountry: (value: number) => void;
  onChangeProvince: (value: number) => void;
  onChangeCanton: (value: number) => void;
  onChangeParish: (value: number) => void;
  valueCountryId?: number;
  valueProvinceId?: number;
  valueCantonId?: number;
  valueParishId?: number;
  onChangeOtherCountryDescription: (value: string) => void;
  otherCountryDescription: string;
  showParish?: boolean;
}*/

export interface IGoogleAutoCompleteProps extends IBaseInputProps {
  googleMapsApiKey: string;
  defaultValue: string;
  onLocationChange: (value: any) => void;
  //setAddressObject: (addressObject: IManualAddressObject) => void;
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
  //locationFormProps: ILocationSelectorProps;
  googleAutoCompleteProps: IGoogleAutoCompleteProps;
}

export const InputAddress = ({
  //ocationFormProps,
  googleAutoCompleteProps,
}: IInputAddressProps) => {
  const [address, setAddress] = useState("");
 /* const [showManualEntry, setShowManualEntry] = useState(
    googleAutoCompleteProps?.showManualByDefault || false
  );*/

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
   // console.log(value);
    //setShowManualEntry(value);
    googleAutoCompleteProps?.setShowManualEntry?.(value);
    //console.log("showManualEntry", showManualEntry);
  };

  const primaryContent = 
  
  /*showManualEntry ? (
    <LocationSelector
      optionsCountries={locationFormProps.optionsCountries}
      optionsProvinces={locationFormProps.optionsProvinces}
      optionsCantons={locationFormProps.optionsCantons}
      optionsParishes={locationFormProps.optionsParishes}
      isLoadingCountries={locationFormProps.isLoadingCountries}
      isLoadingProvinces={locationFormProps.isLoadingProvinces}
      isLoadingCantons={locationFormProps.isLoadingCantons}
      isLoadingParishes={locationFormProps.isLoadingParishes}
      onChangeCountry={locationFormProps.onChangeCountry}
      onChangeProvince={locationFormProps.onChangeProvince}
      onChangeCanton={locationFormProps.onChangeCanton}
      onChangeParish={locationFormProps.onChangeParish}
      valueCountryId={locationFormProps.valueCountryId}
      valueProvinceId={locationFormProps.valueProvinceId}
      valueCantonId={locationFormProps.valueCantonId}
      valueParishId={locationFormProps.valueParishId}
      onChangeOtherCountryDescription={
        locationFormProps.onChangeOtherCountryDescription
      }
      otherCountryDescription={locationFormProps.otherCountryDescription}
      showParish={locationFormProps.showParish}
    />
  ) : (*/
    <GoogleAutoComplete
      name={googleAutoCompleteProps?.name}
      label={googleAutoCompleteProps?.label}
      googleMapsApiKey={googleAutoCompleteProps?.googleMapsApiKey}
      onLocationChange={googleAutoCompleteProps?.onLocationChange}
      setShowManualEntry={handleSetShowManualEntry}
      //setAddressObject={googleAutoCompleteProps?.setAddressObject}
      defaultValue={googleAutoCompleteProps?.defaultValue}
      error={googleAutoCompleteProps?.errors?.address}
      watch={localWatch}
      setValue={localSetValue}
      
    />
  //);

  return primaryContent;
};
