import type { MyFormOptions } from '@/components/core/form';

import React from 'react';

import { useLocale } from '@/locales';

import FormLayout from '../layout/form-layout';

function Supplier() {
  const { formatMessage } = useLocale();
  const supplierFormOptions: MyFormOptions = [
    {
      name: 'supplier-type',
      label: `${formatMessage({ id: 'app.supplier.type' })}`,
      type: 'select',
      innerProps: { placeholder: '' },
      options: [
        { label: formatMessage({ id: 'app.costumerInfo.costumerType.haghighi' }), value: 'Haghighi' },
        { label: formatMessage({ id: 'app.costumerInfo.costumerType.hoghooghi' }), value: 'Hoghooghi' },
      ],
    },
    {
      name: 'supplier-person-company',
      label: `${formatMessage({ id: 'app.supplier.personComp' })}`,
      type: 'select',
      innerProps: { placeholder: '' },
      options: [],
    },
  ];

  return (
    <FormLayout
      FormOptions={supplierFormOptions}
      layoutDir="vertical"
      submitForm={values => console.log('Submitted values:', values)}
      isGrid={false}
      showButton={true}
    />
  );
}

export default Supplier;
