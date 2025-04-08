import type { MyFormOptions } from '@/components/core/form';

import { useContext, useState } from 'react';

import { ProvinceContext } from '@/context/ProvinceContext';
import { useLocale } from '@/locales';
import { getCity } from '@/utils/util';

import FormLayout from '../layout/form-layout';

interface proformaSupplierProps {
  onSupplierSubmit?: (values: any) => void;
}

function ProformaSupplier({ onSupplierSubmit }: proformaSupplierProps) {
  const { formatMessage } = useLocale();
  const [personType, setPersonType] = useState('');
  const { provinceList } = useContext(ProvinceContext);
  const [cityList, setCityList] = useState([]);

  const supplierFormOptions: MyFormOptions = [
    {
      name: 'personTypeCode',
      label: `${formatMessage({ id: 'app.personComapnyInfo.personType' })}`,
      type: 'select',
      innerProps: {
        placeholder: '',
        onChange: (value: any) => {
          setPersonType(value);
        },
      },
      options: [
        { label: 'حقیقی', value: '1' },
        { label: 'حقوقی', value: '2' },
      ],
    },
    {
      name: 'namePersian',
      label: `${formatMessage({ id: 'app.personComapnyInfo.firstnamePer' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
      },
      hidden: personType === '2',
    },
    {
      name: 'familyPersian',
      label: `${formatMessage({ id: 'app.personComapnyInfo.lastnamePer' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
      },
      hidden: personType === '2',
    },
    {
      name: 'name',
      label: `${formatMessage({ id: 'app.personComapnyInfo.firstnameEng' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
      },
      hidden: personType === '2',
    },
    {
      name: 'family',
      label: `${formatMessage({ id: 'app.personComapnyInfo.lastnameEng' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
      },
      hidden: personType === '2',
    },
    {
      name: 'title',
      label: `${formatMessage({ id: 'app.personComapnyInfo.titleEng' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
      },
      hidden: personType === '1',
    },
    {
      name: 'titlePersian',
      label: `${formatMessage({ id: 'app.personComapnyInfo.titlePer' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
      },
      hidden: personType === '1',
    },
    {
      name: 'email',
      label: `${formatMessage({ id: 'app.personComapnyInfo.email' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
      },
    },
    {
      name: 'mobile',
      label: `${formatMessage({ id: 'app.personComapnyInfo.mobile' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
      },
    },
    {
      name: 'telephone',
      label: `${formatMessage({ id: 'app.personComapnyInfo.phone' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
      },
    },
    {
      name: 'codeNational',
      label: `${formatMessage({ id: 'app.personComapnyInfo.nationalID' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
      },
    },
    {
      name: 'provinceID',
      label: `${formatMessage({ id: 'app.personComapnyInfo.province' })}`,
      type: 'select',
      innerProps: {
        placeholder: '',
        onChange: (value: string) => {
          getCity(setCityList, value);
        },
      },
      options: provinceList,
    },
    {
      name: 'cityID',
      label: `${formatMessage({ id: 'app.personComapnyInfo.city' })}`,
      type: 'select',
      innerProps: {
        placeholder: '',
      },
      options: cityList,
    },
    {
      name: 'address',
      label: `${formatMessage({ id: 'app.personComapnyInfo.address' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
      },
    },
    {
      name: 'zipCode',
      label: `${formatMessage({ id: 'app.personComapnyInfo.postalCode' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
      },
    },
    {
      name: 'isActive',
      label: `${formatMessage({ id: 'app.personComapnyInfo.status' })}`,
      type: 'radio',
      options: [
        { label: `${formatMessage({ id: 'app.personComapnyInfo.status.active' })}`, value: true },
        { label: `${formatMessage({ id: 'app.personComapnyInfo.status.deactive' })}`, value: false },
      ],
    },
    {
      name: 'isSuplier',
      label: `${formatMessage({ id: 'app.supplier.isSupplierTitle' })}`,
      type: 'radio',
      options: [
        { label: `${formatMessage({ id: 'app.supplier.isSupplier' })}`, value: true },
        { label: `${formatMessage({ id: 'app.supplier.isNotSupplier' })}`, value: false },
      ],
    },
    {
      name: 'isActiveSuplier',
      label: `${formatMessage({ id: 'app.costumerInfo.status' })}`,
      type: 'radio',
      options: [
        { label: `${formatMessage({ id: 'app.costumerInfo.status.active' })}`, value: true },
        { label: `${formatMessage({ id: 'app.costumerInfo.status.deactive' })}`, value: false },
      ],
    },
    {
      name: 'isCustomer',
      label: `${formatMessage({ id: 'app.costumerInfo.isCostumerTitle' })}`,
      type: 'radio',
      options: [
        { label: `${formatMessage({ id: 'app.costumerInfo.isCostumer' })}`, value: true },
        { label: `${formatMessage({ id: 'app.costumerInfo.isNotCostumer' })}`, value: false },
      ],
    },
    {
      name: 'isActiveCustomer',
      label: `${formatMessage({ id: 'app.costumerInfo.status' })}`,
      type: 'radio',
      options: [
        { label: `${formatMessage({ id: 'app.costumerInfo.status.active' })}`, value: true },
        { label: `${formatMessage({ id: 'app.costumerInfo.status.deactive' })}`, value: false },
      ],
    },
  ];

  return (
    <FormLayout
      FormOptions={supplierFormOptions}
      layoutDir="vertical"
      submitForm={values => {
        if (onSupplierSubmit) onSupplierSubmit(values);
      }}
      isGrid={false}
      showButton={true}
    />
  );
}

export default ProformaSupplier;
