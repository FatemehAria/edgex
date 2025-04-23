import type { MyFormOptions } from '@/components/core/form';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useLocale } from '@/locales';
import FormLayout from '@/pages/layout/form-layout';

import { getGroupItems } from '../grouping/util';

interface MainInfoProps {
  initialValues?: Record<string, any>;
  onSubmit: (formData: Record<string, any>) => void | Promise<void> | null;
  showButton?: boolean;
  onCancel?: () => void;
  children?: React.ReactNode;
}

function MainInfo({ initialValues = {}, showButton = false, onSubmit, children, onCancel }: MainInfoProps) {
  const { formatMessage } = useLocale();
  const [treeData, setTreeData] = useState([]);
  const { locale } = useSelector(state => state.user);

  useEffect(() => {
    getGroupItems(setTreeData, locale);
  }, [locale]);

  const addTreeData = () => {
    return treeData.map((item: any) => {
      return {
        value: item.id,
        title: item.text,
        children: item.children,
      };
    });
  };

  const treeDataAnt = addTreeData();

  const productMainInfoformOptions: MyFormOptions = [
    {
      name: 'categoryId',
      label: `${formatMessage({ id: 'app.productInfo.group.label' })}`,
      type: 'treeselect',
      innerProps: {
        treeData: treeDataAnt,
        treeDefaultExpandAll: true,
        placeholder: `${formatMessage({ id: 'app.productInfo.grouping.tree.placeholder' })}`,
        allowClear: true,
        defaultValue: initialValues['categoryId'],
        treeCheckable: true,
      },
    },
    {
      name: 'Title',
      label: `${formatMessage({ id: 'app.productInfo.mainInfo.englishTitle' })}`,
      type: 'input',
      innerProps: { placeholder: '', defaultValue: initialValues['Title'] },
    },
    {
      name: 'TitlePersian',
      label: `${formatMessage({ id: 'app.productInfo.mainInfo.persianTitle' })}`,
      type: 'input',
      innerProps: { placeholder: '', defaultValue: initialValues['TitlePersian'] },
    },
    {
      name: 'product-info-rate',
      label: `${formatMessage({ id: 'app.productInfo.mainInfo.rate' })}`,
      type: 'input-number',
      innerProps: { placeholder: '', defaultValue: initialValues['product-info-rate'] },
    },
    {
      name: 'Description',
      label: `${formatMessage({ id: 'app.productInfo.mainInfo.desc' })}`,
      type: 'textarea',
      innerProps: { placeholder: '', defaultValue: initialValues['Description'] },
    },
  ];

  // const handleFormSubmit = (values: Record<string, any>) => {
  //   console.log('is copied', isCopied);

  //   if (initialValues && initialValues.key && isCopied === false) {
  //     // Edit mode: merge the key into the values before submitting
  //     onSubmit({ ...values, key: initialValues.key, categoryId: groupValue });
  //   } else {
  //     // Create mode
  //     onSubmit(values);
  //   }
  // };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {children}
      {/* <Grouping groupValue={groupValue} setGroupValue={setGroupValue} /> */}
      <FormLayout
        FormOptions={productMainInfoformOptions}
        layoutDir="vertical"
        submitForm={onSubmit}
        isGrid={true}
        showButton={showButton}
        onCancel={onCancel}
        showCancelButton={!!initialValues.key}
      />
    </div>
  );
}

export default MainInfo;
