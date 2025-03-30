import type { CSSProperties } from 'react';

import { CaretRightOutlined } from '@ant-design/icons';
import { Button, Collapse, theme } from 'antd';
import React, { useState } from 'react';

import RedirectionButton from '@/components/custom/RedirectionButton';
import { useLocale } from '@/locales';

import DefineType from './DefineType';
import PersonCompanyInfo from './PersonCompanyInfo';
import { createCostumer } from './util';

function Index() {
  const { token } = theme.useToken();
  const { formatMessage } = useLocale();
  const [formKey, setFormKey] = useState(0);

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
      children: <PersonCompanyInfo key={formKey} onSubmit={() => console.log('')} />,
      style: panelStyle,
    },
    {
      key: '2',
      label: `${formatMessage({ id: 'app.personComapnyInfo.statusAndTypeDefinition' })}`,
      children: <DefineType />,
      style: panelStyle,
    },
  ];

  const handleSubmission = async () => {
    await createCostumer();
    setFormKey(prevKey => prevKey + 1);
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <RedirectionButton
        btnText={formatMessage({ id: 'app.personComapnyInfo.redirectionBtn' })}
        linkAddress="/main-tables/person-company-info/person-company-list"
      />
      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        style={{ background: token.colorBgContainer }}
        items={getItems(panelStyle)}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="primary" onClick={handleSubmission}>
          {formatMessage({ id: 'app.personComapnyInfo.submissionBtn' })}
        </Button>
      </div>
    </div>
  );
}

export default Index;
