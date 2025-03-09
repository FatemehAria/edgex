import type { MyFormOptions } from '@/components/core/form';

import { useLocale } from '@/locales';

import FormLayout from '../layout/form-layout';
import { createFactor } from './util';

function IncDecFactors() {
  const { formatMessage } = useLocale();
  const incDecFactorsFormOptions: MyFormOptions = [
    {
      name: 'inc-dec-title',
      label: `${formatMessage({ id: 'app.incDecFactors.title' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'inc-dec-mahiyat',
      label: `${formatMessage({ id: 'app.incDecFactors.origin' })}`,
      type: 'select',
      innerProps: { placeholder: `${formatMessage({ id: 'app.incDecFactors.origin.placeholder' })}` },
      options: [],
    },
    {
      name: 'inc-dec-tasir',
      label: `${formatMessage({ id: 'app.incDecFactors.typeOfInf' })}`,
      type: 'select',
      innerProps: { placeholder: '' },
      options: [
        { label: `${formatMessage({ id: 'app.incDecFactors.typeOfInf.price' })}`, value: 'price' },
        { label: `${formatMessage({ id: 'app.incDecFactors.typeOfInf.percentage' })}`, value: 'percentage' },
      ],
    },
    {
      name: 'inc-dec-value',
      label: `${formatMessage({ id: 'app.incDecFactors.value' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'inc-dec-active',
      label: `${formatMessage({ id: 'app.incDecFactors.status' })}`,
      type: 'radio',
      options: [
        { label: `${formatMessage({ id: 'app.incDecFactors.status.active' })}`, value: true },
        { label: `${formatMessage({ id: 'app.incDecFactors.status.deactive' })}`, value: false },
      ],
    },
    {
      name: 'inc-dec-display',
      label: `${formatMessage({ id: 'app.incDecFactors.showIn' })}`,
      type: 'radio',
      options: [
        { label: `${formatMessage({ id: 'app.incDecFactors.showIn.pen' })}`, value: 'ghalam' },
        { label: `${formatMessage({ id: 'app.incDecFactors.showIn.document' })}`, value: 'sanad' },
      ],
    },
  ];

  return (
    <FormLayout
      FormOptions={incDecFactorsFormOptions}
      layoutDir="vertical"
      submitForm={values => createFactor(values)}
      isGrid={true}
      showButton={true}
    />
  );
}

export default IncDecFactors;
