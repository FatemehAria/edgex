import type { MyFormOptions } from '@/components/core/form';

import { useLocale } from '@/locales';
import FormLayout from '@/pages/layout/form-layout';

interface MainInfoProps {
  initialValues?: Record<string, any>; // Data for editing
  onSubmit: (formData: Record<string, any>) => void | Promise<void> | null; // Callback for form submission
  showButton?: boolean;
  groupValue: string;
  isCopied?: boolean;
}

function MainInfo({ initialValues = {}, showButton = false, onSubmit }: MainInfoProps) {
  const { formatMessage } = useLocale();
  const productMainInfoformOptions: MyFormOptions = [
    {
      name: 'Title',
      label: `${formatMessage({ id: 'app.productInfo.mainInfo.englishTitle' })}`,
      type: 'input',
      innerProps: { placeholder: '', defaultValue: initialValues['Title'] },
    },
    {
      name: 'TitlePersian',
      label: `${formatMessage({ id: 'app.productInfo.mainInfo.persianTitle' })}`,
      type: 'input',
      innerProps: { placeholder: '', defaultValue: initialValues['TitlePersian'] },
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
      name: 'Description',
      label: `${formatMessage({ id: 'app.productInfo.mainInfo.desc' })}`,
      type: 'textarea',
      innerProps: { placeholder: '', defaultValue: initialValues['Description'] },
    },
  ];

  // const handleFormSubmit = (values: Record<string, any>) => {
  //   console.log('is copied', isCopied);

  //   if (initialValues && initialValues.key && isCopied === false) {
  //     // Edit mode: merge the key into the values before submitting
  //     onSubmit({ ...values, key: initialValues.key, categoryId: groupValue });
  //   } else {
  //     // Create mode
  //     onSubmit(values);
  //   }
  // };

  return (
    <div>
      <FormLayout
        FormOptions={productMainInfoformOptions}
        layoutDir="vertical"
        submitForm={onSubmit}
        isGrid={true}
        showButton={showButton}
      />
    </div>
  );
}

export default MainInfo;
