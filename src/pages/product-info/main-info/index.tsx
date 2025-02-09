import type { MyFormOptions } from '@/components/core/form';

import MyForm from '@/components/core/form';

function MainInfo() {
  const productMainInfoformOptions: MyFormOptions = [
    {
      name: 'product-info-title',
      label: 'عنوان',
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'product-info-title-persian',
      label: 'TitlePersian',
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'product-info-typeof-product',
      label: 'نوع کالا',
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'product-info-weight',
      label: 'Weight',
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'product-info-nerkh',
      label: 'نرخ',
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'grp-specification-desc',
      label: 'توضیحات',
      type: 'textarea',
      innerProps: { placeholder: '' },
    },
  ];

  return (
    <div>
      <MyForm options={productMainInfoformOptions} onFinish={values => console.log('Submitted values:', values)} />
    </div>
  );
}

export default MainInfo;
