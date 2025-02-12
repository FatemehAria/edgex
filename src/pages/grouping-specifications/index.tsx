import type { MyFormOptions } from '@/components/core/form';

import { useLocale } from '@/locales';

import FormLayout from '../layout/form-layout';

function GroupingSpecifications() {
  const { formatMessage } = useLocale();
  const groupingSpecificationsFormOptions: MyFormOptions = [
    {
      name: 'grp-specification-title-english',
      label: `${formatMessage({ id: 'app.grouping.engTitle' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'grp-specification-title-persian',
      // label: 'TitlePersian',
      label: `${formatMessage({ id: 'app.grouping.perTitle' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'grp-specification-existence-code',
      label: `${formatMessage({ id: 'app.grouping.existance' })}`,
      type: 'select',
      innerProps: { placeholder: `${formatMessage({ id: 'app.grouping.existance.placeholder' })}` },
      options: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
      ],
    },
    // {
    //   name: 'grp-specification-level-code',
    //   label: 'LevelCode:',
    //   type: 'input',
    //   innerProps: { placeholder: '' },
    // },
  ];
  // const handleSubmit = () => {
  //   console.log('submittedّ');
  // };

  return (
    <div className="form-container">
      <FormLayout
        FormOptions={groupingSpecificationsFormOptions}
        layoutDir="vertical"
        submitForm={values => console.log('Submitted values:', values)}
        isGrid={false}
      />
      {/* <MyForm
        options={groupingSpecificationsFormOptions}
        onFinish={values => console.log('Submitted values:', values)}
        layout="vertical"
        className="form-styling"
      >
        <Form.Item className="btn-container">
          <Button type="primary" htmlType="submit" className="submit-button">
            ثبت
          </Button>
        </Form.Item>
      </MyForm> */}
    </div>
  );
}

export default GroupingSpecifications;
