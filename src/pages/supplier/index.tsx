import type { MyFormOptions } from '@/components/core/form';

import { useState } from 'react';

import { useLocale } from '@/locales';

import FormLayout from '../layout/form-layout';
import { createSupplier } from './util';

interface SupplierProps {
  onSupplierSubmit?: (values: any) => void;
  initialValues?: Record<string, any>;
}

function Supplier({ onSupplierSubmit, initialValues = {} }: SupplierProps) {
  const { formatMessage } = useLocale();
  const [formKey, setFormKey] = useState(0);

  const supplierFormOptions: MyFormOptions = [
    {
      name: 'IsSuplier',
      label: `${formatMessage({ id: 'app.supplier.isSupplierTitle' })}`,
      type: 'radio',
      options: [
        { label: `${formatMessage({ id: 'app.supplier.isSupplier' })}`, value: true },
        { label: `${formatMessage({ id: 'app.supplier.isNotSupplier' })}`, value: false },
      ],
      innerProps: {
        onChange: (value: any) => localStorage.setItem('supplier-isSupplier', JSON.stringify(value.target.value)),
        defaultValue: initialValues['IsSuplier'] === 'True' ? true : false,
      },
    },
    {
      name: 'supplier-status',
      label: `${formatMessage({ id: 'app.costumerInfo.status' })}`,
      type: 'radio',
      options: [
        { label: `${formatMessage({ id: 'app.costumerInfo.status.active' })}`, value: true },
        { label: `${formatMessage({ id: 'app.costumerInfo.status.deactive' })}`, value: false },
      ],
      innerProps: {
        onChange: (value: any) => localStorage.setItem('supplier-status', JSON.stringify(value.target.value)),
      },
    },
  ];

  const handleSubmit = (values: any) => {
    if (onSupplierSubmit) onSupplierSubmit(values);
    createSupplier(values);
    setFormKey(prevKey => prevKey + 1);
  };

  return (
    <FormLayout
      key={formKey}
      FormOptions={supplierFormOptions}
      layoutDir="vertical"
      submitForm={handleSubmit}
      isGrid={false}
      showButton={false}
    />
  );
}

export default Supplier;
