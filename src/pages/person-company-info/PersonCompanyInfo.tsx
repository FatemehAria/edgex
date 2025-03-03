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
      innerProps: { placeholder: '', onChange: (value: any) => setPersonType(value) },
      options: [
        { label: 'حقیقی', value: 'Haghighi' },
        { label: 'حقوقی', value: 'Hoghooghi' },
      ],
    },
    {
      name: 'person-company-firstname-persian',
      label: `${formatMessage({ id: 'app.personComapnyInfo.firstnamePer' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
      hidden: personType !== 'Haghighi',
    },
    {
      name: 'person-company-firstname-english',
      label: `${formatMessage({ id: 'app.personComapnyInfo.firstnameEng' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
      hidden: personType !== 'Haghighi',
    },
    {
      name: 'person-company-lastname-persian',
      label: `${formatMessage({ id: 'app.personComapnyInfo.lastnamePer' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
      hidden: personType !== 'Haghighi',
    },
    {
      name: 'person-company-lastname-english',
      label: `${formatMessage({ id: 'app.personComapnyInfo.lastnameEng' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
      hidden: personType !== 'Haghighi',
    },
    {
      name: 'person-company-title-english',
      label: `${formatMessage({ id: 'app.personComapnyInfo.titleEng' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
      hidden: personType !== 'Hoghooghi',
    },
    {
      name: 'person-company-title-persian',
      label: `${formatMessage({ id: 'app.personComapnyInfo.titlePer' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
      hidden: personType !== 'Hoghooghi',
    },
    {
      name: 'person-company-email',
      label: `${formatMessage({ id: 'app.personComapnyInfo.email' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'person-company-mobile',
      label: `${formatMessage({ id: 'app.personComapnyInfo.mobile' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'person-company-phonenumber',
      label: `${formatMessage({ id: 'app.personComapnyInfo.phone' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'person-company-nationalID',
      label: `${formatMessage({ id: 'app.personComapnyInfo.nationalID' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'person-company-province',
      label: `${formatMessage({ id: 'app.personComapnyInfo.province' })}`,
      type: 'select',
      innerProps: { placeholder: '', onChange: (value: string) => getCity(setCityList, value) },
      options: provinceList,
    },
    {
      name: 'person-company-city',
      label: `${formatMessage({ id: 'app.personComapnyInfo.city' })}`,
      type: 'select',
      innerProps: { placeholder: '' },
      options: cityList,
    },
    {
      name: 'person-company-address',
      label: `${formatMessage({ id: 'app.personComapnyInfo.address' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'person-company-postalCode',
      label: `${formatMessage({ id: 'app.personComapnyInfo.postalCode' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'person-company-active',
      label: `${formatMessage({ id: 'app.personComapnyInfo.status' })}`,
      type: 'radio',
      options: [
        { label: `${formatMessage({ id: 'app.personComapnyInfo.status.active' })}`, value: true },
        { label: `${formatMessage({ id: 'app.personComapnyInfo.status.deactive' })}`, value: false },
      ],
    },
  ];

  return (
    <FormLayout
      FormOptions={personCompanyFormOptions}
      layoutDir="vertical"
      submitForm={values => createCostumer(values)}
      isGrid={true}
      showButton={true}
    />
  );
}

export default PersonCompanyInfo;
