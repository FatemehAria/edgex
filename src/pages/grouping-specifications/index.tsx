import type { MyFormOptions } from '@/components/core/form';

import './grp-spec.css';

import { Button, Form } from 'antd';

import MyForm from '@/components/core/form';

const groupingSpecificationsFormOptions: MyFormOptions = [
  {
    name: 'grp-specification-title-english',
    label: 'عنوان انگلیسی',
    type: 'input',
    innerProps: { placeholder: '' },
  },
  {
    name: 'grp-specification-title-persian',
    // label: 'TitlePersian',
    label: 'عنوان فارسی',
    type: 'input',
    innerProps: { placeholder: '' },
  },
  {
    name: 'grp-specification-existence-code',
    label: 'موجودیت',
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
    <div className="form-container">
      <MyForm
        options={groupingSpecificationsFormOptions}
        onFinish={values => console.log('Submitted values:', values)}
        layout="vertical"
        style={{ padding: '0 1rem' }}
      >
        <Form.Item className="btn-container">
          <Button type="primary" htmlType="submit" className="submit-button">
            ثبت
          </Button>
        </Form.Item>
      </MyForm>
    </div>
  );
}

export default GroupingSpecifications;
