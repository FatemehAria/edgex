import { Tabs } from 'antd';

import { useLocale } from '@/locales';

import CostumerInfo from '../costumer-info';
import Supplier from '../supplier';

function DefineType() {
  const { formatMessage } = useLocale();
  const items = [
    {
      key: '1',
      label: `${formatMessage({ id: 'app.personComapnyInfo.tabs.defineType.tabs.supplier' })}`,
      children: <Supplier />,
    },
    {
      key: '2',
      label: `${formatMessage({ id: 'app.personComapnyInfo.tabs.defineType.tabs.costumer' })}`,
      children: <CostumerInfo />,
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} style={{ padding: '0 1rem' }} destroyInactiveTabPane={false} />
    </div>
  );
}

export default DefineType;
