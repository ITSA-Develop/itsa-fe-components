import { FormLabel } from '@/components/FormLabel';
import { Select } from '@/components/Select';
import { filterOptions } from '../InputAddress/helpers';
import { ILocationSelectorProps } from '@/interfaces';
import { Col, Row } from 'antd';

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
    <Row gutter={4}>
      <Col
        xs={{ flex: '100%' }}
        sm={{ flex: '50%' }}
        md={{ flex: '50%' }}
        lg={{ flex: '50%' }}
        xl={{ flex: '50%' }}
        className='flex flex-col gap-0.5'
      >
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
      </Col>
      <Col
        xs={{ flex: '100%' }}
        sm={{ flex: '50%' }}
        md={{ flex: '50%' }}
        lg={{ flex: '50%' }}
        xl={{ flex: '50%' }}>
        {showProvince && (
          <div className='flex flex-col gap-0.5'>
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
        </Col>
        <Col
        xs={{ flex: '100%' }}
        sm={{ flex: '50%' }}
        md={{ flex: '30%' }}
        lg={{ flex: '30%' }}
        xl={{ flex: '30%' }}>
        {showCanton && (
          <div className='flex flex-col gap-0.5'>
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
        </Col>
        <Col
        xs={{ flex: '100%' }}
        sm={{ flex: '50%' }}
        md={{ flex: '30%' }}
        lg={{ flex: '30%' }}
        xl={{ flex: '30%' }}>
        {showParish && (
          <div className='flex flex-col gap-0.5'>
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
        </Col>
    </Row>
  );
};


/*
 <div className="grid grid-cols-1 md:grid-cols-4 gap-0.5 w-full">
      <div className="col-span-1">
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

*/
/**
 *   <div className="flex flex-col gap-0 md:col-span-1">
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
 * 
 * 
 */