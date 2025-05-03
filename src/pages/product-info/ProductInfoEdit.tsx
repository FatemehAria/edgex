import type { MyFormOptions } from '@/components/core/form';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useLocale } from '@/locales';

import FormLayout from '../layout/form-layout';
import { getGroupItems } from './grouping/util';

interface ProductInfoEditProps {
  initialValues?: Record<string, any>;
  onSubmit: (formData: Record<string, any>) => void | Promise<void> | null;
  showButton?: boolean;
  children?: React.ReactNode;
  groupValue: any[];
  setGroupValue: React.Dispatch<React.SetStateAction<any[]>>;
}

function ProductInfoEdit({ initialValues = {}, showButton = false, onSubmit }: ProductInfoEditProps) {
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

  const productInfoEditformOptions: MyFormOptions = [
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
        treeCheckable: false,
        multiple: false,
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <FormLayout
        FormOptions={productInfoEditformOptions}
        layoutDir="vertical"
        submitForm={onSubmit}
        isGrid={true}
        showButton={showButton}
      />
    </div>
  );
}

export default ProductInfoEdit;
