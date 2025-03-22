import type { MyFormOptions } from '@/components/core/form';

import React from 'react';

import { useLocale } from '@/locales';

import FormLayout from '../layout/form-layout';

interface ProformaCostumerProps {
  onCustomerSubmit?: (values: any) => void;
}

function ProformaCostumer({ onCustomerSubmit }: ProformaCostumerProps) {
  const { formatMessage } = useLocale();
  const costumerInfoFormOptions: MyFormOptions = [
    // {
    //   name: 'costumer-info-type',
    //   label: `${formatMessage({ id: 'app.costumerInfo.type' })}`,
    //   type: 'select',
    //   innerProps: { placeholder: '' },
    //   options: [
    //     { label: formatMessage({ id: 'app.costumerInfo.costumerType.haghighi' }), value: 'Haghighi' },
    //     { label: formatMessage({ id: 'app.costumerInfo.costumerType.hoghooghi' }), value: 'Hoghooghi' },
    //   ],
    // },
    // {
    //   name: 'costumer-info-person-type',
    //   label: `${formatMessage({ id: 'app.costumerInfo.costumerType' })}`,
    //   type: 'select',
    //   innerProps: { placeholder: '' },
    //   options: [],
    // },
    {
      name: 'companyPersonTitle',
      label: `${formatMessage({ id: 'app.costumerInfo.factorCode' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        onChange: (value: any) => localStorage.setItem('header-info-costumer', JSON.stringify(value.target.value)),
      },
    },
    // {
    //   name: 'costumer-info-org-code',
    //   label: `${formatMessage({ id: 'app.costumerInfo.orgCode' })}`,
    //   type: 'input',
    //   innerProps: { placeholder: '' },
    // },
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
