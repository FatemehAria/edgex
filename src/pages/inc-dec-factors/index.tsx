import type { MyFormOptions } from '@/components/core/form';

import { theme } from 'antd';
import { useEffect, useState } from 'react';

import RedirectionButton from '@/components/custom/RedirectionButton';
import { useLocale } from '@/locales';

import FormLayout from '../layout/form-layout';
import { getNatureList } from './util';

interface IncDecFactorsProps {
  initialValues?: Record<string, any>;
  onSubmit: (formData: Record<string, any>) => void | Promise<void> | null;
  onCancel?: () => void;
  showButton?: boolean;
}

function IncDecFactors({ initialValues = {}, showButton = false, onSubmit, onCancel }: IncDecFactorsProps) {
  const { formatMessage } = useLocale();
  const [natureList, setNatureList] = useState([]);
  const [display, setDisplay] = useState('block');
  const { token } = theme.useToken();
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    getNatureList(setNatureList);
  }, []);

  useEffect(() => {
    if (initialValues && initialValues.key) {
      setDisplay('none');
    } else {
      setDisplay('block');
    }
  }, []);

  const incDecFactorsFormOptions: MyFormOptions = [
    {
      name: 'Title',
      label: `${formatMessage({ id: 'app.incDecFactors.title' })}`,
      type: 'input',
      innerProps: { placeholder: '', defaultValue: initialValues['Title'] },
    },
    {
      name: 'inc-dec-mahiyat',
      label: `${formatMessage({ id: 'app.incDecFactors.origin' })}`,
      type: 'select',
      innerProps: {
        placeholder: `${formatMessage({ id: 'app.incDecFactors.origin.placeholder' })}`,
        defaultValue: initialValues['inc-dec-mahiyat'],
      },
      options: natureList.map((item: any) => ({
        label: item.description,
        value: item.id,
      })),
    },
    {
      name: 'inc-dec-tasir',
      label: `${formatMessage({ id: 'app.incDecFactors.typeOfInf' })}`,
      type: 'select',
      innerProps: {
        placeholder: '',
        // defaultValue: initialValues['influcence']
        //   ? initialValues['influcence'].toString().includes('%')
        //     ? 'percentage'
        //     : 'price'
        //   : 'price',
        defaultValue: initialValues['inc-dec-tasir'],
      },
      options: [
        { label: `${formatMessage({ id: 'app.incDecFactors.typeOfInf.price' })}`, value: 'price' },
        { label: `${formatMessage({ id: 'app.incDecFactors.typeOfInf.percentage' })}`, value: 'percentage' },
      ],
    },
    {
      name: 'influcence',
      label: `${formatMessage({ id: 'app.incDecFactors.value' })}`,
      type: 'input',
      innerProps: { placeholder: '', defaultValue: initialValues['influcence'] },
    },
    {
      name: 'inc-dec-active',
      label: `${formatMessage({ id: 'app.incDecFactors.status' })}`,
      type: 'radio',
      options: [
        { label: `${formatMessage({ id: 'app.incDecFactors.status.active' })}`, value: true },
        { label: `${formatMessage({ id: 'app.incDecFactors.status.deactive' })}`, value: false },
      ],
      innerProps: { defaultValue: initialValues['inc-dec-active'] },
    },
    {
      name: 'inc-dec-display',
      label: `${formatMessage({ id: 'app.incDecFactors.showIn' })}`,
      type: 'radio',
      options: [
        { label: `${formatMessage({ id: 'app.incDecFactors.showIn.pen' })}`, value: 'displayPen' },
        { label: `${formatMessage({ id: 'app.incDecFactors.showIn.document' })}`, value: 'displayDocument' },
      ],
      innerProps: {
        defaultValue: initialValues.displayPen ? 'displayPen' : initialValues.displayDocument ? 'displayDocument' : '',
      },
    },
  ];

  // const handleFormSubmit = (values: Record<string, any>) => {
  //   if (initialValues && initialValues.key) {
  //     // Edit mode: merge the key into the values before submitting
  //     onSubmit({ ...values, key: initialValues.key });
  //   } else {
  //     // Create mode
  //     onSubmit(values);
  //   }
  // };

  const handleSubmission = async (values: any) => {
    await onSubmit(values);
    setFormKey(prevKey => prevKey + 1);
  };

  return (
    <div style={{ backgroundColor: token.colorBgBlur, minHeight: '100vh' }}>
      <RedirectionButton
        btnText={formatMessage({ id: 'app.incDecFactors.redirectionBtn' })}
        linkAddress="/main-tables/factors/factors-list"
        display={display}
      />

      <FormLayout
        key={formKey}
        FormOptions={incDecFactorsFormOptions}
        layoutDir="vertical"
        submitForm={handleSubmission}
        isGrid={true}
        showButton={showButton}
        showCancelButton={!!initialValues.key}
        onCancel={onCancel}
      />
    </div>
  );
}

export default IncDecFactors;
