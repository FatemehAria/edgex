import type { MyFormOptions } from '@/components/core/form';

import React from 'react';

import FormLayout from '../layout/form-layout';

const costumerInfoFormOptions: MyFormOptions = [
  {
    name: 'costumer-info-type',
    label: 'نوع :',
    type: 'select',
    innerProps: { placeholder: '' },
    options: [],
  },
  {
    name: 'costumer-info-person-type',
    label: 'نوع شخص:',
    type: 'select',
    innerProps: { placeholder: '' },
    options: [
      { label: 'حقیقی', value: 'Haghighi' },
      { label: 'حقوقی', value: 'Hoghooghi' },
    ],
  },
  {
    name: 'costumer-info-factor-code',
    label: 'کد فاکتور:',
    type: 'input',
    innerProps: { placeholder: '' },
  },
  {
    name: 'costumer-info-org-code',
    label: 'کد اداری:',
    type: 'input',
    innerProps: { placeholder: '' },
  },
  {
    name: 'costumer-info-active',
    label: 'وضعیت:',
    type: 'radio',
    options: [
      { label: 'فعال', value: true },
      { label: 'غیرفعال', value: false },
    ],
  },
];

function CostumerInfo() {
  return (
    <FormLayout
      FormOptions={costumerInfoFormOptions}
      layoutDir="vertical"
      submitForm={values => console.log('Submitted values:', values)}
      isGrid={false}
    />
  );
}

export default CostumerInfo;
