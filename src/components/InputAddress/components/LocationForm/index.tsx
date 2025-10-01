import { FormLabel } from '@/components/FormLabel';
import { Select } from '@/components/Select';
//import { Textarea } from '@/components/Textarea/Textarea';
import {  filterOptions } from '../../helpers';
//import { TInputOptions } from '@/types';
import { IInputAddressProps } from '../../InputAddress';


 export const LocationForm = (props: IInputAddressProps["locationFormProps"]) => {
 	const { locationOptions, onChangeCountry, onChangeProvince, onChangeCanton, onChangeParish, valueCountryId, valueProvinceId, valueCantonId, valueParishId, showParish, isLoadingCountries, isLoadingProvinces, isLoadingCantons, isLoadingParishes } = props;
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
       
      </div>
 	);
 };
