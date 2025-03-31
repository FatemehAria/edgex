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
      <Tabs defaultActiveKey="1" destroyInactiveTabPane={false} style={{ padding: '0 1rem' }}>
        <Tabs.TabPane tab={formatMessage({ id: 'app.personComapnyInfo.tabs.defineType.tabs.supplier' })} key="1">
          <Supplier />
        </Tabs.TabPane>
        <Tabs.TabPane tab={formatMessage({ id: 'app.personComapnyInfo.tabs.defineType.tabs.costumer' })} key="2">
          <CostumerInfo />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default DefineType;
