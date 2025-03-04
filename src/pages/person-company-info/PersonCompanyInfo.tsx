import type { MyFormOptions } from '@/components/core/form';

import React, { useContext, useState } from 'react';

import { ProvinceContext } from '@/context/ProvinceContext';
import { useLocale } from '@/locales';
import { getCity } from '@/utils/util';

import FormLayout from '../layout/form-layout';
import { createCostumer } from './util';

function PersonCompanyInfo() {
  const { formatMessage } = useLocale();
  const { provinceList } = useContext(ProvinceContext);
  const [cityList, setCityList] = useState([]);
  const [personType, setPersonType] = useState('');

  const personCompanyFormOptions: MyFormOptions = [
    {
      name: 'person-company-type',
      label: `${formatMessage({ id: 'app.personComapnyInfo.personType' })}`,
      type: 'select',
      innerProps: {
        placeholder: '',
        onChange: (value: any) => {
          setPersonType(value);
          localStorage.setItem('person-company-type', JSON.stringify(value));
        },
      },
      options: [
        { label: 'حقیقی', value: 'Haghighi' },
        { label: 'حقوقی', value: 'Hoghooghi' },
      ],
    },
    {
      name: 'person-company-firstname-persian',
      label: `${formatMessage({ id: 'app.personComapnyInfo.firstnamePer' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        onChange: (value: any) =>
          localStorage.setItem('person-company-firstname-persian', JSON.stringify(value.target.value)),
      },
      hidden: personType !== 'Haghighi',
    },
    {
      name: 'person-company-firstname-english',
      label: `${formatMessage({ id: 'app.personComapnyInfo.firstnameEng' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        onChange: (value: any) =>
          localStorage.setItem('person-company-firstname-english', JSON.stringify(value.target.value)),
      },
      hidden: personType !== 'Haghighi',
    },
    {
      name: 'person-company-lastname-persian',
      label: `${formatMessage({ id: 'app.personComapnyInfo.lastnamePer' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        onChange: (value: any) =>
          localStorage.setItem('person-company-lastname-persian', JSON.stringify(value.target.value)),
      },
      hidden: personType !== 'Haghighi',
    },
    {
      name: 'person-company-lastname-english',
      label: `${formatMessage({ id: 'app.personComapnyInfo.lastnameEng' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        onChange: (value: any) =>
          localStorage.setItem('person-company-lastname-english', JSON.stringify(value.target.value)),
      },
      hidden: personType !== 'Haghighi',
    },
    {
      name: 'person-company-title-english',
      label: `${formatMessage({ id: 'app.personComapnyInfo.titleEng' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        onChange: (value: any) =>
          localStorage.setItem('person-company-title-english', JSON.stringify(value.target.value)),
      },
      hidden: personType !== 'Hoghooghi',
    },
    {
      name: 'person-company-title-persian',
      label: `${formatMessage({ id: 'app.personComapnyInfo.titlePer' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        onChange: (value: any) =>
          localStorage.setItem('person-company-title-persian', JSON.stringify(value.target.value)),
      },
      hidden: personType !== 'Hoghooghi',
    },
    {
      name: 'person-company-email',
      label: `${formatMessage({ id: 'app.personComapnyInfo.email' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        onChange: (value: any) => localStorage.setItem('person-company-email', JSON.stringify(value.target.value)),
      },
    },
    {
      name: 'person-company-mobile',
      label: `${formatMessage({ id: 'app.personComapnyInfo.mobile' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        onChange: (value: any) => localStorage.setItem('person-company-mobile', JSON.stringify(value.target.value)),
      },
    },
    {
      name: 'person-company-phonenumber',
      label: `${formatMessage({ id: 'app.personComapnyInfo.phone' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        onChange: (value: any) =>
          localStorage.setItem('person-company-phonenumber', JSON.stringify(value.target.value)),
      },
    },
    {
      name: 'person-company-nationalID',
      label: `${formatMessage({ id: 'app.personComapnyInfo.nationalID' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        onChange: (value: any) => localStorage.setItem('person-company-nationalID', JSON.stringify(value.target.value)),
      },
    },
    {
      name: 'person-company-province',
      label: `${formatMessage({ id: 'app.personComapnyInfo.province' })}`,
      type: 'select',
      innerProps: {
        placeholder: '',
        onChange: (value: string) => {
          getCity(setCityList, value);
          localStorage.setItem('person-company-province', JSON.stringify(value));
        },
      },
      options: provinceList,
    },
    {
      name: 'person-company-city',
      label: `${formatMessage({ id: 'app.personComapnyInfo.city' })}`,
      type: 'select',
      innerProps: {
        placeholder: '',
        onChange: (value: any) => {
          // console.log('City changed:', value);
          localStorage.setItem('person-company-city', JSON.stringify(value));
        },
      },
      options: cityList,
    },
    {
      name: 'person-company-address',
      label: `${formatMessage({ id: 'app.personComapnyInfo.address' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        onChange: (value: any) => localStorage.setItem('person-company-address', JSON.stringify(value.target.value)),
      },
    },
    {
      name: 'person-company-postalCode',
      label: `${formatMessage({ id: 'app.personComapnyInfo.postalCode' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        onChange: (value: any) => localStorage.setItem('person-company-postalCode', JSON.stringify(value.target.value)),
      },
    },
    {
      name: 'person-company-active',
      label: `${formatMessage({ id: 'app.personComapnyInfo.status' })}`,
      type: 'radio',
      options: [
        { label: `${formatMessage({ id: 'app.personComapnyInfo.status.active' })}`, value: true },
        { label: `${formatMessage({ id: 'app.personComapnyInfo.status.deactive' })}`, value: false },
      ],
      innerProps: {
        onChange: (value: any) => localStorage.setItem('person-company-active', JSON.stringify(value.target.value)),
      },
    },
  ];

  return (
    <FormLayout
      FormOptions={personCompanyFormOptions}
      layoutDir="vertical"
      submitForm={() => console.log('')}
      isGrid={true}
      showButton={false}
    />
  );
}

export default PersonCompanyInfo;
