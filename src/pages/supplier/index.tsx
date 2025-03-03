import type { MyFormOptions } from '@/components/core/form';

import { useLocale } from '@/locales';

import FormLayout from '../layout/form-layout';
import { createSupplier } from './util';

interface SupplierProps {
  onSupplierSubmit?: (values: any) => void;
}

function Supplier({ onSupplierSubmit }: SupplierProps) {
  const { formatMessage } = useLocale();
  const supplierFormOptions: MyFormOptions = [
    // {
    //   name: 'supplier-type',
    //   label: `${formatMessage({ id: 'app.supplier.type' })}`,
    //   type: 'select',
    //   innerProps: { placeholder: '' },
    //   options: [
    //     { label: formatMessage({ id: 'app.costumerInfo.costumerType.haghighi' }), value: 'Haghighi' },
    //     { label: formatMessage({ id: 'app.costumerInfo.costumerType.hoghooghi' }), value: 'Hoghooghi' },
    //   ],
    // },
    // {
    //   // Change this field from 'select' to 'input'
    //   name: 'supplier-person-company',
    //   label: `${formatMessage({ id: 'app.supplier.personComp' })}`,
    //   type: 'input',
    //   innerProps: { placeholder: '' },
    //   // Remove options here, so the user can type their own value.
    // },
    {
      name: 'supplier-isSupplier',
      label: `${formatMessage({ id: 'app.supplier.isSupplierTitle' })}`,
      type: 'radio',
      options: [
        { label: `${formatMessage({ id: 'app.supplier.isSupplier' })}`, value: true },
        { label: `${formatMessage({ id: 'app.supplier.isNotSupplier' })}`, value: false },
      ],
    },
    {
      name: 'supplier-status',
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
      FormOptions={supplierFormOptions}
      layoutDir="vertical"
      submitForm={values => {
        if (onSupplierSubmit) onSupplierSubmit(values);
        createSupplier(values);
      }}
      isGrid={false}
      showButton={true}
    />
  );
}

export default Supplier;
