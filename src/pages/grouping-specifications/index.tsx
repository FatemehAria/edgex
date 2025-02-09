import type { MyFormOptions } from '@/components/core/form';

import React from 'react';

import MyInput from '@/components/basic/input';
import MyForm from '@/components/core/form';

const formOptions: MyFormOptions = [
  {
    name: 'grp-specification-title',
    label: 'عنوان',
    type: 'input',
    required: true,
    innerProps: { placeholder: '' },
  },
  {
    name: 'grp-specification-title-persian',
    label: 'TitlePersian',
    type: 'input',
    innerProps: { placeholder: '' },
  },
  {
    name: 'grp-specification-existence-code',
    label: 'ExistenceCode',
    type: 'select',
    innerProps: { placeholder: 'انتخاب موجودیت' },
    options: [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
    ],
  },
  {
    name: 'grp-specification-level-code',
    label: 'LevelCode',
    type: 'input',
    innerProps: { placeholder: '' },
  },
];

function GroupingSpecifications() {
  // const handleSubmit = () => {
  //   console.log('submittedّ');
  // };

  return (
    <div>
      <p>ایجاد مشخصات گروهبندی</p>
      <MyForm options={formOptions} onFinish={values => console.log('Submitted values:', values)} />
    </div>
  );
}

export default GroupingSpecifications;
