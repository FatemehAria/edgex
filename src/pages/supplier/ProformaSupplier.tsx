import type { MyFormOptions } from '@/components/core/form';

import { useLocale } from '@/locales';

import FormLayout from '../layout/form-layout';
import { createSupplier } from './util';
import { useState } from 'react';

interface proformaSupplierProps {
  onSupplierSubmit?: (values: any) => void;
}

function ProformaSupplier({ onSupplierSubmit }: proformaSupplierProps) {
  const { formatMessage } = useLocale();
  const [personType, setPersonType] = useState('');

  const supplierFormOptions: MyFormOptions = [
    {
      name: 'personTypeCode',
      label: `${formatMessage({ id: 'app.personComapnyInfo.personType' })}`,
      type: 'select',
      innerProps: {
        placeholder: '',
        onChange: (value: any) => {
          setPersonType(value);
        },
      },
      options: [
        { label: 'حقیقی', value: 'Haghighi' },
        { label: 'حقوقی', value: 'Hoghooghi' },
      ],
    },
    {
      name: 'companyPersonTitle',
      label: `${formatMessage({ id: 'app.supplier.personComp' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'isActive',
      label: `${formatMessage({ id: 'app.personComapnyInfo.status' })}`,
      type: 'radio',
      options: [
        { label: `${formatMessage({ id: 'app.personComapnyInfo.status.active' })}`, value: true },
        { label: `${formatMessage({ id: 'app.personComapnyInfo.status.deactive' })}`, value: false },
      ],
      innerProps: {},
    },
  ];

  return (
    <FormLayout
      FormOptions={supplierFormOptions}
      layoutDir="vertical"
      submitForm={values => {
        if (onSupplierSubmit) onSupplierSubmit(values);
      }}
      isGrid={false}
      showButton={true}
    />
  );
}

export default ProformaSupplier;
