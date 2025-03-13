import type { MyFormOptions } from '@/components/core/form';

import { useLocale } from '@/locales';
import FormLayout from '@/pages/layout/form-layout';


interface MainInfoProps {
  initialValues?: Record<string, any>; // Data for editing
  onSubmit: (formData: Record<string, any>) => void | Promise<void> | null; // Callback for form submission
  showButton?: boolean;
}

function MainInfo({ initialValues = {}, showButton = false, onSubmit }: MainInfoProps) {
  const { formatMessage } = useLocale();
  const productMainInfoformOptions: MyFormOptions = [
    {
      name: 'product-info-title-english',
      label: `${formatMessage({ id: 'app.productInfo.mainInfo.englishTitle' })}`,
      type: 'input',
      innerProps: { placeholder: '', defaultValue: initialValues['product-info-title-english'] },
    },
    {
      name: 'product-info-title-persian',
      label: `${formatMessage({ id: 'app.productInfo.mainInfo.persianTitle' })}`,
      type: 'input',
      innerProps: { placeholder: '', defaultValue: initialValues['product-info-title-persian'] },
    },
    // {
    //   name: 'product-info-typeof-product',
    //   label: `${formatMessage({ id: 'app.productInfo.mainInfo.typeOfProduct' })}`,
    //   type: 'input',
    //   innerProps: { placeholder: '' },
    // },
    // {
    //   name: 'product-info-weight',
    //   label: `${formatMessage({ id: 'app.productInfo.mainInfo.weight' })}`,
    //   type: 'input-number',
    //   innerProps: { placeholder: '', min: 1 },
    // },
    {
      name: 'product-info-rate',
      label: `${formatMessage({ id: 'app.productInfo.mainInfo.rate' })}`,
      type: 'input-number',
      innerProps: { placeholder: '', defaultValue: initialValues['product-info-rate'] },
    },
    {
      name: 'product-specification-desc',
      label: `${formatMessage({ id: 'app.productInfo.mainInfo.desc' })}`,
      type: 'textarea',
      innerProps: { placeholder: '', defaultValue: initialValues['product-specification-desc'] },
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
    <div>
      <FormLayout
        FormOptions={productMainInfoformOptions}
        layoutDir="vertical"
        submitForm={handleFormSubmit}
        isGrid={true}
        showButton={showButton}
      />
    </div>
  );
}

export default MainInfo;
