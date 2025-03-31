import type { MyFormOptions } from '@/components/core/form';

import { useLocale } from '@/locales';

import FormLayout from '../layout/form-layout';

interface CostumerInfoProps {
  onCustomerSubmit?: (values: any) => void;
  initialValues?: Record<string, any>;
}

function CostumerInfo({ onCustomerSubmit, initialValues = {} }: CostumerInfoProps) {
  const { formatMessage } = useLocale();
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
      name: 'IsActiveCustomer',
      label: `${formatMessage({ id: 'app.costumerInfo.status' })}`,
      type: 'radio',
      options: [
        { label: `${formatMessage({ id: 'app.costumerInfo.status.active' })}`, value: true },
        { label: `${formatMessage({ id: 'app.costumerInfo.status.deactive' })}`, value: false },
      ],
      innerProps: {
        onChange: (value: any) => localStorage.setItem('costumer-info-active', JSON.stringify(value.target.value)),
        defaultValue: initialValues['IsActiveCustomer'] === 'True' ? true : false,
      },
    },
  ];

  return (
    <FormLayout
      FormOptions={costumerInfoFormOptions}
      layoutDir="vertical"
      submitForm={values => {
        if (onCustomerSubmit) {
          onCustomerSubmit(values);
        }
      }}
      isGrid={false}
      showButton={false}
    />
  );
}

export default CostumerInfo;
