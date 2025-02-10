import type { MyFormOptions } from '@/components/core/form';

import FormLayout from '@/pages/layout/form-layout';

function MainInfo() {
  const productMainInfoformOptions: MyFormOptions = [
    {
      name: 'product-info-title-english',
      label: 'عنوان انگلیسی:',
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'product-info-title-persian',
      label: 'عنوان فارسی:',
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'product-info-typeof-product',
      label: 'نوع کالا:',
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'product-info-weight',
      label: 'وزن:',
      type: 'input-number',
      innerProps: { placeholder: '', min: 1 },
    },
    {
      name: 'product-info-nerkh',
      label: 'نرخ:',
      type: 'input-number',
      innerProps: { placeholder: '' },
    },
    {
      name: 'grp-specification-desc',
      label: 'توضیحات:',
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
      />
    </div>
  );
}

export default MainInfo;
