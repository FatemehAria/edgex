import type { MyFormOptions } from '@/components/core/form';

import { useContext } from 'react';

import { ProvinceContext } from '@/context/ProvinceContext';
import { useLocale } from '@/locales';

import FormLayout from '../layout/form-layout';

function ProductSupplier() {
  const { formatMessage } = useLocale();
  const { provinceList } = useContext(ProvinceContext);

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
      options: provinceList,
    },
  ];

  return (
    <FormLayout
      FormOptions={productSupplierFormOptions}
      layoutDir="vertical"
      submitForm={values => console.log('Submitted values:', values)}
      isGrid={false}
      showButton={true}
    />
  );
}

export default ProductSupplier;
