import type { MyFormOptions } from '@/components/core/form';

import React from 'react';

import FormLayout from '../layout/form-layout';

const personCompanyFormOptions: MyFormOptions = [
  {
    name: 'person-company-type',
    label: 'نوع شخص:',
    type: 'select',
    innerProps: { placeholder: '' },
    options: [
      { label: 'حقیقی', value: 'Haghighi' },
      { label: 'حقوقی', value: 'Hoghooghi' },
    ],
  },
  {
    name: 'person-company-firstname-persian',
    label: 'نام فارسی:',
    type: 'input',
    innerProps: { placeholder: '' },
  },
  {
    name: 'person-company-firstname-english',
    label: 'نام انگلیسی:',
    type: 'input',
    innerProps: { placeholder: '' },
  },
  {
    name: 'person-company-lastname-persian',
    label: 'نام خانوادگی فارسی:',
    type: 'input',
    innerProps: { placeholder: '' },
  },
  {
    name: 'person-company-lastname-english',
    label: 'نام خانوادگی انگلیسی:',
    type: 'input',
    innerProps: { placeholder: '' },
  },
  {
    name: 'person-company-email',
    label: 'ایمیل:',
    type: 'input',
    innerProps: { placeholder: '' },
  },
  {
    name: 'person-company-mobile',
    label: 'موبایل:',
    type: 'input',
    innerProps: { placeholder: '' },
  },
  {
    name: 'person-company-phonenumber',
    label: 'تلفن:',
    type: 'input',
    innerProps: { placeholder: '' },
  },
  {
    name: 'person-company-nationalID',
    label: 'شناسه/کدملی:',
    type: 'input',
    innerProps: { placeholder: '' },
  },
  {
    name: 'person-company-province',
    label: 'استان:',
    type: 'select',
    innerProps: { placeholder: '' },
  },
  {
    name: 'person-company-city',
    label: 'شهر:',
    type: 'select',
    innerProps: { placeholder: '' },
  },
  {
    name: 'person-company-address',
    label: 'آدرس:',
    type: 'input',
    innerProps: { placeholder: '' },
  },
  {
    name: 'person-company-postalCode',
    label: 'کدپستی:',
    type: 'input',
    innerProps: { placeholder: '' },
  },
  {
    name: 'person-company-active',
    label: 'وضعیت:',
    type: 'radio',
    options: [
      { label: 'فعال', value: true },
      { label: 'غیرفعال', value: false },
    ],
  },
];

function CompanyPersonInfo() {
  return (
    <FormLayout
      FormOptions={personCompanyFormOptions}
      layoutDir="vertical"
      submitForm={values => console.log('Submitted values:', values)}
      isGrid={true}
    />
  );
}

export default CompanyPersonInfo;
