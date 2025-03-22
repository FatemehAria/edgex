import type { MyFormOptions } from '@/components/core/form';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useLocale } from '@/locales';
import FormLayout from '@/pages/layout/form-layout';

import { getExistenceList } from './util';

interface ProformaGroupingProps {
  onGroupSubmit?: (values: any) => void;
}

function ProformaGrouping({ onGroupSubmit }: ProformaGroupingProps) {
  const { formatMessage } = useLocale();
  const [existanceList, setExistanceList] = useState<any>([]);
  const { locale } = useSelector(state => state.user);

  useEffect(() => {
    getExistenceList(setExistanceList, locale);
  }, []);
  const groupingFormOptions: MyFormOptions = [
    {
      name: 'Title',
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
      name: 'ExistenceCode',
      label: `${formatMessage({ id: 'app.grouping.existance' })}`,
      type: 'select',
      innerProps: { placeholder: `${formatMessage({ id: 'app.grouping.existance.placeholder' })}` },
      options: existanceList,
    },
    // {
    //   name: 'grp-specification-level-code',
    //   label: 'LevelCode:',
    //   type: 'input',
    //   innerProps: { placeholder: '' },
    // },
  ];

  return (
    <FormLayout
      FormOptions={groupingFormOptions}
      layoutDir="vertical"
      submitForm={values => {
        console.log('Submitted values:', values);

        if (onGroupSubmit) {
          onGroupSubmit(values);
        }
      }}
      isGrid={false}
      showButton={true}
    />
  );
}

export default ProformaGrouping;
