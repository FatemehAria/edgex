import type { MyFormOptions } from '@/components/core/form';

import RedirectionButton from '@/components/custom/RedirectionButton';
import { useLocale } from '@/locales';

import FormLayout from '../layout/form-layout';

interface IncDecFactorsProps {
  initialValues?: Record<string, any>; // Data for editing
  onSubmit: (formData: Record<string, any>) => void | Promise<void> | null; // Callback for form submission
  showButton?: boolean;
}

function IncDecFactors({ initialValues = {}, showButton = false, onSubmit }: IncDecFactorsProps) {
  const { formatMessage } = useLocale();

  const incDecFactorsFormOptions: MyFormOptions = [
    {
      name: 'inc-dec-title',
      label: `${formatMessage({ id: 'app.incDecFactors.title' })}`,
      type: 'input',
      innerProps: { placeholder: '', defaultValue: initialValues['inc-dec-title'] },
    },
    {
      name: 'inc-dec-mahiyat',
      label: `${formatMessage({ id: 'app.incDecFactors.origin' })}`,
      type: 'select',
      innerProps: {
        placeholder: `${formatMessage({ id: 'app.incDecFactors.origin.placeholder' })}`,
        defaultValue: initialValues['inc-dec-mahiyat'],
      },
      options: [],
    },
    {
      name: 'inc-dec-tasir',
      label: `${formatMessage({ id: 'app.incDecFactors.typeOfInf' })}`,
      type: 'select',
      innerProps: { placeholder: '', defaultValue: initialValues['inc-dec-tasir'] },
      options: [
        { label: `${formatMessage({ id: 'app.incDecFactors.typeOfInf.price' })}`, value: 'price' },
        { label: `${formatMessage({ id: 'app.incDecFactors.typeOfInf.percentage' })}`, value: 'percentage' },
      ],
    },
    {
      name: 'inc-dec-value',
      label: `${formatMessage({ id: 'app.incDecFactors.value' })}`,
      type: 'input',
      innerProps: { placeholder: '', defaultValue: initialValues['inc-dec-value'] },
    },
    {
      name: 'inc-dec-active',
      label: `${formatMessage({ id: 'app.incDecFactors.status' })}`,
      type: 'radio',
      options: [
        { label: `${formatMessage({ id: 'app.incDecFactors.status.active' })}`, value: true },
        { label: `${formatMessage({ id: 'app.incDecFactors.status.deactive' })}`, value: false },
      ],
      innerProps: { defaultValue: initialValues['inc-dec-active'] },
    },
    {
      name: 'inc-dec-display',
      label: `${formatMessage({ id: 'app.incDecFactors.showIn' })}`,
      type: 'radio',
      options: [
        { label: `${formatMessage({ id: 'app.incDecFactors.showIn.pen' })}`, value: 'ghalam' },
        { label: `${formatMessage({ id: 'app.incDecFactors.showIn.document' })}`, value: 'sanad' },
      ],
      innerProps: { defaultValue: initialValues['inc-dec-display'] },
    },
  ];

  const handleFormSubmit = (values: Record<string, any>) => {
    if (initialValues && initialValues.key) {
      // Edit mode: merge the key into the values before submitting
      onSubmit({ ...values, key: initialValues.key });
    } else {
      // Create mode
      onSubmit(values);
    }
  };

  return (
    <div style={{ overflow: 'hidden', height: ' 100vh' }}>
      <RedirectionButton
        btnText={formatMessage({ id: 'app.incDecFactors.redirectionBtn' })}
        linkAddress="/main-tables/factors/factors-list"
      />

      <FormLayout
        FormOptions={incDecFactorsFormOptions}
        layoutDir="vertical"
        submitForm={handleFormSubmit}
        isGrid={true}
        showButton={showButton}
      />
    </div>
  );
}

export default IncDecFactors;
