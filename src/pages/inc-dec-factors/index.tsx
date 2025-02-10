import type { MyFormOptions } from '@/components/core/form';

import React from 'react';

import FormLayout from '../layout/form-layout';

const incDecFactorsFormOptions: MyFormOptions = [
  {
    name: 'inc-dec-title',
    label: 'عنوان :',
    type: 'input',
    innerProps: { placeholder: '' },
  },
  {
    name: 'inc-dec-mahiyat',
    label: 'ماهیت:',
    type: 'select',
    innerProps: { placeholder: 'انتخاب ماهیت' },
    options: [],
  },
  {
    name: 'inc-dec-tasir',
    label: 'نوع تاثیر:',
    type: 'select',
    innerProps: { placeholder: '' },
    options: [
      { label: 'مبلغی', value: 'price' },
      { label: 'درصدی', value: 'percentage' },
    ],
  },
  {
    name: 'inc-dec-value',
    label: 'مبلغ تاثیر:',
    type: 'input',
    innerProps: { placeholder: '' },
  },
  {
    name: 'inc-dec-active',
    label: 'وضعیت:',
    type: 'radio',
    options: [
      { label: 'فعال', value: true },
      { label: 'غیرفعال', value: false },
    ],
  },
  {
    name: 'inc-dec-display',
    label: 'نمایش در:',
    type: 'radio',
    options: [
      { label: 'قلم', value: 'ghalam' },
      { label: 'سند', value: 'sanad' },
    ],
  },
];

function IncDecFactors() {
  return (
    <FormLayout
      FormOptions={incDecFactorsFormOptions}
      layoutDir="vertical"
      submitForm={values => console.log('Submitted values:', values)}
      isGrid={true}
    />
  );
}

export default IncDecFactors;
