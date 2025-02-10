import '@/styles/product-info.css';

import { Tabs } from 'antd';
import React, { useState } from 'react';

import Grouping from './grouping';
import MainInfo from './main-info';
import Specifications from './specifications';

const items = [
  {
    key: '1',
    label: 'اطلاعات اصلی',
  },
  {
    key: '2',
    label: 'ویژگی ها',
  },
  {
    key: '3',
    label: 'گروه بندی',
  },
];

function ProductInfo() {
  const [tab, setTab] = useState('1');

  const handleChange = (key: string) => {
    setTab(key);
  };

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={handleChange} style={{ padding: '0 1rem' }} />
      {tab === '1' ? <MainInfo /> : tab === '2' ? <Specifications /> : <Grouping />}
    </div>
  );
}

export default ProductInfo;
