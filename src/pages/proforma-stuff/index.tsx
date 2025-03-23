import type { MyFormOptions } from '@/components/core/form';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { useLocale } from '@/locales';

import { getStuffbyId } from '../home/util';
import FormLayout from '../layout/form-layout';

interface ProformaStuffProps {
  onItemSubmit?: (values: any) => void;
}

function ProformaStuff({ onItemSubmit }: ProformaStuffProps) {
  const { formatMessage } = useLocale();
  const [stuffList, setStuffList] = useState<any>([]);
  const { locale } = useSelector(state => state.user);


  const proformaStuffFormOptions: MyFormOptions = [
    {
      name: 'title',
      label: `${formatMessage({ id: 'app.grouping.engTitle' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'titlePersian',
      label: `${formatMessage({ id: 'app.grouping.perTitle' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'description',
      label: `${formatMessage({ id: 'app.grouping.desc' })}`,
      type: 'textarea',
      innerProps: { placeholder: '' },
    },
  ];

  return (
    <FormLayout
      FormOptions={proformaStuffFormOptions}
      layoutDir="vertical"
      submitForm={values => {
        console.log('Submitted values:', values);

        if (onItemSubmit) {
          onItemSubmit(values);
        }
      }}
      isGrid={false}
      showButton={true}
    />
  );
}

export default ProformaStuff;
