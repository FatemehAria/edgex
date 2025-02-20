import type { MyFormOptions } from '@/components/core/form';

import React from 'react';

import FormLayout from '../layout/form-layout';
import { useLocale } from '@/locales';

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
  const { formatMessage } = useLocale();
  const incDecFactorsFormOptions: MyFormOptions = [
    {
      name: 'inc-dec-title',
      label: `${formatMessage({ id: 'app.incDecFactors.title' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'inc-dec-mahiyat',
      label: `${formatMessage({ id: 'app.incDecFactors.origin' })}`,
      type: 'select',
      innerProps: { placeholder: `${formatMessage({ id: 'app.incDecFactors.origin.placeholder' })}` },
      options: [],
    },
    {
      name: 'inc-dec-tasir',
      label: `${formatMessage({ id: 'app.incDecFactors.typeOfInf' })}`,
      type: 'select',
      innerProps: { placeholder: '' },
      options: [
        { label: `${formatMessage({ id: 'app.incDecFactors.typeOfInf.price' })}`, value: 'price' },
        { label: `${formatMessage({ id: 'app.incDecFactors.typeOfInf.percentage' })}`, value: 'percentage' },
      ],
    },
    {
      name: 'inc-dec-value',
      label: `${formatMessage({ id: 'app.incDecFactors.value' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'inc-dec-active',
      label: `${formatMessage({ id: 'app.incDecFactors.status' })}`,
      type: 'radio',
      options: [
        { label: `${formatMessage({ id: 'app.incDecFactors.status.active' })}`, value: true },
        { label: `${formatMessage({ id: 'app.incDecFactors.status.deactive' })}`, value: false },
      ],
    },
    {
      name: 'inc-dec-display',
      label: `${formatMessage({ id: 'app.incDecFactors.showIn' })}`,
      type: 'radio',
      options: [
        { label: `${formatMessage({ id: 'app.incDecFactors.showIn.pen' })}`, value: 'ghalam' },
        { label: `${formatMessage({ id: 'app.incDecFactors.showIn.document' })}`, value: 'sanad' },
      ],
    },
  ];

  return (
    <FormLayout
      FormOptions={incDecFactorsFormOptions}
      layoutDir="vertical"
      submitForm={values => console.log('Submitted values:', values)}
      isGrid={true}
      showButton={true}
    />
  );
}

export default IncDecFactors;
