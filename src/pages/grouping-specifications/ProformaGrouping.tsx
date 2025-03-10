import type { MyFormOptions } from '@/components/core/form';

import React from 'react';

import { useLocale } from '@/locales';
import FormLayout from '@/pages/layout/form-layout';

interface ProformaGroupingProps {
  onGroupSubmit?: (values: any) => void;
}

function ProformaGrouping({ onGroupSubmit }: ProformaGroupingProps) {
  const { formatMessage } = useLocale();
  const groupingFormOptions: MyFormOptions = [
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
