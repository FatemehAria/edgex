import type { MyFormOptions } from '@/components/core/form';

import React from 'react';

import { useLocale } from '@/locales';

import FormLayout from '../layout/form-layout';

function ProductSupplier() {
  const { formatMessage } = useLocale();
  const productSupplierFormOptions: MyFormOptions = [
    {
      name: 'product-supplier-type',
      label: `${formatMessage({ id: 'app.productSupplier.personType' })}`,
      type: 'select',
      innerProps: { placeholder: '' },
      options: [
        { label: `${formatMessage({ id: 'app.productSupplier.personType.haghighi' })}`, value: 'Haghighi' },
        { label: `${formatMessage({ id: 'app.productSupplier.personType.hoghooghi' })}`, value: 'Hoghooghi' },
      ],
    },
    {
      name: 'product-supplier-province',
      label: `${formatMessage({ id: 'app.productSupplier.province' })}`,
      type: 'select',
      innerProps: { placeholder: '' },
    },
  ];

  return (
    <FormLayout
      FormOptions={productSupplierFormOptions}
      layoutDir="vertical"
      submitForm={values => console.log('Submitted values:', values)}
      isGrid={false}
    />
  );
}

export default ProductSupplier;
