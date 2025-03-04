import type { CSSProperties } from 'react';

import { CaretRightOutlined } from '@ant-design/icons';
import { Button, Collapse, Tabs, theme } from 'antd';
import React, { useState } from 'react';

import { useLocale } from '@/locales';

import DefineType from './DefineType';
import PersonCompanyInfo from './PersonCompanyInfo';
import { createCostumer } from './util';

function index() {
  const { token } = theme.useToken();
  // const [tab, setTab] = useState('1');
  const { formatMessage } = useLocale();
  // const items = [
  //   {
  //     key: '1',
  //     label: `${formatMessage({ id: 'app.personComapnyInfo.tabs.personCompInfo' })}`,
  //   },
  //   {
  //     key: '2',
  //     label: `${formatMessage({ id: 'app.personComapnyInfo.tabs.defineType' })}`,
  //   },
  // ];

  // const handleChange = (key: string) => {
  //   setTab(key);
  // };

  const panelStyle: CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
    fontWeight: 600,
  };

  const getItems = (panelStyle: CSSProperties) => [
    {
      key: '1',
      label: `${formatMessage({ id: 'app.personComapnyInfo.infoHeader' })}`,
      children: <PersonCompanyInfo />,
      style: panelStyle,
    },
    {
      key: '2',
      label: `${formatMessage({ id: 'app.personComapnyInfo.statusAndTypeDefinition' })}`,
      children: <DefineType />,
      style: panelStyle,
    },
  ];

  return (
    <div>
      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        style={{ background: token.colorBgContainer }}
      >
        {getItems(panelStyle).map((item: any) => (
          <Collapse.Panel key={item.key} header={item.label} style={item.style}>
            {item.children}
          </Collapse.Panel>
        ))}
      </Collapse>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="primary" onClick={() => createCostumer()}>
          {formatMessage({ id: 'app.personComapnyInfo.submissionBtn' })}
        </Button>
      </div>
      {/* <Tabs defaultActiveKey="1" items={items} onChange={handleChange} style={{ padding: '0 1rem' }} />
      {tab === '1' ? <PersonCompanyInfo /> : <DefineType />} */}
    </div>
  );
}

export default index;
