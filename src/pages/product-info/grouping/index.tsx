import type { TreeSelectProps } from 'antd';

import { TreeSelect } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useLocale } from '@/locales';

import { getGroupItems } from './util';

function Grouping({
  setGroupValue,
  groupValue,
}: {
  setGroupValue: React.Dispatch<React.SetStateAction<any[]>>;
  groupValue: any[];
}) {
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

  //For setting default value from api
  // useEffect(() => {
  //   if (treeDataAnt?.length > 0 && groupValue?.length === 0) {
  //     setGroupValue(treeDataAnt);
  //   }
  // }, [treeDataAnt, groupValue, setGroupValue]);

  const handleChange = (newValue: any) => {
    console.log('new value', newValue);
    setGroupValue(newValue);
  };

  const onPopupScroll: TreeSelectProps['onPopupScroll'] = e => {
    console.log('onPopupScroll', e);
  };

  return (
    <div className="grouping-container">
      <div className="select-container">
        <label>{formatMessage({ id: 'app.productInfo.group.label' })}</label>
        <TreeSelect
          showSearch
          treeNodeFilterProp="title"
          treeData={treeDataAnt}
          style={{ width: '100%' }}
          onPopupScroll={onPopupScroll}
          onChange={handleChange}
          value={groupValue}
          treeDefaultExpandAll
          placeholder={`${formatMessage({ id: 'app.productInfo.grouping.tree.placeholder' })}`}
          allowClear
          // treeCheckable
        />
      </div>
    </div>
  );
}

export default Grouping;
