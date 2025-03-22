import '@/styles/product-info.css';

import { Tabs } from 'antd';
import React, { useState } from 'react';

import RedirectionButton from '@/components/custom/RedirectionButton';
import { useLocale } from '@/locales';

import Grouping from './grouping';
import MainInfo from './main-info';
import { createStuff } from './main-info/util';
// import Specifications from './specifications';

function ProductInfo() {
  const [tab, setTab] = useState('1');
  const { formatMessage } = useLocale();
  const [groupValue, setGroupValue] = useState<any>([]);

  const items = [
    {
      key: '1',
      label: `${formatMessage({ id: 'app.productInfo.tabs.grouping' })}`,
    },
    {
      key: '2',
      label: `${formatMessage({ id: 'app.productInfo.tabs.mainInfo' })}`,
    },
    // {
    //   key: '2',
    //   label: `${formatMessage({ id: 'app.productInfo.tabs.properties' })}`,
    // },
  ];

  const handleChange = (key: string) => {
    setTab(key);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <RedirectionButton
          btnText={formatMessage({ id: 'app.productInfo.redirectionBtn' })}
          linkAddress="/main-tables/product-info/products-list"
        />
        {/* <RedirectionButton btnText="مشاهده لیست گروهبندی ها" linkAddress="/main-tables/product-info/products-list" /> */}
      </div>

      <Tabs defaultActiveKey="1" items={items} onChange={handleChange} style={{ padding: '0 1rem' }} />
      {tab === '1' ? (
        <Grouping groupValue={groupValue} setGroupValue={setGroupValue} />
      ) : (
        <MainInfo onSubmit={values => createStuff(values, groupValue)} showButton={true} groupValue={groupValue} />
      )}
    </div>
  );
}

export default ProductInfo;
