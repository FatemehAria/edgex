import type { MyFormOptions } from '@/components/core/form';

import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useLocale } from '@/locales';

import FormLayout from '../layout/form-layout';
import { getExistenceList } from './util';

interface GroupFormProps {
  initialValues?: Record<string, any>;
  onSubmit: (formData: Record<string, any>) => void | Promise<void> | null;
  onCancel?: () => void;
  showButton?: boolean;
}

function GroupForm({ initialValues = {}, showButton = false, onSubmit, onCancel }: GroupFormProps) {
  const { formatMessage } = useLocale();
  const { locale } = useSelector(state => state.user);
  const [existanceList, setExistenceList] = useState<any>([]);

  useEffect(() => {
    getExistenceList(setExistenceList, locale);
  }, [locale]);

  const GroupFormFormOptions: MyFormOptions = [
    {
      name: 'Title',
      label: `${formatMessage({ id: 'app.grouping.engTitle' })}`,
      type: 'input',
      innerProps: { placeholder: '', defaultValue: initialValues['Title'] },
    },
    {
      name: 'TitlePersian',
      label: `${formatMessage({ id: 'app.grouping.perTitle' })}`,
      type: 'input',
      innerProps: { placeholder: '', defaultValue: initialValues['TitlePersian'] },
    },
    {
      name: 'ExistenceCode',
      label: `${formatMessage({ id: 'app.grouping.existance' })}`,
      type: 'select',
      innerProps: {
        placeholder: `${formatMessage({ id: 'app.grouping.existance.placeholder' })}`,
        defaultValue: initialValues['ExistenceCode'],
      },
      options: existanceList,
      hidden: true,
    },
  ];

  return (
    <div className="form-container">
      <FormLayout
        FormOptions={GroupFormFormOptions}
        layoutDir="vertical"
        submitForm={onSubmit}
        isGrid={false}
        showButton={showButton}
        onCancel={onCancel}
        showCancelButton={!!initialValues.key}
      />
    </div>
  );
}

export default GroupForm;
