import { FormLabel } from '@/components/FormLabel';
import { Select } from '@/components/Select';
import { filterOptions } from '../InputAddress/helpers';
import { ILocationSelectorProps } from '@/interfaces';

export const LocationSelector = (props: ILocationSelectorProps) => {
  const { 
    optionsCountries, 
    optionsProvinces, 
    optionsCantons, 
    optionsParishes, 
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
    showProvince,
    showCanton,
    allowClear = true,
    titleCountry = 'País',
    titleProvince = 'Provincia',
    titleCanton = 'Cantón',
    titleParish = 'Parroquia',
  } = props;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 w-full">
      <div className="flex flex-col gap-0 md:col-span-1">
        <FormLabel label={titleCountry} />
        <Select
          options={optionsCountries}
          status={undefined}
          showSearch
          filterOption={(input, option) => filterOptions(input, option)}
          onChange={onChangeCountry}
          loading={isLoadingCountries}
          value={valueCountryId}
          placeholder={titleCountry}
          className="w-full"
          allowClear={allowClear}
        />
      </div>
        <div className={`grid grid-cols-1 ${showParish ? "md:grid-cols-3" : "md:grid-cols-2"} gap-2 col-span-3`}>
          {showProvince && (
            <div className="col-span-1">
            <FormLabel label={titleProvince} />
            <Select
              options={optionsProvinces}
              status={undefined}
              showSearch
              filterOption={(input, option) => filterOptions(input, option)}
              onChange={onChangeProvince}
              loading={isLoadingProvinces}
              value={valueProvinceId !== 0 ? valueProvinceId : undefined}
              placeholder={titleProvince}
              className="w-full"
              allowClear={allowClear}
            />
          </div>
          )}
          {showCanton && (
          <div className="col-span-1">
            <FormLabel label={titleCanton} />
            <Select
              options={optionsCantons}
              showSearch
              filterOption={(input, option) => filterOptions(input, option)}
              onChange={onChangeCanton}
              loading={isLoadingCantons}
              value={valueCantonId !== 0 ? valueCantonId : undefined}
              placeholder={titleCanton}
              className="w-full"
              allowClear={allowClear}
            />
          </div>
          )}
          {showParish && (
            <div className="col-span-1">
              <FormLabel label={titleParish} />
              <Select
                options={optionsParishes}
                status={undefined}
                showSearch
                filterOption={(input, option) => filterOptions(input, option)}
                onChange={onChangeParish}
                loading={isLoadingParishes}
                value={valueParishId !== 0 ? valueParishId : undefined}
                placeholder={titleParish}
                className="w-full"
                allowClear={allowClear}
              />
            </div>
          )}
        </div>
    </div>
  );
};
