import type { MyFormOptions } from '@/components/core/form';

import React from 'react';
import FormLayout from '../layout/form-layout';

const productSupplierFormOptions: MyFormOptions = [
  {
    name: 'product-supplier-type',
    label: 'نوع شخص:',
    type: 'select',
    innerProps: { placeholder: '' },
    options: [
      { label: 'حقیقی', value: 'Haghighi' },
      { label: 'حقوقی', value: 'Hoghooghi' },
    ],
  },
  {
    name: 'product-supplier-province',
    label: 'استان:',
    type: 'select',
    innerProps: { placeholder: '' },
  },
];

function ProductSupplier() {
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
