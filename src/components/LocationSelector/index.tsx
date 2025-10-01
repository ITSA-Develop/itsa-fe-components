import { FormLabel } from '@/components/FormLabel';
import { Select } from '@/components/Select';
import { filterOptions } from '../InputAddress/helpers';
import { TInputOptions } from '@/types';

export interface ILocationSelectorProps {
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

export const LocationSelector = (props: ILocationSelectorProps) => {
  const { 
    locationOptions, 
    onChangeCountry, 
    onChangeProvince, 
    onChangeCanton, 
    onChangeParish, 
    valueCountryId, 
    valueProvinceId, 
    valueCantonId, 
    valueParishId, 
    showParish, 
    isLoadingCountries, 
    isLoadingProvinces, 
    isLoadingCantons, 
    isLoadingParishes, 
    valueCountryCode 
  } = props;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 w-full">
      <div className="flex flex-col gap-0 md:col-span-1">
        <FormLabel label="País" />
        <Select
          options={locationOptions.countriesOpts}
          status={undefined}
          showSearch
          filterOption={(input, option) => filterOptions(input, option)}
          onChange={onChangeCountry}
          loading={isLoadingCountries}
          value={valueCountryId}
          placeholder="País"
          className="w-full"
        />
      </div>
      {valueCountryCode === 'EC' && (
        <div className={`grid grid-cols-1 ${showParish ? "md:grid-cols-3" : "md:grid-cols-2"} gap-2 col-span-3`}>
          <div className="flex flex-col gap-0">
            <FormLabel label="Provincia" />
            <Select
              options={locationOptions.provincesOpts}
              status={undefined}
              showSearch
              filterOption={(input, option) => filterOptions(input, option)}
              onChange={onChangeProvince}
              loading={isLoadingProvinces}
              value={valueProvinceId !== 0 ? valueProvinceId : undefined}
              placeholder="Provincia"
              className="w-full"
            />
          </div>
          <div className="flex flex-col gap-0">
            <FormLabel label="Cantón" />
            <Select
              options={locationOptions.cantonsOpts}
              showSearch
              filterOption={(input, option) => filterOptions(input, option)}
              onChange={onChangeCanton}
              loading={isLoadingCantons}
              value={valueCantonId !== 0 ? valueCantonId : undefined}
              placeholder="Cantón"
              className="w-full"
            />
          </div>
          {showParish && (
            <div className="flex flex-col gap-0">
              <FormLabel label="Parroquia" />
              <Select
                options={locationOptions.parishesOpts}
                status={undefined}
                showSearch
                filterOption={(input, option) => filterOptions(input, option)}
                onChange={onChangeParish}
                loading={isLoadingParishes}
                value={valueParishId !== 0 ? valueParishId : undefined}
                placeholder="Parroquia"
                className="w-full"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
