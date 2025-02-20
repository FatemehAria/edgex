import type { MyFormOptions } from '@/components/core/form';

import { useLocale } from '@/locales';
import FormLayout from '@/pages/layout/form-layout';

function MainInfo() {
  const { formatMessage } = useLocale();
  const productMainInfoformOptions: MyFormOptions = [
    {
      name: 'product-info-title-english',
      label: `${formatMessage({ id: 'app.productInfo.mainInfo.englishTitle' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'product-info-title-persian',
      label: `${formatMessage({ id: 'app.productInfo.mainInfo.persianTitle' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'product-info-typeof-product',
      label: `${formatMessage({ id: 'app.productInfo.mainInfo.typeOfProduct' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'product-info-weight',
      label: `${formatMessage({ id: 'app.productInfo.mainInfo.weight' })}`,
      type: 'input-number',
      innerProps: { placeholder: '', min: 1 },
    },
    {
      name: 'product-info-rate',
      label: `${formatMessage({ id: 'app.productInfo.mainInfo.rate' })}`,
      type: 'input-number',
      innerProps: { placeholder: '' },
    },
    {
      name: 'grp-specification-desc',
      label: `${formatMessage({ id: 'app.productInfo.mainInfo.desc' })}`,
      type: 'textarea',
      innerProps: { placeholder: '' },
    },
  ];

  return (
    <div>
      <FormLayout
        FormOptions={productMainInfoformOptions}
        layoutDir="vertical"
        submitForm={values => console.log('Submitted values:', values)}
        isGrid={true}
        showButton={true}
      />
    </div>
  );
}

export default MainInfo;
