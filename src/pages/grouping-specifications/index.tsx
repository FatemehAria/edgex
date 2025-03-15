import type { MyFormOptions } from '@/components/core/form';

import { useEffect, useState } from 'react';

import RedirectionButton from '@/components/custom/RedirectionButton';
import { useLocale } from '@/locales';

import FormLayout from '../layout/form-layout';
import { getExistanceList } from './util';

interface GroupingSpecificationsProps {
  initialValues?: Record<string, any>; // Data for editing
  onSubmit: (formData: Record<string, any>) => void | Promise<void> | null; // Callback for form submission
  showButton?: boolean;
}

function GroupingSpecifications({ initialValues = {}, showButton = false, onSubmit }: GroupingSpecificationsProps) {
  const { formatMessage } = useLocale();
  const [existenceCategoryList, setExistenceCategoryList] = useState([]);

  useEffect(() => {
    getExistanceList(setExistenceCategoryList);
  }, []);

  const groupingSpecificationsFormOptions: MyFormOptions = [
    {
      name: 'grp-specification-title-english',
      label: `${formatMessage({ id: 'app.grouping.engTitle' })}`,
      type: 'input',
      innerProps: { placeholder: '', defaultValue: initialValues['grp-specification-title-english'] },
    },
    {
      name: 'grp-specification-title-persian',
      // label: 'TitlePersian',
      label: `${formatMessage({ id: 'app.grouping.perTitle' })}`,
      type: 'input',
      innerProps: { placeholder: '', defaultValue: initialValues['grp-specification-title-persian'] },
    },
    {
      name: 'grp-specification-existence-code',
      label: `${formatMessage({ id: 'app.grouping.existance' })}`,
      type: 'select',
      innerProps: {
        placeholder: `${formatMessage({ id: 'app.grouping.existance.placeholder' })}`,
        defaultValue: initialValues['grp-specification-existence-code'],
      },
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
    <div className="form-container" style={{ overflow: 'hidden', height: ' 100vh' }}>
      <RedirectionButton
        btnText="مشاهده لیست گروهبندی ها"
        linkAddress="/main-tables/grouping-specifications/groups-list"
      />
      <FormLayout
        FormOptions={groupingSpecificationsFormOptions}
        layoutDir="vertical"
        submitForm={handleFormSubmit}
        isGrid={false}
        showButton={showButton}
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
