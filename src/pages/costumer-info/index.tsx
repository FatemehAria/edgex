import type { MyFormOptions } from '@/components/core/form';

import React, { useState } from 'react';

import { useLocale } from '@/locales';

import FormLayout from '../layout/form-layout';

interface CostumerInfoProps {
  onCustomerSubmit?: (values: any) => void;
  initialValues?: Record<string, any>;
}

function CostumerInfo({ onCustomerSubmit, initialValues = {} }: CostumerInfoProps) {
  const { formatMessage } = useLocale();
  const [formKey, setFormKey] = useState(0);

  const costumerInfoFormOptions: MyFormOptions = [
    {
      name: 'IsCustomer',
      label: `${formatMessage({ id: 'app.costumerInfo.isCostumerTitle' })}`,
      type: 'radio',
      options: [
        { label: `${formatMessage({ id: 'app.costumerInfo.isCostumer' })}`, value: true },
        { label: `${formatMessage({ id: 'app.costumerInfo.isNotCostumer' })}`, value: false },
      ],
      innerProps: {
        onChange: (value: any) => localStorage.setItem('costumer-info-isCostumer', JSON.stringify(value.target.value)),
        defaultValue: initialValues['IsCustomer'] === 'True' ? true : false,
      },
    },
    {
      name: 'costumer-info-active',
      label: `${formatMessage({ id: 'app.costumerInfo.status' })}`,
      type: 'radio',
      options: [
        { label: `${formatMessage({ id: 'app.costumerInfo.status.active' })}`, value: true },
        { label: `${formatMessage({ id: 'app.costumerInfo.status.deactive' })}`, value: false },
      ],
      innerProps: {
        onChange: (value: any) => localStorage.setItem('costumer-info-active', JSON.stringify(value.target.value)),
      },
    },
  ];

  const handleSubmit = (values: any) => {
    if (onCustomerSubmit) {
      onCustomerSubmit(values);
    }

    setFormKey(prevKey => prevKey + 1);
  };

  return (
    <FormLayout
      key={formKey}
      FormOptions={costumerInfoFormOptions}
      layoutDir="vertical"
      submitForm={handleSubmit}
      isGrid={false}
      showButton={false}
    />
  );
}

export default CostumerInfo;
