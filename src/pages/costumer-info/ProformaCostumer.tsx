import type { MyFormOptions } from '@/components/core/form';

import React, { useContext, useState } from 'react';

import { ProvinceContext } from '@/context/ProvinceContext';
import { useLocale } from '@/locales';
import { getCity } from '@/utils/util';

import FormLayout from '../layout/form-layout';

interface ProformaCostumerProps {
  onCustomerSubmit?: (values: any) => void;
}

function ProformaCostumer({ onCustomerSubmit }: ProformaCostumerProps) {
  const { formatMessage } = useLocale();
  const [personType, setPersonType] = useState('');
  const { provinceList } = useContext(ProvinceContext);
  const [cityList, setCityList] = useState([]);

  const costumerInfoFormOptions: MyFormOptions = [
    {
      name: 'companyPersonType',
      label: `${formatMessage({ id: 'app.personComapnyInfo.personType' })}`,
      type: 'select',
      innerProps: {
        placeholder: '',
        onChange: (value: any) => {
          setPersonType(value);
        },
      },
      options: [
        { label: 'حقیقی', value: 'Haghighi' },
        { label: 'حقوقی', value: 'Hoghooghi' },
      ],
    },
    {
      name: 'companyPersonTitle',
      label: `${formatMessage({ id: 'app.costumerInfo.factorCode' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        onChange: (value: any) => localStorage.setItem('header-info-costumer', JSON.stringify(value.target.value)),
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
      name: 'isActive',
      label: `${formatMessage({ id: 'app.personComapnyInfo.status' })}`,
      type: 'radio',
      options: [
        { label: `${formatMessage({ id: 'app.personComapnyInfo.status.active' })}`, value: true },
        { label: `${formatMessage({ id: 'app.personComapnyInfo.status.deactive' })}`, value: false },
      ],
      innerProps: {},
    },
  ];

  return (
    <FormLayout
      FormOptions={costumerInfoFormOptions}
      layoutDir="vertical"
      submitForm={values => {
        console.log('Submitted values:', values);

        if (onCustomerSubmit) {
          onCustomerSubmit(values);
        }
      }}
      isGrid={false}
      showButton={true}
    />
  );
}

export default ProformaCostumer;
