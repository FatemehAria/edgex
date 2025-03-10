import '@/styles/product-info.css';

import { Tabs } from 'antd';
import React, { useState } from 'react';

import { useLocale } from '@/locales';

import Grouping from './grouping';
import MainInfo from './main-info';
import Specifications from './specifications';

function ProductInfo() {
  const [tab, setTab] = useState('1');
  const { formatMessage } = useLocale();
  const items = [
    {
      key: '1',
      label: `${formatMessage({ id: 'app.productInfo.tabs.mainInfo' })}`,
    },
    // {
    //   key: '2',
    //   label: `${formatMessage({ id: 'app.productInfo.tabs.properties' })}`,
    // },
    {
      key: '3',
      label: `${formatMessage({ id: 'app.productInfo.tabs.grouping' })}`,
    },
  ];

  const handleChange = (key: string) => {
    setTab(key);
  };

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={handleChange} style={{ padding: '0 1rem' }} />
      {tab === '1' ? <MainInfo /> : <Grouping />}
    </div>
  );
}

export default ProductInfo;
