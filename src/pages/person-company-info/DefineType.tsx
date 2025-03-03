import { Tabs } from 'antd';
import React, { useState } from 'react';

import { useLocale } from '@/locales';

import CostumerInfo from '../costumer-info';
import Supplier from '../supplier';

function DefineType() {
  const [tab, setTab] = useState('1');
  const { formatMessage } = useLocale();
  const items = [
    {
      key: '1',
      label: `${formatMessage({ id: 'app.personComapnyInfo.tabs.defineType.tabs.supplier' })}`,
    },
    {
      key: '2',
      label: `${formatMessage({ id: 'app.personComapnyInfo.tabs.defineType.tabs.costumer' })}`,
    },
  ];

  const handleChange = (key: string) => {
    setTab(key);
  };

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={handleChange} style={{ padding: '0 1rem' }} />
      {tab === '1' ? <Supplier /> : <CostumerInfo />}
    </div>
  );
}

export default DefineType;
