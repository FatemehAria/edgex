import type { MyFormOptions } from '@/components/core/form';

import React from 'react';

import { useLocale } from '@/locales';

import FormLayout from '../layout/form-layout';

function CostumerInfo() {
  const { formatMessage } = useLocale();
  const costumerInfoFormOptions: MyFormOptions = [
    {
      name: 'costumer-info-type',
      label: `${formatMessage({ id: 'app.costumerInfo.type' })}`,
      type: 'select',
      innerProps: { placeholder: '' },
      options: [],
    },
    {
      name: 'costumer-info-person-type',
      label: `${formatMessage({ id: 'app.costumerInfo.costumerType' })}`,
      type: 'select',
      innerProps: { placeholder: '' },
      options: [
        { label: `${formatMessage({ id: 'app.costumerInfo.costumerType.haghighi' })}`, value: 'Haghighi' },
        { label: `${formatMessage({ id: 'app.costumerInfo.costumerType.hoghooghi' })}`, value: 'Hoghooghi' },
      ],
    },
    {
      name: 'costumer-info-factor-code',
      label: `${formatMessage({ id: 'app.costumerInfo.factorCode' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'costumer-info-org-code',
      label: `${formatMessage({ id: 'app.costumerInfo.orgCode' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'costumer-info-active',
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
      FormOptions={costumerInfoFormOptions}
      layoutDir="vertical"
      submitForm={values => console.log('Submitted values:', values)}
      isGrid={false}
    />
  );
}

export default CostumerInfo;
