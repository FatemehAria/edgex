import { Tabs } from 'antd';
import React, { useState } from 'react';

import { useLocale } from '@/locales';

import DefineType from './DefineType';
import PersonCompanyInfo from './PersonCompanyInfo';

function index() {
  const [tab, setTab] = useState('1');
  const { formatMessage } = useLocale();
  const items = [
    {
      key: '1',
      label: `${formatMessage({ id: 'app.personComapnyInfo.tabs.personCompInfo' })}`,
    },
    {
      key: '2',
      label: `${formatMessage({ id: 'app.personComapnyInfo.tabs.defineType' })}`,
    },
  ];

  const handleChange = (key: string) => {
    setTab(key);
  };

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={handleChange} style={{ padding: '0 1rem' }} />
      {tab === '1' ? <PersonCompanyInfo /> : <DefineType />}
    </div>
  );
}

export default index;
